import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "../../components/Footer";
import InfoBox from "../../components/InfoBox";
import ExtraHoursForm from "./ExtraHoursForm";

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

  return (
    <>
      <Header />

      {isLoggedIn && <></>}

      {!isLoggedIn && (
        <InfoBox>
          <p className="">Zaloguj się aby uzyskać dostęp do extra hours.</p>
        </InfoBox>
      )}

      <ExtraHoursForm />

      <Footer version={"0.0.1"} />
    </>
  );
};

export default ExtraHours;
