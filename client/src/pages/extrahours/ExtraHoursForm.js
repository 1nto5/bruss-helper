import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// TODO make it "modal"

const ExtraHoursForm = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [extraHours, setExtraHours] = useState(0);
  const { supervisorList } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the extra hours data to the API or perform any other required action
  };

  useEffect(() => {
    if (startTime && endTime) {
      handleTimeChange(startTime, endTime);
    }
  }, [startTime, endTime]);

  const calculateExtraHours = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);
    const diff = endDate - startDate;
    const hours = diff / (1000 * 60 * 60);

    // Round down to the nearest half hour
    return Math.floor(hours * 2) / 2;
  };

  const handleTimeChange = (start, end) => {
    if (start && end) {
      setExtraHours(calculateExtraHours(start, end));
    }
  };

  return (
    <div className="mx-auto my-10 w-full max-w-xs rounded-lg bg-white p-6 shadow-md">
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          type="time"
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
            handleTimeChange(e.target.value, endTime);
          }}
          required
        />
        <input
          className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          type="time"
          value={endTime}
          onChange={(e) => {
            setEndTime(e.target.value);
            handleTimeChange(startTime, e.target.value);
          }}
          required
        />
        <select
          className="w-5/6 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
          value={supervisor}
          onChange={(e) => setSupervisor(e.target.value)}
          required
        >
          <option value="">Select Supervisor</option>
          {supervisorList.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.name}
            </option>
          ))}
        </select>
        <button
          className="w-2/3 rounded bg-gray-200 py-2 px-4 font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
          type="submit"
        >
          Submit
        </button>
        {extraHours > 0 && (
          <p className="text-sm font-medium text-gray-800">
            Extra Hours: {extraHours}
          </p>
        )}
      </form>
    </div>
  );
};

export default ExtraHoursForm;
