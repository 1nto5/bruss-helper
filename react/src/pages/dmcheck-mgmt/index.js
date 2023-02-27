import React, {useState} from 'react'
import Header from './Header'
import Chooser from './Chooser'
import DmcList from './DmcList'
import Footer from './Footer'

// const API = "http://localhost:4000/"

const DmcheckMgmt = () => {
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workplace, setWorkplace] = useState("default");
  const [article, setArticle] = useState("default");
  const [deleteClick, setDeleteClick] = useState(false);
  const [printClick, setPrintClick] = useState(false);
  const [hydraBatchInput, setHydraBatchInput] = useState("");
  const [palletBatchInput, setPalletBatchInput] = useState("");


  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handleWorkplaceChange = (value) => {
    const selectedWorkplace = value;
    setWorkplace(selectedWorkplace);
  };

  const handleArticleChange = (value) => {
    const selectedArticle = value;
    setArticle(selectedArticle);
  };

  const handleDelete = () => {
    setDeleteClick(prevDeleteClick => !prevDeleteClick);
  };

  const handlePrint = () => {
    setPrintClick(prevPrintClick => !prevPrintClick);
  };

  const handleHydraBatchInput = (value) => {
    const hydraBatchInput = value;
    setHydraBatchInput(hydraBatchInput);
  };

  const handlePalletBatchInput = (value) => {
    const palletBatchInput = value;
    setPalletBatchInput(palletBatchInput);
  };

  return (
    <div>
        
        <Header clickDelete={handleDelete} clickPrint={handlePrint} clickExcel="test"/>

        <Chooser 
          startDate={startDate} 
          handleStartDateChange={handleStartDateChange} 
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          workplace={workplace}
          handleWorkplaceChange={handleWorkplaceChange}
          article={article}
          handleArticleChange={handleArticleChange}
          hydraBatchInput={hydraBatchInput}
          handleHydraBatchInput={handleHydraBatchInput}
          palletBatchInput={palletBatchInput}
          handlePalletBatchInput={handlePalletBatchInput}
        />

        <DmcList 
          startDate={startDate} 
          endDate={endDate}
          workplace={workplace}
          article={article}
          deleteClick={deleteClick}
          printClick={printClick}
          hydraBatchInput={hydraBatchInput}
          palletBatchInput={palletBatchInput}
        />

        <Footer />

    </div>
    )
};

export default DmcheckMgmt;
