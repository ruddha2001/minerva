import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const authContext = useContext(AuthContext);
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (authToken) {
      authContext.setIsAuth(true);
    }
  }, []);

  return (
    <div className="App">
      {!authContext.isAuth ? <LoginPage /> : <DashboardPage />}

      <ToastContainer />
    </div>
  );
}

export default App;
