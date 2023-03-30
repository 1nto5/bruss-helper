import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Chooser from "./Chooser";
import DmcList from "./DmcList";
import Footer from "../../components/Footer";
import InfoBox from "../../components/InfoBox";
import { AuthContext } from "../../contexts/AuthContext";

const DmcheckMgmt = () => {
  useEffect(() => {
    document.title = "DMCheck MGMT";
  }, []);

  const { isLoggedIn } = useContext(AuthContext);
  const { mgmtAccess } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workplace, setWorkplace] = useState("default");
  const [article, setArticle] = useState("default");
  const [status, setStatus] = useState("default");
  const [operator, setOperator] = useState("");
  const [skipClick, setSkipClick] = useState(false);
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
    setSkipClick((prevSkipClick) => !prevSkipClick);
  };

  const handleDmcOrBatchInput = (value) => {
    const dmcOrBatch = value;
    setDmcOrBatchInput(dmcOrBatch);
  };

  // TODO show info when user is no logged in or dont have access to mgmt

  return (
    <>
      <Header clickSkip={handleSkip} />

      {isLoggedIn && mgmtAccess && (
        <>
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
            dmcOrBatchInput={dmcOrBatchInput}
          />
        </>
      )}

      {!isLoggedIn && (
        <InfoBox>
          <p className="">
            Zaloguj się aby uzyskać dostęp do podglądu i zarządzania DMCheck.
          </p>
        </InfoBox>
      )}

      {isLoggedIn && !mgmtAccess && (
        <InfoBox>
          <p className="">
            Nie masz nadanych odpowiednich uprawnień do podglądu i zarządzania
            DMCheck.{" "}
          </p>
          <p className="mb-2">
            Jeśli chcesz uzyskać dostęp do tej funkcji, skontaktuj się z działem
            IT.
          </p>
          <a
            className="hover:text-bruss"
            href="mailto:support@bruss-group.com?subject=Dostęp do DMCheck MGMT&body=Proszę o nadanie mi dostępu do zarządzania DMCheck MGMT w celu: (wpisać cel)."
          >
            Kliknij aby wysłać wiadomość email.
          </a>
        </InfoBox>
      )}

      <Footer version={"1.1.0"} />
    </>
  );
};

export default DmcheckMgmt;
