import React, { useState, useContext, useEffect } from "react";
import Header from "./components/Header";
import Footer from "../../components/Footer";
import InfoBox from "../../components/InfoBox";
import CardTable from "./components/Table";

import { Provider as ContextProvider } from "./Context";

const Inventory = () => {
  useEffect(() => {
    document.title = "Inventory";
  }, []);

  return (
    <>
      <ContextProvider>
        <Header />
        <CardTable />
      </ContextProvider>

      {/* {!isLoggedIn && (
        <InfoBox>
          <p className="">
            Zaloguj się aby uzyskać dostęp do podglądu i zarządzania DMCheck.
          </p>
        </InfoBox>
      )} */}

      {/* {isLoggedIn && (
        <InfoBox>
          <p className="">
            Nie masz nadanych odpowiednich uprawnień do podglądu i zarządzania
            DMCheck.{" "}
          </p>
          <p className="mb-2">
            Jeśli chcesz uzyskać dostęp do tej funkcji, skontaktuj się z działem
            IT.
          </p>
          <a
            className="hover:text-bruss"
            href="mailto:support@bruss-group.com?subject=Dostęp do DMCheck MGMT&body=Proszę o nadanie mi dostępu do zarządzania DMCheck MGMT w celu: (wpisać cel)."
          >
            Kliknij aby wysłać wiadomość email.
          </a>
        </InfoBox>
      )} */}

      <Footer version={"0.0.1"} />
    </>
  );
};

export default Inventory;
