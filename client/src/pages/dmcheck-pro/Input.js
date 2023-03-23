import React, { useState } from "react";

const Input = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setInput("");
      props.onSubmit(input);
    }
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <input
        className="h-20 w-6/12 rounded-lg bg-gray-100 text-center text-4xl shadow-lg focus:outline-bruss"
        type="text"
        value={input}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleSubmit}
        placeholder={props.placeholder}
        autoFocus
      />
    </div>
  );
};
export default Input;
