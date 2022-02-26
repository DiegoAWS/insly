import React, { createContext, useContext, useState } from "react";
import { sendInsuranceData } from "services/insuranceService";
import { transformData } from "utils/transformData";

export const initialData ={ arrayData: [], columns: [] }
const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sendDataToServer = async (formData) => {

    setLoading(true);
    try {
      const response = await sendInsuranceData(formData);
      const data = transformData(response?.data);

      if(!data){
        throw new Error("Data Malformed")
      }

      setData(data)
      setIsModalOpen(true)
    } catch (e) {
      console.log(e.message)
    }

    setLoading(false);
  }

  const clearData = () => {
    setData(initialData);
  }

  const instanceContext = {
    loading, data, clearData, sendDataToServer,
    isModalOpen, setIsModalOpen
  };

  return (
    <GlobalContext.Provider value={instanceContext}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("Missing GlobalContextProvider Wrapper");
  }
  return context;
};

export { GlobalContextProvider, useGlobalContext };