import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import profilePic from "../assets/profile.png";
import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import { toast } from "react-toastify";
import axios from "axios";

import Analytics from "../components/Analytics";
import Questions from "../components/Questions";

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr;

  .sidebar {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${colors.background};

    .image {
      width: 80%;
      border-radius: 50rem;
      border: 0.25rem solid ${colors.green};
    }

    .button {
      background-color: #dc3545;
      padding: 0.75rem 1rem;
      border-radius: 5rem;
      text-align: center;
      color: white;
      outline: none;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      cursor: pointer;

      &:hover {
        filter: brightness(1.1);
      }

      &:active {
        filter: brightness(1);
        opacity: 0.7;
      }
    }
  }
`;

function DashboardPage() {
  const authContext = useContext(AuthContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const endpoint = "/api/v1/user/";
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    console.log(authToken);

    axios
      .get(endpoint, { headers: { "x-auth-token": authToken } })
      .then((response) => {
        response.data.role =
          response.data.role[0].toUpperCase() + response.data.role.slice(1);
        setDetails(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
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
          }
        }
      });
  }, []);

  return (
    <Dashboard>
      <div className="sidebar">
        <img className="image" src={profilePic} />
        <div className="detail">{details.name || "-"}</div>
        <div className="detail">{details.role || "-"}</div>
        <div className="detail">{details.email || "-"}</div>
        <div className="detail">{details.mobile || "-"}</div>

        <div
          className="button"
          onClick={() => {
            authContext.logoutHandler();
            toast.error("Logged Out", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }}
        >
          Logout
        </div>
      </div>
      <div className="container">
        {localStorage.getItem("role") === "teacher" && (
          <Analytics analytics={{}} />
        )}
        <Questions questions={[]} />
      </div>
    </Dashboard>
  );
}

export default DashboardPage;
