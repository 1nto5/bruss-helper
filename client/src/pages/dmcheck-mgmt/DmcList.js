import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

// TODO excel export
// TODO change color when no pallet batch
// TODO clean selected when reload

const DmcList = (props) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDmcs, setSelectedDmcs] = useState([]);
  const [dmcList, setDmcList] = useState([]);
  const [reloadAfterSkip, setReloadAfterSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedDmcs([]); // Empty selectedDmcs when reloading data
    setIsLoading(true); // Set loading state to true before fetching data
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
      .get(`${process.env.REACT_APP_API_URL}/dmcheck-mgmt/find`, { params })
      .then((response) => {
        setDmcList(response.data);
        setIsLoading(false); // Set loading state to false after fetching data
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set loading state to false even if there's an error
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
        `${process.env.REACT_APP_API_URL}/dmcheck-mgmt/skip`,
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
  const exportToExcel = () => {
    const formattedDmcs = selectedDmcs.map((dmc) => {
      let statusText;
      switch (dmc.status) {
        case 0:
          statusText = "box";
          break;
        case 1:
          statusText = "paleta";
          break;
        case 2:
          statusText = "magazyn";
          break;
        case 9:
          statusText = "pominięty";
          break;
        default:
          statusText = "";
      }

      const formatDate = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
      };

      const formatTime = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        return `${d.getHours().toString().padStart(2, "0")}:${d
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
      };

      return {
        status: statusText,
        workplace: dmc.workplace,
        article: dmc.article,
        dmc: dmc.dmc,
        dmc_operator: dmc.dmc_operator,
        dmc_date: formatDate(dmc.dmc_time),
        dmc_time: formatTime(dmc.dmc_time),
        hydra_batch: dmc.hydra_batch || "-",
        hydra_operator: dmc.hydra_operator || "-",
        hydra_date: formatDate(dmc.hydra_time),
        hydra_time: formatTime(dmc.hydra_time),
        pallet_batch: dmc.pallet_batch || "-",
        pallet_operator: dmc.pallet_operator || "-",
        pallet_date: formatDate(dmc.pallet_time),
        pallet_time: formatTime(dmc.pallet_time),
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedDmcs, {
      header: [
        "status",
        "workplace",
        "article",
        "dmc",
        "dmc_operator",
        "dmc_date",
        "dmc_time",
        "hydra_batch",
        "hydra_operator",
        "hydra_date",
        "hydra_time",
        "pallet_batch",
        "pallet_operator",
        "pallet_date",
        "pallet_time",
      ],
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Rows");
    XLSX.writeFile(wb, "selected_rows.xlsx");
  };

  return (
    <div className="mt-4 shadow-lg">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-800"></div>
        </div>
      )}
      {selectedDmcs.length > 0 && (
        <button
          className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={exportToExcel}
        >
          Export Selected Rows to Excel
        </button>
      )}

      {dmcList.length > 0 && !isLoading && (
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
