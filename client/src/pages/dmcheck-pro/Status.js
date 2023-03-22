import React from "react";
import {
  StatusBox,
  StatusBoxBlinking,
  BoxSeparator,
} from "../../components/StatusElements";

function Status(props) {
  return (
    <div className="mt-10 flex h-40 flex-row items-center justify-between bg-gray-50 shadow-lg">
      <StatusBox text="operator:" value={props.operator} />
      <BoxSeparator />
      <StatusBox text="artykuł:" value={props.article} />
      <BoxSeparator />

      {props.workStage === 1 ? (
        <StatusBoxBlinking text="w boxie:" value={props.box} />
      ) : (
        <StatusBox text="w boxie:" value={props.box} />
      )}

      {props.palletBox && [
        // ERROR WHEN NO KEY?
        <div key="pallet-separator" className="status--separator"></div>,
        <div
          key="pallet-box"
          className={
            props.workStage === 2 ? "status--box-blinking" : "status--box"
          }
        >
          <p className="box--label">Paleta:</p>
          <p className="box--value">{props.pallet}</p>
        </div>,
      ]}
    </div>
  );
}

export default Status;
