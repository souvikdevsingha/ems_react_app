import React, { createContext, useContext, useState } from 'react';

const DataServiceContext = createContext();

export const useDataService = () => useContext(DataServiceContext);

export const DataServiceProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const setSharedData = (newData) => {
    setData(newData);
  };

  const getSharedData = () => {
    return data;
  };

  return (
    <DataServiceContext.Provider value={{ setSharedData, getSharedData }}>
      {children}
    </DataServiceContext.Provider>
  );
};
