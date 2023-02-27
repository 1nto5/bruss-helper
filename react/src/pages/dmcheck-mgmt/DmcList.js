import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import XlsxPopulate from 'xlsx-populate';

import { API_URL } from '../../assets/config.js';


const DmcList = (props) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedDmcs, setSelectedDmcs] = useState([]);
    const [dmcList, setDmcList] = useState([]);
    const [reloadAfterDelete, setReloadAfterDelete] = useState(false)
  
    useEffect(() => {
      if (props.article !== 'default') {
        const params = {
          workplace: props.workplace,
          article: props.article,
          ...(props.startDate && { start: props.startDate }),
          ...(props.endDate && { end: props.endDate }),
          ...(props.hydraBatchInput && { hydraBatchInput: props.hydraBatchInput }),
          ...(props.palletBatchInput && { palletBatchInput: props.palletBatchInput })
        };
    
        axios
          .get(`${API_URL}/find`, { params })
          .then(response => {
            setDmcList(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [props.startDate, props.endDate, props.workplace, props.article, props.hydraBatchInput, props.palletBatchInput, reloadAfterDelete]);
    
    useEffect(() => {
      if(dmcList.length) {
        handleDelete();
      }
    }, [props.deleteClick])

    useEffect(() => {
      if(dmcList.length) {
        printSelectedDmcs();
      }
    }, [props.printClick])

    const handleDmcSelection = (dmc) => {
      const index = selectedDmcs.findIndex((selectedDmc) => selectedDmc._id === dmc._id);
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

    const handleDelete = () => {
      const collection = props.workplace;
      axios
        .post(`${API_URL}/delete`, { selectedDmcs, collection }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setSelectedDmcs([]);
          setReloadAfterDelete(prev => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const printSelectedDmcs = () => {
      const printContent = selectedDmcs.map((dmc) => {
        const statusText = (status) => {
          if (status === 0) {
            return "box";
          } else if (status === 1) {
            return "paleta";
          } else if (status === 2) {
            return "magazyn";
          } else if (status === 9) {
            return "usunięty";
          } else {
            return "";
          }
        };
        return `<tr>
                  <td>${statusText(dmc.status)}</td>
                  <td>${dmc.dmc}</td>
                  <td>${dmc.dmc_operator}</td>
                  <td>${new Date(dmc.dmc_time).toLocaleString('pl-PL')}</td>
                  <td>${dmc.hydra_batch || '-'}</td>
                  <td>${dmc.hydra_operator || '-'}</td>
                  <td>${dmc.hydra_time ? new Date(dmc.hydra_time).toLocaleString('pl-PL') : '-'}</td>
                  <td>${dmc.pallet_batch || '-'}</td>
                  <td>${dmc.pallet_operator || '-'}</td>
                  <td>${dmc.pallet_time ? new Date(dmc.pallet_time).toLocaleString('pl-PL') : '-'}</td>
                </tr>`;
      }).join('');
      const printWindow = window.open('', 'PrintWindow', 'height=400,width=800');
      printWindow.document.write(`
        <html>
          <head>
            <title>Selected DMCs</title>
            <style>
              table {
                border-collapse: collapse;
                font-size: 10px;
              }
              th, td {
                border: 1px solid black;
                padding: 2px;
              }
              th {
                background-color: #ddd;
              }
            </style>
          </head>
          <body>
            <table>
              <thead>
                <tr>
                  <th>status</th>
                  <th>dmc</th>
                  <th>operator</th>
                  <th>czas</th>
                  <th>hydra</th>
                  <th>operator</th>
                  <th>czas</th>
                  <th>paleta</th>
                  <th>operator</th>
                  <th>czas</th>
                </tr>
              </thead>
              <tbody>
                ${printContent}
              </tbody>
            </table>
          </body>
        </html>`
      );
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  
    // const exportSelectedDmcsToExcel = async () => {
    //   if (selectedDmcs.length === 0) {
    //     alert('Please select some DMCs to export');
    //     return;
    //   }
    
    //   const workbook = await XlsxPopulate.fromBlankAsync();
    //   const sheet = workbook.sheet('Sheet1');
    
    //   const headers = [
    //     'status',
    //     'dmc',
    //     'operator',
    //     'czas',
    //     'batch hydra',
    //     'operator hydra',
    //     'czas hydra',
    //     'batch paleta',
    //     'operator paleta',
    //     'czas paleta',
    //   ];
    //   sheet.row(1).cell(1).value(headers);
    
    //   selectedDmcs.forEach((dmc, index) => {
    //     const row = sheet.row(index + 2);
    //     row.cell(1).value(dmc.status === 0 ? 'w boksie' : '');
    //     row.cell(2).value(dmc.dmc);
    //     row.cell(3).value(dmc.dmc_operator);
    //     row.cell(4).value(new Date(dmc.dmc_time).toLocaleString('pl-PL'));
    //     row.cell(5).value(dmc.hydra_batch || '-');
    //     row.cell(6).value(dmc.hydra_operator || '-');
    //     row.cell(7).value(dmc.hydra_time ? new Date(dmc.hydra_time).toLocaleString('pl-PL') : '-');
    //     row.cell(8).value(dmc.pallet_batch || '-');
    //     row.cell(9).value(dmc.pallet_operator || '-');
    //     row.cell(10).value(dmc.pallet_time ? new Date(dmc.pallet_time).toLocaleString('pl-PL') : '-');
    //   });
    
    //   const fileBuffer = await workbook.outputAsync();
    //   const fileName = `selected-dmcs-${new Date().toISOString().slice(0, 19)}.xlsx`;
    //   const fileUrl = window.URL.createObjectURL(new Blob([fileBuffer]));
    //   const fileLink = document.createElement('a');
    //   fileLink.href = fileUrl;
    //   fileLink.setAttribute('download', fileName);
    //   document.body.appendChild(fileLink);
    //   fileLink.click();
    //   document.body.removeChild(fileLink);
    // };


    return (
        <div className='mgmt--dmc-list'>
          {dmcList.length > 0 && (
          <table className='dmc-list--table'>
            <thead>
              <tr className='dmc-list--tr'>
                <th className='dmc-list--th'>
                  <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
                </th>
                <th className='dmc-list--th'>status</th>
                <th className='dmc-list--th'>dmc</th>
                <th className='dmc-list--th'>operator</th>
                <th className='dmc-list--th'>czas</th>
                <th className='dmc-list--th'>hydra</th>
                <th className='dmc-list--th'>operator</th>
                <th className='dmc-list--th'>czas</th>
                <th className='dmc-list--th'>paleta</th>
                <th className='dmc-list--th'>operator</th>
                <th className='dmc-list--th'>czas</th>
              </tr>
            </thead>
            <tbody>
            {dmcList.map((dmc) => (
              <tr key={dmc._id} onClick={() => {
                  const checkbox = document.getElementById(`dmc-${dmc._id}`);
                  checkbox.checked = !checkbox.checked;
                  handleDmcSelection(dmc)
                }}
              >
                <td className='dmc-list--td'>
                  <input type="checkbox" id={`dmc-${dmc._id}`} onChange={() => handleDmcSelection(dmc)} checked={isSelected(dmc)} />
                </td>
                <td className='dmc-list--td'>
                  {dmc.status === 0 && "box"}
                  {dmc.status === 1 && "paleta"}
                  {dmc.status === 2 && "magazyn"}
                  {dmc.status === 9 && "usunięty"}
                </td>
                <td className='dmc-list--td'>{dmc.dmc}</td>
                <td className='dmc-list--td'>{dmc.dmc_operator}</td>
                <td className='dmc-list--td'>{new Date(dmc.dmc_time).toLocaleString('pl-PL')}</td>
                <td className='dmc-list--td'>{dmc.hydra_batch || "-"}</td>
                <td className='dmc-list--td'>{dmc.hydra_operator || "-"}</td>
                <td className='dmc-list--td'>{dmc.hydra_time ? new Date(dmc.hydra_time).toLocaleString('pl-PL') : "-"}</td>
                <td className='dmc-list--td'>{dmc.pallet_batch || "-"}</td>
                <td className='dmc-list--td'>{dmc.pallet_operator || "-"}</td>
                <td className='dmc-list--td'>{dmc.pallet_time ? new Date(dmc.pallet_time).toLocaleString('pl-PL') : "-"}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    )
}

export default DmcList




