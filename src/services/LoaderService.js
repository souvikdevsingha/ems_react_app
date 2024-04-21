import React, { createContext, useContext, useState } from 'react';

const LoaderServiceContext = createContext();

export const useLoaderService = () => useContext(LoaderServiceContext);

export const LoaderServiceProvider = ({ children }) => {
    const [isLoadingShow, setIsLoadingShow] = useState(false);
  
    const setLoadingFlag = (newData) => {
      setIsLoadingShow(newData);
    };
  
    const getLoadingData = () => {
      return isLoadingShow;
    };
  
    return (
      <LoaderServiceContext.Provider value={{ setLoadingFlag, getLoadingData }}>
        {children}
      </LoaderServiceContext.Provider>
    );
  };
