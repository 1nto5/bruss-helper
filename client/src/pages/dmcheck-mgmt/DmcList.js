import React, { useState, useEffect } from "react";
import axios from "axios";

// import XlsxPopulate from 'xlsx-populate';

import { API_URL } from "../../assets/config.js";

// TODO add article
// TODO migrate to react table

const DmcList = (props) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDmcs, setSelectedDmcs] = useState([]);
  const [dmcList, setDmcList] = useState([]);
  const [reloadAfterSkip, setReloadAfterSkip] = useState(false);

  useEffect(() => {
    const params = {
      ...(props.workplace &&
        props.workplace !== "default" && { workplace: props.workplace }),
      ...(props.article &&
        props.article !== "default" && { article: props.article }),
      ...(props.status &&
        props.status !== "default" && { status: props.status }),
      ...(props.operator && { operator: props.operator }),
      ...(props.startDate && { start: props.startDate }),
      ...(props.endDate && { end: props.endDate }),
      ...(props.dmcOrBatchInput && { dmcOrBatch: props.dmcOrBatchInput }),
    };
    axios
      .get(`${API_URL}/dmcheck-mgmt/find`, { params })
      .then((response) => {
        setDmcList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    props.startDate,
    props.endDate,
    props.workplace,
    props.article,
    props.status,
    props.operator,
    props.dmcOrBatchInput,
    reloadAfterSkip,
  ]);

  useEffect(() => {
    if (dmcList.length) {
      handleSkip();
    }
  }, [props.skipClick]);

  const handleDmcSelection = (dmc) => {
    const index = selectedDmcs.findIndex(
      (selectedDmc) => selectedDmc._id === dmc._id
    );
    if (index !== -1) {
      setSelectedDmcs((prevSelectedDmcs) => [
        ...prevSelectedDmcs.slice(0, index),
        ...prevSelectedDmcs.slice(index + 1),
      ]);
    } else {
      setSelectedDmcs((prevSelectedDmcs) => [...prevSelectedDmcs, dmc]);
    }
  };

  const isSelected = (dmc) => {
    return selectedDmcs.some((selectedDmc) => selectedDmc._id === dmc._id);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedDmcs(selectAll ? [] : [...dmcList]);
  };

  const handleSkip = () => {
    const collection = props.workplace;
    axios
      .post(
        `${API_URL}/dmcheck-mgmt/skip`,
        { selectedDmcs, collection },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSelectedDmcs([]);
        setReloadAfterSkip((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-4 shadow-lg">
      {dmcList.length > 0 && (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-left text-gray-50">
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectAll}
                />
              </th>
              <th className="p-2 font-extralight">status</th>
              <th className="p-2 font-extralight">stanowisko</th>
              <th className="p-2 font-extralight">artykuł</th>
              <th className="p-2 font-extralight">dmc</th>
              <th className="p-2 font-extralight">operator</th>
              <th className="p-2 font-extralight">czas</th>
              <th className="p-2 font-extralight">batch box</th>
              <th className="p-2 font-extralight">operator</th>
              <th className="p-2 font-extralight">czas</th>
              <th className="p-2 font-extralight">batch paleta</th>
              <th className="p-2 font-extralight">operator</th>
              <th className="p-2 font-extralight">czas</th>
            </tr>
          </thead>

          <tbody>
            {dmcList.map((dmc) => (
              <tr
                key={dmc._id}
                className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
                onClick={() => {
                  const checkbox = document.getElementById(`dmc-${dmc._id}`);
                  checkbox.checked = !checkbox.checked;
                  handleDmcSelection(dmc);
                }}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    id={`dmc-${dmc._id}`}
                    onChange={() => handleDmcSelection(dmc)}
                    checked={isSelected(dmc)}
                  />
                </td>
                <td className="p-2">
                  {dmc.status === 0 && "box"}
                  {dmc.status === 1 && "paleta"}
                  {dmc.status === 2 && "magazyn"}
                  {dmc.status === 9 && "pominięty"}
                </td>
                <td className="p-2">{dmc.workplace}</td>
                <td className="border-r-2 p-2">{dmc.article}</td>
                <td className="p-2">{dmc.dmc}</td>
                <td className="p-2">{dmc.dmc_operator}</td>
                <td className="border-r-2 p-2">
                  {new Date(dmc.dmc_time).toLocaleString("pl-PL")}
                </td>
                <td className="p-2">{dmc.hydra_batch || "-"}</td>
                <td className="p-2">{dmc.hydra_operator || "-"}</td>
                <td className="border-r-2 p-2">
                  {dmc.hydra_time
                    ? new Date(dmc.hydra_time).toLocaleString("pl-PL")
                    : "-"}
                </td>
                <td className="p-2">{dmc.pallet_batch || "-"}</td>
                <td className="p-2">{dmc.pallet_operator || "-"}</td>
                <td className="p-2">
                  {dmc.pallet_time
                    ? new Date(dmc.pallet_time).toLocaleString("pl-PL")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DmcList;
