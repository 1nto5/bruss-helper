import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import Footer from "../../components/Footer";
import CardTable from "./components/Table";
import Status from "./components/Status";

import { Provider as ContextProvider } from "./Context";

const queryClient = new QueryClient();

const Inventory = () => {
  useEffect(() => {
    document.title = "Inventory";
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Header />
          <Status />
          <CardTable />
        </ContextProvider>
      </QueryClientProvider>

      <Footer version={"0.0.1"} />
    </>
  );
};

export default Inventory;
