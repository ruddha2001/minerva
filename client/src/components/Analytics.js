import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";

const Graph = styled.div``;

function Analytics(props) {
  const authContext = useContext(AuthContext);
  const authToken = localStorage.getItem("authToken");
  if (authToken && !authContext.isAuth) {
    authContext.setIsAuth(true);
  }
  return <Graph>{JSON.stringify(props.analytics)}</Graph>;
}

export default Analytics;
