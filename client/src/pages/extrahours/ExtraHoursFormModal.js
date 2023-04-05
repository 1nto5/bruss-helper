import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const ExtraHoursFormModal = (props) => {
  const [supervisorsList, setSupervisorsList] = useState([]);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [extraHours, setExtraHours] = useState(0);
  const [reason, setReason] = useState("");
  const { userId } = useContext(AuthContext);

  const fetchSupervisorsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/extrahours-supervisors`
      );
      setSupervisorsList(response.data);
    } catch (error) {
      console.error("Error fetching supervisors:", error.message);
    }
  };

  useEffect(() => {
    fetchSupervisorsList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/extrahours/save`,
        {
          userId, // assuming you have access to the current user's ID
          startDateTime,
          endDateTime,
          extraHours,
          reason,
          supervisor,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error saving extra hours:", error.message);
    }
  };

  useEffect(() => {
    if (startDateTime && endDateTime) {
      handleTimeChange(startDateTime, endDateTime);
    }
  }, [startDateTime, endDateTime]);

  const calculateExtraHours = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
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

  // Handler for clicking outside the modal to close it
  const handleClickOutside = (e) => {
    if (e.target.className.includes("modal-background")) {
      props.onClose();
    }
  };

  // Update the end date when the start date changes
  useEffect(() => {
    if (startDateTime) {
      setEndDateTime(startDateTime);
    }
  }, [startDateTime]);

  return (
    <div
      className="modal-background fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="modal-content w-full max-w-md rounded bg-white p-6 text-center">
        <button
          className="close-button absolute top-2 right-2 text-2xl"
          onClick={props.onClose}
        >
          &times;
        </button>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="start-datetime" className="tracking-wider">
            rozpoczęcie nadgodzin:
          </label>
          <input
            id="start-datetime"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            required
          />
          <label htmlFor="end-datetime" className="tracking-wider">
            zakończenie pracy:
          </label>
          <input
            id="end-datetime"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            required
          />
          {extraHours > 0 && (
            <p className="text-sm font-medium text-gray-800">
              Suma nadgodzin: {extraHours} (dokładność 0.5 godz.)
            </p>
          )}
          <label htmlFor="supervisor" className="tracking-wider">
            przełożony:
          </label>
          <select
            id="supervisor"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            required
          >
            <option value="">wybierz</option>
            {supervisorsList.map((supervisor) => (
              <option key={supervisor._id} value={supervisor._id}>
                {supervisor.firstName} {supervisor.lastName}
              </option>
            ))}
          </select>
          <label htmlFor="reason" className="tracking-wider">
            powód:
          </label>
          <input
            id="reason"
            className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-bruss"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <button
            className="rounded bg-gray-200 py-2 px-4 font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
            type="submit"
          >
            wyślij
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExtraHoursFormModal;
