import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "../../components/Footer";
import InfoBox from "../../components/InfoBox";
import ExtraHoursFormModal from "./ExtraHoursFormModal";

import { AuthContext } from "../../contexts/AuthContext";

const ExtraHours = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Extra hours";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const { isLoggedIn } = useContext(AuthContext);
  const { extrahoursSupervisor } = useContext(AuthContext);
  const { extrahoursHr } = useContext(AuthContext);

  const [showExtraHoursForm, setShowExtraHoursForm] = useState(false);

  return (
    <>
      <Header />

      {isLoggedIn && <></>}

      {!isLoggedIn && (
        <InfoBox>
          <p className="">Zaloguj się aby uzyskać dostęp do extra hours.</p>
        </InfoBox>
      )}

      {/* Button to open the ExtraHoursFormModal */}
      <button
        className="mx-auto my-10 w-2/3 rounded bg-gray-200 py-2 px-4 font-thin text-gray-800 shadow-md transition-colors duration-300 hover:bg-bruss hover:text-white"
        onClick={() => setShowExtraHoursForm(true)}
      >
        Add Extra Hours
      </button>

      {/* Show the ExtraHoursFormModal based on state */}
      {showExtraHoursForm && (
        <ExtraHoursFormModal onClose={() => setShowExtraHoursForm(false)} />
      )}

      <Footer version={"0.0.1"} />
    </>
  );
};

export default ExtraHours;
