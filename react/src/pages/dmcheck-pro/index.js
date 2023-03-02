
import { API_URL } from '../../assets/config';
import production from "../../data/production"
import React, {useState, useEffect, useRef, useMemo} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Header from './Header'
import Footer from '../../components/Footer'
import Toast from '../../utils/Toast'
import toast from 'react-hot-toast';
import { playNotification } from '../../utils/NotificationSound';
import Status from './Status'
import Login from './Login'
import WorkplaceCard from './WorkplaceCard'
import ArticleCard from './ArticleCard'
import Input from './Input'
import PrintPalletLabel from './PrintPalletLabel'
import { ReactSession }  from 'react-client-session'
ReactSession.setStoreType("localStorage")

function DmcheckPro() { 

  // WORKPLACE
  const [workplaceLogged, setWorkplaceLogged] = useState(false)
  const currentWorkplaceRef = useRef("BRAK")
  useEffect(() => {
    const sesWorkplaceName = ReactSession.get("workplace")
    if (sesWorkplaceName) {
      setWorkplaceLogged(true)
      currentWorkplaceRef.current = sesWorkplaceName
    }
  }, [])
  const handleWorkplaceLogin = (workplaceName) => {
    setWorkplaceLogged(true)
    ReactSession.set("workplace", workplaceName)
    toast.success(`Zalogowano: ${workplaceName}!`)
    playNotification('ok');
  }
  const handleWorkplaceLogout = () => {
    setWorkplaceLogged(false)
    ReactSession.set("workplace", "")
    currentWorkplaceRef.current = "BRAK"
    setArticleLogged(false)
    ReactSession.set("article", "")
    toast(`Stanowisko wylogowane!`)
  }


   // ARTICLE
   const [articleLogged, setArticleLogged] = useState(false)
   const currentArticleRef = useRef("BRAK")
   useEffect(() => {
     const sesArticleNumber = ReactSession.get("article")
     if (sesArticleNumber) {
       setArticleLogged(true)
       currentArticleRef.current = sesArticleNumber
     }
   }, [])
   const handleArticleLogin = (articleNumber) => {
     setArticleLogged(true)
     ReactSession.set("article", articleNumber)
     currentArticleRef.current = articleNumber
     toast.success(`Zalogowano: ${articleNumber}!`)
     playNotification('ok');
   }
   const handleArticleLogout = () => {
     setArticleLogged(false)
     ReactSession.set("article", "")
     toast(`Artykuł wylogowany!`)
   }
  

  // NUMER PERSONALNY
  const [userLogged, setUserLogged] = useState(false)
  const currentUserRef = useRef("BRAK")
  useEffect(() => {
    const sesPersNumb = ReactSession.get("user")
    if (sesPersNumb) {
      setUserLogged(true)
      currentUserRef.current = sesPersNumb
    }
  }, [])
  const handleUserLogin = (persNumb) => {
    setUserLogged(true)
    ReactSession.set("user", persNumb)
    currentUserRef.current = persNumb
    toast.success(`Zalogowano: ${persNumb}!`)
    playNotification('ok');
  }
  const handleErrorUserLogin = (persNumb) => {
    toast.error(`NOK numer!`)
    playNotification('nok');
  }
  const handleUserLogout = () => {
    setUserLogged(false)
    ReactSession.set("user", "")
    toast(`Operator wylogowany!`)
  }


  // WORKPLACES CARDS genereted from data.js file
  const workplaceCardsRef = useRef()
  useEffect(() => {
    workplaceCardsRef.current = (production.map(item => {
      const workplace = Object.keys(item)[0]
      return (
      <WorkplaceCard
           key={workplace}
           name={workplace}
           workplaceLogin={handleWorkplaceLogin}
         />
      )
    }))
  }, [])


  // ARTICLES CARDS genereted from data.js file
  const articleCardsRef = useRef()
  useEffect(() => {
    if(currentWorkplaceRef.current && currentWorkplaceRef.current !== "BRAK") {
      const filteredData = production.filter(item => Object.keys(item)[0] === currentWorkplaceRef.current)
      const articles = filteredData[0][currentWorkplaceRef.current].articles
      const articleNumbers = Object.keys(articles)
      articleCardsRef.current = (articleNumbers.map(item => {
        return (
            <ArticleCard
                key={item}
                workplace={item}
                name={articles[item].name}
                articleLogin={handleArticleLogin}
            />
        )
      }))
    }
  }, [currentWorkplaceRef.current])


  // FORD DATE VALIDATION FUNCTION
  const fordDateValidation = () => {
    const today = new Date()
    const year = today.getFullYear()
    const start = new Date(year, 0, 0)
    const diff = today - start
    const oneDay = 1000 * 60 * 60 * 24
    const dotyGreg = Math.floor(diff / oneDay)
    const dotyJul = dotyGreg > 13
      ? dotyGreg - 13
      : (365 - 13) + dotyGreg
    const dmcDotyJul = parseInt(dmcInputRef.current.substr(7, 3))
    return dmcDotyJul === dotyJul || dmcDotyJul === (dotyJul - 1)
  }


  // DMC INPUT
  const dmcInputRef = useRef()
  const [dmcInputted, setDmcInputted] = useState(false)
  const handleDmcSubmit = (dmc) => {
    dmcInputRef.current = dmc
    setDmcInputted(currentDmcInputted => {
      return !currentDmcInputted})
  }
  useEffect(() => {
    if (dmcInputRef.current) {
      const eol = production.find(item => Object.keys(item)[0] === currentWorkplaceRef.current)
      const article = eol[currentWorkplaceRef.current].articles[currentArticleRef.current]
      if (!dmcInputRef.current || dmcInputRef.current.length !== article.dmc.length) {
        toast.error("NOK długość DMC!")
        playNotification('nok');
        return
      }
      if (!article.dmcStartVal || dmcInputRef.current.substr(article.startVal[0], article.startVal[1]) !== article.dmc.substr(article.startVal[0], article.startVal[1])) {
        toast.error("NOK treść DMC!")
        playNotification('nok');
        return
      }
      if (!article.dmcEndVal || dmcInputRef.current.substr(article.endVal[0], article.endVal[1]) !== article.dmc.substr(article.endVal[0], article.endVal[1])) {
        toast.error("NOK treść DMC!")
        playNotification('nok');
        return
      }
      if (!article.fordDate || !fordDateValidation(dmcInputRef.current)) {
        toast.error("NOK data DMC!")
        playNotification('nok');
        return
      }
      saveDmc(dmcInputRef.current)
    }
  }, [dmcInputted])


  // POST DMC INTO API_URL -> SAVE TO DB
  const saveDmc = (dmcToSave) => {
    const status = 0
    const workplace = currentWorkplaceRef.current
    const article = currentArticleRef.current
    const dmc = dmcToSave
    const dmc_operator = currentUserRef.current
    const dmc_time = new Date()
    // const collection = currentWorkplaceRef.current

    const data = { status, workplace, article, dmc, dmc_operator, dmc_time }

    axios.post(`${API_URL}/dmcheck-pro-dmc-save`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        countStatus(0) // update inBox while success
        res.data.message === "DMC istnieje w bazie!" && toast.error(res.data.message) && playNotification('nok');
        res.data.message === "DMC OK!" && toast.success(res.data.message) && playNotification('ok');
      })
      .catch(error => {
        toast.error("Błąd DB!")
        playNotification('nok');
      })
  }


  // HYDRA INPUT
  const hydraInputRef = useRef()
  const [hydraInputted, setHydraInputted] = useState(false)
  const handleHydraSubmit = (hydra) => {
    hydraInputRef.current = hydra
    setHydraInputted(currentHydraInputted => {
      return !currentHydraInputted})
  }
  useEffect(() => {
    const hydra = hydraInputRef.current
    if (hydra) {
      if (hydra.length < 34 || !hydra.includes("|")) {
        toastTypeRef.current = "toastError"
        toastMessageRef.current = `Niepoprawny kod QR!`
        setShowToast(true)
        return
      }
      const splittedHydra = hydra.split("|")
      const hydraArticle = splittedHydra[0].length === 7 ? splittedHydra[0].substr(2) : ''
      const hydraBatch = splittedHydra[3] ? splittedHydra[3].substr(2).toUpperCase() : ''
      const hydraQuantity = splittedHydra[2] ? parseInt(splittedHydra[2].substr(2)) : '';
      const hydraProcess = splittedHydra[1] ? splittedHydra[1].substr(2) : ''
      if (hydraArticle !== currentArticleRef.current) {
        toast.error("NOK artykuł!")
        playNotification('nok');
        return
      }
      if (hydraQuantity !== inBox) {
        toast.error("NOK ilość!")
        playNotification('nok');
        return
      }
      if (hydraProcess !== "050") {
        toast.error("NOK proces!")
        playNotification('nok');
        return
      }
      saveHydra(hydraBatch)
    }
  }, [hydraInputted])


    // POST HYDRA INTO API_URL -> SAVE TO DB
    const saveHydra = (hydraToSave) => {
      const hydra_batch = hydraToSave
      const hydra_operator = currentUserRef.current
      const hydra_time = new Date()
      // const collection = currentWorkplaceRef.current
      const workplace = currentWorkplaceRef.current
      const article = currentArticleRef.current
      const data = { hydra_batch, hydra_operator, hydra_time, workplace, article }
      axios.post(`${API_URL}/dmcheck-pro-hydra-save`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          countStatus(0) // update inBox while success
          countStatus(1) // update onPallet while success
          res.data.message === "Batch istnieje w bazie!" && toast.error(res.data.message) && playNotification('nok');
          res.data.message === "Karta HYDRA zapisana!" && toast.success(res.data.message) && playNotification('ok');
        })
        .catch(error => {
          toast.error("Błąd DB!")
          playNotification('nok');
        })
    }


    // PALLET INPUT
    const palletInputRef = useRef()
    const [palletInputted, setPalletInputted] = useState(false)
    const handlePalletSubmit = (pallet) => {
      palletInputRef.current = pallet
      setPalletInputted(currentPalletInputted => {
        return !currentPalletInputted})
    }
    useEffect(() => {
      const pallet = palletInputRef.current
      if (pallet) {
        if (pallet.length < 34 || !pallet.includes("|")) {
          toast.error("NOK kod QR!")
          playNotification('nok');
          return
        }
        const splittedPallet = pallet.split("|")
        const palletArticle = splittedPallet[0].length === 7 ? splittedPallet[0].substr(2) : ''
        const palletBatch = splittedPallet[3] ? splittedPallet[3].substr(2).toUpperCase() : ''
        const palletQuantity = splittedPallet[2] ? parseInt(splittedPallet[2].substr(2)) : ''
        const palletProcess = splittedPallet[1] ? splittedPallet[1].substr(2) : ''
        if (palletArticle !== currentArticleRef.current) {
          toast.error("NOK artykuł!")
          playNotification('nok');
          return
        }
        if (palletQuantity !== (onPallet * boxSize)) {
          toast.error("NOK ilość!")
          playNotification('nok');
          return
        }
        if (palletProcess !== "000") {
          toast.error("NOK proces!")
          playNotification('nok');
          return
        }
        savePallet(palletBatch)
      }
    }, [palletInputted])


    // POST PALLET INTO API_URL -> SAVE TO DB
    const savePallet = (palletToSave) => {
      const pallet_batch = palletToSave
      const pallet_operator = currentUserRef.current
      const pallet_time = new Date()
      const workplace = currentWorkplaceRef.current
      const article = currentArticleRef.current
      const data = { pallet_batch, pallet_operator, pallet_time, workplace, article }
      axios.post(`${API_URL}/dmcheck-pro-pallet-save`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          countStatus(1) // update onPallet while success
          res.data.message === "Batch istnieje w bazie!" && toast.error(res.data.message) && playNotification('nok');
          res.data.message === "Karta PALETA zapisana!" && toast.success(res.data.message) && playNotification('ok');
        })
        .catch(error => {
          toast.error("Błąd DB!");
          playNotification('nok');
        })
    }


    // BOX+PALLET STATUSES
    const [inBox, setInBox] = useState(null)
    const [onPallet, setOnPallet] = useState(null)
    const countStatus = async (statusNumber) => {
      const workplace = currentWorkplaceRef.current
      const article = currentArticleRef.current
      const status = statusNumber
      try {
        const response = await axios.get(`${API_URL}/dmcheck-pro-count?status=${status}&workplace=${workplace}&article=${article}`)
        const count = response.data.message
        if (statusNumber === 0) {
          setInBox(count)
        } 
        if (statusNumber === 1 && articleLogged) {
          setOnPallet(count/boxSize)  
        }
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(() => {
      if(currentWorkplaceRef !== "BRAK") {
        countStatus(0)
        countStatus(1)
      }
    }, [articleLogged])


    // SIZES FROM data.js
    const boxSize = useMemo(() => {
      if (currentArticleRef.current && currentArticleRef.current !== "BRAK") {
        const eol = production.find(item => Object.keys(item)[0] === currentWorkplaceRef.current)
        const article = eol[currentWorkplaceRef.current].articles[currentArticleRef.current]
        return article.boxSize
      } else {
        return "BRAK"
      }
    }, [articleLogged])
    const palletSize = useMemo(() => {
      if (currentArticleRef.current && currentArticleRef.current !== "BRAK") {
        const eol = production.find(item => Object.keys(item)[0] === currentWorkplaceRef.current)
        const article = eol[currentWorkplaceRef.current].articles[currentArticleRef.current]
        return article.palletSize
      } else {
        return "BRAK"
      }
    }, [articleLogged])


    // ARTICLE NAME FROM data.js
    const articleName = useMemo(() => {
      if (currentArticleRef.current && currentArticleRef.current !== "BRAK") {
        const eol = production.find(item => Object.keys(item)[0] === currentWorkplaceRef.current)
        const article = eol[currentWorkplaceRef.current].articles[currentArticleRef.current]
        return article.name
      } else {
        return "BRAK"
      }
    }, [articleLogged])


    // QR GENERATOR
    const generatePalletQr = () => {
      return `A:${currentArticleRef.current}|O:000|Q:${onPallet * boxSize}|B:AA${uuidv4().slice(0, 8).toUpperCase()}|C:G`;
    };
    
    // WORK STAGE
    const workStage = useMemo(() => {
      if (inBox < boxSize && onPallet !== palletSize) {
        return 0;
      } else if (inBox === boxSize) {
        return 1;
      } else if (onPallet === palletSize) {
        return 2;
      }
    }, [inBox, onPallet]);


  return (

    <div className="App">
      
      <Header workplaceName={workplaceLogged ? currentWorkplaceRef.current : ""} userLogout={handleUserLogout} articleLogout={handleArticleLogout} workplaceLogout={handleWorkplaceLogout} workplaceLogged={workplaceLogged}/>
      
      <Status 
        operator={currentUserRef.current}
        article={currentArticleRef.current}
        box={`${inBox} / ${boxSize}`}
        pallet={`${onPallet} / ${palletSize}`}
        workStage={workStage}
      />
      
      {
        !workplaceLogged && 
        <section className="workplaces">
            {workplaceCardsRef.current}
        </section>
      }

      {
        workplaceLogged && !articleLogged &&
        <section className='articles'>
            {articleCardsRef.current}
        </section>
      }

      {workplaceLogged && articleLogged && !userLogged && (<Login userLogin={handleUserLogin} errorUserLogin={handleErrorUserLogin}/>)}

      {workStage === 0 && workplaceLogged && articleLogged && userLogged && (<Input onSubmit={handleDmcSubmit} placeholder="skan dmc"/>)}

      {workStage === 1 && workplaceLogged && articleLogged && userLogged &&  (<Input onSubmit={handleHydraSubmit} placeholder="skan hydra"/>)}

      {workStage === 2 && workplaceLogged && articleLogged && userLogged &&  (
        <div>
          <Input onSubmit={handlePalletSubmit} placeholder="skan paleta"/>
          <PrintPalletLabel palletQr={generatePalletQr()} article={currentArticleRef.current} name={articleName} quantity={onPallet * boxSize} /> 
        </div>
      )}

      <Toast/>

      <Footer version={"4.0.3"}/>

    </div>

  )
}


export default DmcheckPro
