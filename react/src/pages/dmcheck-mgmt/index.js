import React, {useState} from 'react'
import Header from './Header'
import Chooser from './Chooser'
import DmcList from './DmcList'
import Footer from '../../components/Footer'

// TODO auth system

const DmcheckMgmt = () => {
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workplace, setWorkplace] = useState("default");
  const [article, setArticle] = useState("default");
  const [status, setStatus] = useState("default");
  const [operator, setOperator] = useState("");
  const [skipClick, setSkipClick] = useState(false);
  const [printClick, setPrintClick] = useState(false);
  const [dmcOrBatchInput, setDmcOrBatchInput] = useState("");

  const handleWorkplaceChange = (value) => {
    const selectedWorkplace = value;
    setWorkplace(selectedWorkplace);
  };

  const handleArticleChange = (value) => {
    const selectedArticle = value;
    setArticle(selectedArticle);
  };

  const handleStatusChange = (value) => {
    const selectedStatus = value;
    setStatus(selectedStatus);
  };

  const handleOperatorInput = (value) => {
    const operatorInput = value;
    setOperator(operatorInput);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handleSkip = () => {
    setSkipClick(prevSkipClick => !prevSkipClick);
  };

  const handlePrint = () => {
    setPrintClick(prevPrintClick => !prevPrintClick);
  };

  const handleDmcOrBatchInput = (value) => {
    const dmcOrBatch = value;
    setDmcOrBatchInput(dmcOrBatch);
  };


  return (
    <div>
        
        <Header clickSkip={handleSkip} clickPrint={handlePrint} clickExcel="test"/>

        <Chooser 
          workplace={workplace}
          handleWorkplaceChange={handleWorkplaceChange}
          article={article}
          handleArticleChange={handleArticleChange}
          status={status}
          handleStatusChange={handleStatusChange}
          operator={operator}
          handleOperatorInput={handleOperatorInput}
          startDate={startDate}
          handleStartDateChange={handleStartDateChange} 
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          dmcOrBatchInput={dmcOrBatchInput}
          handleDmcOrBatchInput={handleDmcOrBatchInput}
        />

        <DmcList 
          startDate={startDate} 
          endDate={endDate}
          workplace={workplace}
          article={article}
          status={status}
          operator={operator}
          skipClick={skipClick}
          printClick={printClick}
          dmcOrBatchInput={dmcOrBatchInput}
        />

        <Footer version={"1.0.3"}/>

    </div>
    )
};

export default DmcheckMgmt;
