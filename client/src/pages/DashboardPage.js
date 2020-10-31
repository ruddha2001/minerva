import React, { useContext } from "react";
import styled from "styled-components";

import profilePic from "../assets/profile.png";
import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import { toast } from "react-toastify";

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
  const authToken = localStorage.getItem("authToken");
  if (authToken && !authContext.isAuth) {
    authContext.setIsAuth(true);
  }
  return (
    <Dashboard>
      <div className="sidebar">
        <img className="image" src={profilePic} />
        <div className="detail">{"Snehil"}</div>
        <div className="detail">{"student"}</div>
        <div className="detail">{"snehil3@gmail.com"}</div>
        <div className="detail">{"+91 7903386743"}</div>

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
