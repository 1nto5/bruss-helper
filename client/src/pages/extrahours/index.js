import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "../../components/Footer";
import InfoBox from "../../components/InfoBox";
import ModalForm from "./ModalForm";
import Table from "./Table";

import { AuthContext } from "../../contexts/AuthContext";

const ExtraHours = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Extra hours";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const [extraHoursData, setExtraHoursData] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  // const { extrahoursSupervisor } = useContext(AuthContext);
  // const { extrahoursHr } = useContext(AuthContext);

  const [showExtraHoursForm, setShowExtraHoursForm] = useState(false);

  const fetchUserExtraHours = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/extrahours/user-data/${userId}`
      );
      setExtraHoursData(response.data);
    } catch (error) {
      console.error("Error fetching extra hours:", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchUserExtraHours();
    }
  }, [isLoggedIn, userId]);

  return (
    <>
      <Header showExtraHoursForm={() => setShowExtraHoursForm(true)} />

      {isLoggedIn && <></>}

      {!isLoggedIn && (
        <InfoBox>
          <p className="">Zaloguj się aby uzyskać dostęp.</p>
        </InfoBox>
      )}

      {/* Show the ModalForm based on state */}
      {showExtraHoursForm && (
        <ModalForm
          onClose={() => setShowExtraHoursForm(false)}
          userId={userId}
        />
      )}

      {isLoggedIn && extraHoursData && <Table data={extraHoursData} />}

      <Footer version={"0.0.1"} />
    </>
  );
};

export default ExtraHours;
