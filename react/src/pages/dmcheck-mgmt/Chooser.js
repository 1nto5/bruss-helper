import React, { useState, useMemo } from 'react'
import production from "../../data/production"


const Chooser = (props) => {
    const workplaces = useMemo(() => production.map(workplace => Object.keys(workplace)[0]), [production]);
    const [workplaceArticles, setWorkplaceArticles] = useState([]);

    const handleStartDateChange = (e) => {
        props.handleStartDateChange(e.target.value);
      }
      
      const handleEndDateChange = (e) => {
        props.handleEndDateChange(e.target.value);
      }
      
      const handleWorkplaceChange = (e) => {
        const selectedWorkplace = e.target.value;
        props.handleWorkplaceChange(selectedWorkplace);
        const selectedWorkplaceData = production.find(w => Object.keys(w)[0] === selectedWorkplace);
        if (selectedWorkplaceData) {
          const articles = selectedWorkplaceData[selectedWorkplace].articles;
          setWorkplaceArticles(Object.entries(articles));
        }
      };
      
      const handleArticleChange = (e) => {
        props.handleArticleChange(e.target.value);
      }

      const handleHydraBatchInput = (e) => {
        props.handleHydraBatchInput(e.target.value);
      }

      const handlePalletBatchInput = (e) => {
        props.handlePalletBatchInput(e.target.value);
      }


    return (
        <div className='mgmt-chooser'>
            <div className='mgmt-chooser--box'>
                <div className='mgmt-chooser--box--row'>
                    <select className='mgmt-chooser--row--select' value={props.workplace} onChange={handleWorkplaceChange}>
                        <option value="default" disabled>wybierz stanowisko</option>
                        {workplaces.map(workplace => (
                            <option key={workplace} value={workplace}>
                            {workplace}
                        </option>
                        ))}
                    </select>
                </div>
                <div className='mgmt-chooser--box--row'>
                    <select className='mgmt-chooser--row--select' id="article" value={props.article} onChange={handleArticleChange}>
                        <option value="default">wybierz artykuł</option>
                        {workplaceArticles.length > 0 
                        ? workplaceArticles.map(([articleNumber, article]) => (
                            <option key={articleNumber} value={props.articleNumber}>
                                {articleNumber}
                            </option>
                            ))
                            : <option value="default" disabled>brak stanowiska</option>
                        }
                    </select>
                </div>
            </div>
            <div className="mgmt-chooser--separator"></div>
                                <div className='mgmt-chooser--box'>
                                    <div className='mgmt-chooser--box--row'>
                                        <label className='mgmt-chooser--row--label'  htmlFor="start-date">od:</label>
                                        <input className='mgmt-chooser--row--input' type="datetime-local" id="start-date" value={props.startDate} onChange={handleStartDateChange} /> 
                                    </div>
                                </div>
                                <div className="mgmt-chooser--separator"></div>
                                <div className='mgmt-chooser--box'>
                                    <div className='mgmt-chooser--box--row'>
                                        <label className='mgmt-chooser--row--label' htmlFor="end-date">do:</label>
                                        <input className='mgmt-chooser--row--input' type="datetime-local" id="end-date" value={props.endDate} onChange={handleEndDateChange} />
                                    </div>
                                </div>
                                <div className="mgmt-chooser--separator"></div>
            <div className='mgmt-chooser--box'>
                <div className='mgmt-chooser--box--row'>
                    <input 
                        className='mgmt-chooser--row--input' 
                        value={props.hydraBatchInput} 
                        onChange={handleHydraBatchInput}
                        placeholder="batch hydra"
                    >
                    </input>
                </div>
                <div className='mgmt-chooser--box--row'></div>
                    <input 
                        className='mgmt-chooser--row--input' 
                        value={props.palletBatchInput} 
                        onChange={handlePalletBatchInput}
                        placeholder="batch paleta"
                    >
                    </input>
            </div>
        </div>
    )
}
export default Chooser
