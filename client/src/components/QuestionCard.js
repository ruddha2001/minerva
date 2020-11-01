import React, { useContext, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import axios from "axios";
import { toast } from "react-toastify";

const Card = styled.div`
  margin: 0.5rem 1rem;
  position: relative;
  overflow: hidden;

  border-radius: 0.5rem;
  border: 2px solid ${colors.green};
  box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.25),
    0 0.02125em 0.06125em rgba(0, 0, 0, 0.25);

  section {
    display: flex;
    flex-direction: row;
    margin: 0.5rem 1rem;

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
  }
`;

const Comments = styled.div`
  background-color: ${colors.background};
  padding: 0.25rem 1rem 0.5rem 1rem;

  article {
    background-color: white;
    padding: 0.5rem 1rem;
    margin-top: 0.25rem;
    border-radius: 0.25rem;

    box-shadow: 0 0.025em 0.225em rgba(0, 0, 0, 0.25),
      0 0.00125em 0.01125em rgba(0, 0, 0, 0.25);
  }

  .correct {
    background-color: ${colors.green};
    color: white;
  }

  .commentInput {
    margin-top: 0.25rem;
    padding: 0;
    display: flex;
    flex-direction: row;

    input {
      flex: 1;
      padding-left: 0.5rem;
      border-radius: 0.25rem;
      padding-right: 0.5rem;
      border: none;
      background-color: white;
      box-shadow: 0 0.025em 0.225em rgba(0, 0, 0, 0.25),
        0 0.00125em 0.01125em rgba(0, 0, 0, 0.25);

      &:focus {
        outline: none;
      }
    }

    svg {
      width: 1.75rem;
      transform: rotate(90deg);
      margin-left: 0.5rem;
      color: ${colors.green};

      &:hover {
        filter: brightness(1.2);
      }
    }
  }

  .name {
    font-size: 10pt;
    text-align: right;
  }

  .comment {
    font-size: 12pt;
  }
`;

function QuestionCard(props) {
  const authContext = useContext(AuthContext);

  const [question, setQuestion] = useState(props.question);
  const [comment, setComment] = useState("");

  const handleInputChange = (evt) => {
    setComment((comment) => evt.target.value);
  };

  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (comment.length > 0) {
      var endpoint = "/api/v1/comment?id=" + question.question_id;
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const role = JSON.parse(localStorage.getItem("role"));

      if (role === "teacher") {
        endpoint += "&choice=true";
      }

      axios
        .post(
          endpoint,
          {
            body: comment,
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
              setComment("");
            });
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
            }
          }
        });
    }
  };

  return (
    <Card>
      <section>
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
                      });
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
      </section>
      <Comments>
        <div className="commentInput">
          <input
            placeholder="Add a comment.."
            type="text"
            name="comment"
            value={comment}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSubmit}
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
        {question.comments.map((comment) => (
          <article
            className={comment.teacher_choice ? "correct" : ""}
            onClick={() => {
              const role = JSON.parse(localStorage.getItem("role"));
              if (role === "teacher") {
                const endpoint = "/api/v1/question";
                const authToken = JSON.parse(localStorage.getItem("authToken"));
                console.log(authToken);

                question.comments.map((element) => {
                  if (element.comment_id === comment.comment_id) {
                    element.teacher_choice = !element.teacher_choice;
                  }
                  return element;
                });

                axios
                  .put(
                    endpoint,
                    {
                      property: "comments",
                      value: question.comments,
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
              }
            }}
          >
            <div className="comment">{comment.body}</div>
            <div className="name">{comment.asked_by.name}</div>
          </article>
        ))}
      </Comments>
    </Card>
  );
}

export default QuestionCard;
