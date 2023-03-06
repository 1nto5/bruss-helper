import React, { useState, useMemo } from 'react'
import production from "../../data/production"

// TODO after selecting the status restart the article

const Chooser = (props) => {
    const workplaces = useMemo(() => production.map(workplace => Object.keys(workplace)[0]), [production]);
    const [workplaceArticles, setWorkplaceArticles] = useState([]);
    
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
    
    const handleStatusChange = (e) => {
      props.handleStatusChange(e.target.value);
    }
    
    const handleOperatorInput = (e) => {
        props.handleOperatorInput(e.target.value);
    }

    const handleStartDateChange = (e) => {
        props.handleStartDateChange(e.target.value);
    }
      
    const handleEndDateChange = (e) => {
        props.handleEndDateChange(e.target.value);
    }
      
    const handleDmcOrBatchInput = (e) => {
        props.handleDmcOrBatchInput(e.target.value);
    }

    return (
        <div className='mgmt-chooser'>
            <div className='mgmt-chooser--box'>
                <div className='mgmt-chooser--box--row'>
                    <select className='mgmt-chooser--row--select' value={props.workplace || "default"} onChange={handleWorkplaceChange}>
                        <option value="default" disabled>stanowisko</option>
                        {workplaces.map(workplace => (
                            <option key={workplace} value={workplace}>
                            {workplace}
                        </option>
                        ))}
                        <option value="">wyczyść</option>
                    </select>
                </div>
                <div className='mgmt-chooser--box--row'>
                    <select className='mgmt-chooser--row--select' id="article" value={props.article || "default"} onChange={handleArticleChange}>
                        <option value="default" disabled>artykuł</option>
                        {workplaceArticles.length > 0 
                        ? workplaceArticles.map(([articleNumber, article]) => (
                            <option key={articleNumber} value={props.articleNumber}>
                                {articleNumber}
                            </option>
                            ))
                            : <option value="default" disabled>brak stanowiska</option>
                        }
                        <option value="">wyczyść</option>
                        
                    </select>
                </div>
                <div className='mgmt-chooser--box--row'>
                <select className='mgmt-chooser--row--select' value={props.status || "default"} onChange={handleStatusChange}>
                    <option value="default" disabled>status</option>
                    <option key='box' value='0'>box</option>
                    <option key='paleta' value='1'>paleta</option>
                    <option key='magazyn' value='2'>magazyn</option>
                    <option value="">wyczyść</option>
                </select>
            </div>
            </div>
            <div className="mgmt-chooser--separator"></div>
            <div className='mgmt-chooser--box'> 
  
            <div className='mgmt-chooser--box--row'>
                <input 
                    className='mgmt-chooser--row--input' 
                    value={props.operator} 
                    onChange={handleOperatorInput}
                    placeholder="operator"
                >
                </input>
            </div>
            <div className='mgmt-chooser--box--row'>
                    <input 
                        className='mgmt-chooser--row--input' 
                        value={props.dmcInput} 
                        onChange={handleDmcOrBatchInput}
                        placeholder="dmc / hydra / paleta"
                    >
                    </input>
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
        </div>
    )
}
export default Chooser
