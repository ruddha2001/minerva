import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import Axios from "axios";
import { toast } from "react-toastify";

const Graph = styled.div``;

function Analytics(props) {
  const authContext = useContext(AuthContext);
  const [upvotes, setUpvotes] = useState({});
  const [unit, setUnit] = useState({});
  const [downvotes, setDownvotes] = useState({});

  useEffect(() => {
    var endpoint = "/api/v1/analytic?code=t11111111111112&op=unit";
    const authToken = JSON.parse(localStorage.getItem("authToken"));

    Axios.get(endpoint, { headers: { "x-auth-token": authToken } })
      .then((response) => {
        setUnit(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            authContext.logoutHandler();

            toast.error(error.response.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else if (error.response.status === 500) {
            alert("No classes created. Start by creating a class.");
          }
        }
      });

    Axios.get("/api/v1/analytic?code=t11111111111112&op=up", {
      headers: { "x-auth-token": authToken },
    })
      .then((response) => {
        setUpvotes(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            authContext.logoutHandler();

            toast.error(error.response.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else if (error.response.status === 500) {
            alert("No classes created. Start by creating a class.");
          }
        }
      });
    Axios.get("/api/v1/analytic?code=t11111111111112&op=d", {
      headers: { "x-auth-token": authToken },
    })
      .then((response) => {
        setDownvotes(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            authContext.logoutHandler();

            toast.error(error.response.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else if (error.response.status === 500) {
            alert("No classes created. Start by creating a class.");
          }
        }
      });
  }, []);

  return (
    <Graph>
      <div>Upvotes</div>
      {Object.keys(upvotes).map((keyName, i) => (
        <div>
          <a href={`#${keyName}`}>{keyName}</a>
          {" : " + upvotes[keyName]}
        </div>
      ))}
      <br />
      <div>Downvotes</div>
      {Object.keys(downvotes).map((keyName, i) => (
        <div>
          <a href={`#${keyName}`}>{keyName}</a>
          {" : " + downvotes[keyName]}
        </div>
      ))}
      <br />
      <div>No of questions per unit</div>
      {Object.keys(unit).map((keyName, i) => (
        <div>{"Unit " + keyName + " : " + unit[keyName]}</div>
      ))}
      <br />
    </Graph>
  );
}

export default Analytics;
