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
    <button
      onClick={handleClickWorkplace}
      className="ml-8 mr-8 mb-16 rounded bg-gray-100 p-10 text-center text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
    >
      <span className="block text-4xl tracking-widest">{props.name}</span>
    </button>
  );
};

export default WorkplaceCard;
