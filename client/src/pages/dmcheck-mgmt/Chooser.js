import React, { useState, useMemo } from "react";
import production from "../../data/production";
import { BoxSeparator } from "../../components/StatusElements";

const Chooser = (props) => {
  const workplaces = useMemo(
    () => production.map((workplace) => Object.keys(workplace)[0]),
    [production]
  );
  const [workplaceArticles, setWorkplaceArticles] = useState([]);

  const handleWorkplaceChange = (e) => {
    const selectedWorkplace = e.target.value;
    props.handleWorkplaceChange(selectedWorkplace);
    const selectedWorkplaceData = production.find(
      (w) => Object.keys(w)[0] === selectedWorkplace
    );
    if (selectedWorkplaceData) {
      const articles = selectedWorkplaceData[selectedWorkplace].articles;
      setWorkplaceArticles(Object.entries(articles));
    }
  };

  const handleArticleChange = (e) => {
    props.handleArticleChange(e.target.value);
  };

  const handleStatusChange = (e) => {
    props.handleStatusChange(e.target.value);
  };

  const handleOperatorInput = (e) => {
    props.handleOperatorInput(e.target.value);
  };

  const handleStartDateChange = (e) => {
    props.handleStartDateChange(e.target.value);
  };

  const handleEndDateChange = (e) => {
    props.handleEndDateChange(e.target.value);
  };

  const handleDmcOrBatchInput = (e) => {
    props.handleDmcOrBatchInput(e.target.value);
  };

  return (
    <div className="flex h-40 flex-row items-center justify-between bg-gray-50 shadow-lg">
      <div className="ml-auto mr-auto box-border text-center">
        <div>
          <select
            className="mb-2 h-8 w-48 text-gray-700"
            value={props.workplace || "default"}
            onChange={handleWorkplaceChange}
          >
            <option value="default" disabled>
              stanowisko
            </option>
            {workplaces.map((workplace) => (
              <option key={workplace} value={workplace}>
                {workplace}
              </option>
            ))}
            <option value="">wyczyść</option>
          </select>
        </div>
        <div>
          <select
            className="mb-2 h-8 w-48 text-gray-700"
            id="article"
            value={props.article || "default"}
            onChange={handleArticleChange}
          >
            <option value="default" disabled>
              artykuł
            </option>
            {workplaceArticles.length > 0 ? (
              workplaceArticles.map(([articleNumber, article]) => (
                <option key={articleNumber} value={props.articleNumber}>
                  {articleNumber}
                </option>
              ))
            ) : (
              <option value="default" disabled>
                brak stanowiska
              </option>
            )}
            <option value="">wyczyść</option>
          </select>
        </div>
        <div>
          <select
            className="h-8 w-48 text-gray-700"
            value={props.status || "default"}
            onChange={handleStatusChange}
          >
            <option value="default" disabled>
              status
            </option>
            <option key="box" value="0">
              box
            </option>
            <option key="paleta" value="1">
              paleta
            </option>
            <option key="magazyn" value="2">
              magazyn
            </option>
            <option value="">wyczyść</option>
          </select>
        </div>
      </div>
      <BoxSeparator />
      <div
        className="box-border flex w-1/4 flex-col items-center justify-center p-5 text-center
"
      >
        <div>
          <input
            className="mb-2 h-8 font-sans font-normal placeholder-gray-700"
            value={props.operator}
            onChange={handleOperatorInput}
            placeholder="operator"
          ></input>
        </div>
        <div>
          <input
            className="font-norma gray-700 h-8 font-sans placeholder-gray-700"
            value={props.dmcInput}
            onChange={handleDmcOrBatchInput}
            placeholder="dmc / hydra / paleta"
          ></input>
        </div>
      </div>
      <BoxSeparator />
      <div
        className="box-border flex w-1/4 flex-col items-center justify-center p-5 text-center
"
      >
        <div>
          <label className="mx-2 font-thin text-gray-700" htmlFor="start-date">
            od:
          </label>
          <input
            className="mx-1 h-8 font-normal"
            type="datetime-local"
            id="start-date"
            value={props.startDate}
            onChange={handleStartDateChange}
          />
        </div>
      </div>
      <BoxSeparator />
      <div
        className="box-border flex w-1/4 flex-col items-center justify-center p-5 text-center
"
      >
        <div>
          <label className="mx-2 font-thin text-gray-700" htmlFor="end-date">
            do:
          </label>
          <input
            className="mx-1 h-8 font-sans font-normal"
            type="datetime-local"
            id="end-date"
            value={props.endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Chooser;
