import { createContext, useContext } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

const CookiesContext = createContext();

function CookiesAccessProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  function getCookie(name) {
    return cookies[name];
  }

  return (
    <CookiesContext.Provider
      value={{
        setCookie,
        getCookie,
        removeCookie,
      }}
    >
      <CookiesProvider
        defaultSetOptions={{
          path: '/',
          // httpOnly: true,
          // secure: true
        }}
      >
        {children}
      </CookiesProvider>
    </CookiesContext.Provider>
  );
}

function useCookiesAccess() {
  const context = useContext(CookiesContext);
  if (context === undefined)
    throw new Error('CookiesContext was used outside the CookiesProvider');

  return context;
}

export { CookiesAccessProvider, useCookiesAccess };
