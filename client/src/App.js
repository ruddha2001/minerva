import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="App">
      {!authContext.isAuth ? <LoginPage /> : "Student/Teacher"}
    </div>
  );
}

export default App;
