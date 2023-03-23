import React, { useState, useEffect } from "react";

const WorkplaceCard = (props) => {
  const [workplaceName, setWorkplaceName] = useState("");
  const handleClickWorkplace = () => {
    setWorkplaceName(props.name);
  };
  useEffect(() => {
    if (workplaceName) {
      props.workplaceLogin(workplaceName);
    }
  }, [workplaceName]);

  return (
    <button onClick={handleClickWorkplace} className="workplaces--button">
      {props.name}
    </button>
  );
};

export default WorkplaceCard;
