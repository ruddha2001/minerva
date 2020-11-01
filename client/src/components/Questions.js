import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import axios from "axios";
import { toast } from "react-toastify";
import QuestionCard from "./QuestionCard";

const List = styled.div``;

function Questions(props) {
  const authContext = useContext(AuthContext);

  const [classCode, setClassCode] = useState("t11111111111112");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const endpoint = "/api/v1/question?class=" + classCode;
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    console.log(authToken);

    axios
      .get(endpoint, { headers: { "x-auth-token": authToken } })
      .then((response) => {
        setQuestions(response.data.data);
        console.log(response.data.data);
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
    <List>
      {questions.map((question) => {
        return <QuestionCard question={question} />;
      })}
    </List>
  );
}

export default Questions;
