import React from 'react'

function Status(props) {
  return (
    <div className="status">
      <div className="status--box">
        <p className="box--label">Operator:</p>
        <p className="box--value">{props.operator}</p>
      </div>
      <div className="status--separator"></div>
      <div className="status--box">
        <p className="box--label">Artykuł:</p>
        <p className="box--value">{props.article}</p>
      </div>
      <div className="status--separator"></div>
      <div className={props.workStage === 1 ? "status--box-blinking" :  "status--box"}>
        <p className="box--label">Box:</p>
        <p className="box--value">{props.box}</p>
      </div>
      {props.palletBox && [
        // ERROR WHEN NO KEY?
        <div key='pallet-separator' className="status--separator"></div>,
        <div key='pallet-box' className={props.workStage === 2 ? "status--box-blinking" : "status--box"}>
          <p className="box--label">Paleta:</p>
          <p className="box--value">{props.pallet}</p>
        </div>
      ]}
    </div>
  );
}

export default Status;
