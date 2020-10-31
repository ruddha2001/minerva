import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  setIsAuth: (_isAuth) => {},
  logoutHandler: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const logoutHandler = () => {
    setIsAuth(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    alert("Logged out.");
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, logoutHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
