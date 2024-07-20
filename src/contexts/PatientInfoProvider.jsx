import { createContext, useContext, useState } from 'react';

const BasicInfoContext = createContext();

function PatientInfoProvider({ children }) {
  const [basicInfo, setBasicInfo] = useState();

  return (
    <BasicInfoContext.Provider
      value={{
        basicInfo,
        setBasicInfo,
      }}
    >
      {children}
    </BasicInfoContext.Provider>
  );
}

function useBasicInfoAccess() {
  const context = useContext(BasicInfoContext);
  if (context === undefined)
    throw new Error(
      'BasicInfoContext was used outside the PatientInfoProvider',
    );

  return context;
}

export { PatientInfoProvider, useBasicInfoAccess };
