import React, { useState, useEffect } from 'react'
import axios from 'axios'


// import XlsxPopulate from 'xlsx-populate';

import { API_URL } from '../../assets/config.js';

// TODO add article
// TODO migrate to react table

const DmcList = (props) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedDmcs, setSelectedDmcs] = useState([]);
    const [dmcList, setDmcList] = useState([]);
    const [reloadAfterSkip, setReloadAfterSkip] = useState(false)
  
    useEffect(() => {
        const params = {
          ...(props.workplace && props.workplace !== "default" && { workplace: props.workplace }),
          ...(props.article && props.article !== "default" && { article: props.article }),
          ...(props.status && props.status !== "default" && { status: props.status }),
          ...(props.operator && { operator: props.operator }),
          ...(props.startDate && { start: props.startDate }),
          ...(props.endDate && { end: props.endDate }),
          ...(props.dmcOrBatchInput && { dmcOrBatch: props.dmcOrBatchInput }),
        };
        axios
          .get(`${API_URL}/dmcheck-mgmt-find`, { params })
          .then(response => {
            setDmcList(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      
    }, [props.startDate, props.endDate, props.workplace, props.article, props.status, props.operator, props.dmcOrBatchInput, reloadAfterSkip]);
    
    useEffect(() => {
      if(dmcList.length) {
        handleSkip();
      }
    }, [props.skipClick])

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

    const handleSkip = () => {
      const collection = props.workplace;
      axios
        .post(`${API_URL}/dmcheck-mgmt-skip`, { selectedDmcs, collection }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setSelectedDmcs([]);
          setReloadAfterSkip(prev => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
        <div className='mgmt--dmc-list'>
          {dmcList.length > 0 && (
          <table className='dmc-list--table'>
            <thead>
              <tr className='dmc-list--tr'>
                <th className='dmc-list--th' colSpan={4} style={{ borderRight: '2px solid black' }}></th>
                <th className='dmc-list--th-dmc' colSpan={3} style={{ borderRight: '2px solid black' }}>część</th>
                <th className='dmc-list--th-hydra' colSpan={3} style={{ borderRight: '2px solid black' }}>box</th>
                <th className='dmc-list--th-pallet' colSpan={3}>paleta</th>
              </tr>
              <tr className='dmc-list--tr'>
                <th className='dmc-list--th'>
                  <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
                </th>
                <th className='dmc-list--th'>status</th>
                <th className='dmc-list--th'>stanowisko</th>
                <th className='dmc-list--th' style={{ borderRight: '2px solid black' }}>artykuł</th>
                <th className='dmc-list--th-dmc'>dmc</th>
                <th className='dmc-list--th-dmc'>operator</th>
                <th className='dmc-list--th-dmc' style={{ borderRight: '2px solid black' }}>czas</th>
                <th className='dmc-list--th-hydra'>batch</th>
                <th className='dmc-list--th-hydra'>operator</th>
                <th className='dmc-list--th-hydra' style={{ borderRight: '2px solid black' }}>czas</th>
                <th className='dmc-list--th-pallet'>batch</th>
                <th className='dmc-list--th-pallet'>operator</th>
                <th className='dmc-list--th-pallet'>czas</th>
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
                  {dmc.status === 9 && "pominięty"}
                </td>
                <td className='dmc-list--td'>{dmc.workplace}</td>
                <td className='dmc-list--td'  style={{ borderRight: '2px solid black' }}>{dmc.article}</td>
                <td className='dmc-list--td'>{dmc.dmc}</td>
                <td className='dmc-list--td'>{dmc.dmc_operator}</td>
                <td className='dmc-list--td' style={{ borderRight: '2px solid black' }}>{new Date(dmc.dmc_time).toLocaleString('pl-PL')}</td>
                <td className='dmc-list--td'>{dmc.hydra_batch || "-"}</td>
                <td className='dmc-list--td'>{dmc.hydra_operator || "-"}</td>
                <td className='dmc-list--td' style={{ borderRight: '2px solid black' }}>{dmc.hydra_time ? new Date(dmc.hydra_time).toLocaleString('pl-PL') : "-"}</td>
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




