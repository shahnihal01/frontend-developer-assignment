import React, { createContext, useContext, useMemo, useState } from 'react';

const RecipientsDataContext = createContext({
  recipientsData: [],
  updateRecipientsData: (newData: any) => {},
});

export const useRecipientsData = () => {
  const context = useContext(RecipientsDataContext);
  if (!context) {
    throw new Error('useRecipientsData must be used within a RecipientsDataProvider');
  }
  return context;
};

export const RecipientsDataProvider = ({ children, initialData }) => {
  const [recipientsData, setRecipientsData] = useState(initialData);

  const updateRecipientsData = (newData: any) => {
    setRecipientsData(newData);
  };

  const contextValue = useMemo(() => {
    return { recipientsData, updateRecipientsData };
  }, [recipientsData, updateRecipientsData]);

  return (
    <RecipientsDataContext.Provider value={contextValue}>
      {children}
    </RecipientsDataContext.Provider>
  );
};
