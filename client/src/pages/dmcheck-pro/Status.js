// check code in Status.js and give me a hint what is wrong with it

import React from "react";
import {
  StatusBox,
  StatusBoxBlinking,
  BoxSeparator,
} from "../../components/StatusElements";

function Status(props) {
  return (
    <div className="mb-10 flex h-40 flex-row items-center justify-between bg-gray-50 shadow-lg">
      <StatusBox text="operator:" value={props.operator} />
      <BoxSeparator />
      <StatusBox text="artykuł:" value={props.article} />
      <BoxSeparator />

      {props.workStage === 1 ? (
        <StatusBoxBlinking text="w boxie:" value={props.box} />
      ) : (
        <StatusBox text="w boxie:" value={props.box} />
      )}

      <BoxSeparator />

      {props.palletBox && props.workStage !== 2 && (
        <StatusBox text="na palecie:" value={props.pallet} />
      )}

      {props.palletBox && props.workStage === 2 && (
        <StatusBoxBlinking text="na palecie:" value={props.pallet} />
      )}
    </div>
  );
}

export default Status;
