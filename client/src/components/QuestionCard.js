import React, { useContext, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import axios from "axios";
import { toast } from "react-toastify";

const Card = styled.div`
  margin: 0.5rem 1rem;
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 0.5rem;
  border: 2px solid ${colors.green};
  padding: 0.5rem 1rem;
  box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.25),
    0 0.02125em 0.06125em rgba(0, 0, 0, 0.25);

  .main {
    flex: 1;
  }

  .title {
    font-size: 14pt;
  }
  .askedBy {
    font-size: 10pt;
    padding-left: 0.5rem;
    color: ${colors.textgrey};
  }

  .body {
    padding-left: 0.5rem;
    margin-top: 0.25rem;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .upvote,
    .downvote {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background-color: ${colors.background};
      }

      svg {
        height: 1.5rem;
      }

      .value {
        padding-right: 0.25rem;
      }
    }
  }
`;

function QuestionCard(props) {
  const authContext = useContext(AuthContext);

  const [question, setQuestion] = useState(props.question);
  console.log(props.question);

  return (
    <Card>
      <div className="main">
        <div className="title">{question.title}</div>
        <div className="askedBy">{question.asked_by.name}</div>
        <div className="body">{question.body}</div>
      </div>
      <div className="buttons">
        <div className="upvote">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              const endpoint = "/api/v1/question";
              const authToken = JSON.parse(localStorage.getItem("authToken"));
              console.log(authToken);

              axios
                .put(
                  endpoint,
                  {
                    property: "upvotes",
                    value: parseInt(question.upvotes) + 1,
                    question_id: question.question_id,
                  },
                  { headers: { "x-auth-token": authToken } }
                )
                .then(() => {
                  axios
                    .get("/api/v1/question?id=" + question.question_id, {
                      headers: { "x-auth-token": authToken },
                    })
                    .then((response) => {
                      setQuestion(response.data.data);
                      console.log(response.data.data);
                    });
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
            }}
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="value">{question.upvotes}</span>
        </div>
        <span className="downvote">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              const endpoint = "/api/v1/question";
              const authToken = JSON.parse(localStorage.getItem("authToken"));
              console.log(authToken);

              axios
                .put(
                  endpoint,
                  {
                    property: "downvotes",
                    value: parseInt(question.downvotes) + 1,
                    question_id: question.question_id,
                  },
                  { headers: { "x-auth-token": authToken } }
                )
                .then(() => {
                  axios
                    .get("/api/v1/question?id=" + question.question_id, {
                      headers: { "x-auth-token": authToken },
                    })
                    .then((response) => {
                      setQuestion(response.data.data);
                      console.log(response.data.data);
                    });
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
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="value">{question.downvotes}</span>
        </span>
      </div>
    </Card>
  );
}

export default QuestionCard;
