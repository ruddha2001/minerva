import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import colors from "../assets/colors.json";
import axios from "axios";
import { toast } from "react-toastify";
import QuestionCard from "./QuestionCard";

const List = styled.div``;

const AddQuestion = styled.div`
  margin: 0.5rem 1rem;
  position: relative;
  overflow: hidden;

  border-radius: 0.5rem;
  border: 2px solid ${colors.green};
  box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.25),
    0 0.02125em 0.06125em rgba(0, 0, 0, 0.25);

  .questionInput {
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
`;

function Questions(props) {
  const authContext = useContext(AuthContext);

  const [classCode, setClassCode] = useState("t11111111111112");
  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    title: "",
    body: "",
    subtopic: "",
    unitName: "",
    unitNumber: "",
  });
  const role = JSON.parse(localStorage.getItem("role"));

  useEffect(() => {
    var endpoint = "/api/v1/question";

    const role = JSON.parse(localStorage.getItem("role"));

    endpoint += role === "student" ? "?class=" + classCode : "";
    const authToken = JSON.parse(localStorage.getItem("authToken"));

    axios
      .get(endpoint, { headers: { "x-auth-token": authToken } })
      .then((response) => {
        setQuestions(response.data.data);
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

  const handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    setForm((form) => {
      return { ...form, [name]: value };
    });
  };

  const handleSubmit = () => {
    if (
      form.body.length > 0 &&
      form.subtopic.length > 0 &&
      form.title.length > 0 &&
      form.unitName.length > 0 &&
      form.unitNumber.length > 0
    ) {
      // console.log(questionInput);
      const authToken = JSON.parse(localStorage.getItem("authToken"));

      axios
        .post(
          "/api/v1/question",
          {
            title: form.title,
            body: form.body,
            class_code: classCode,
            sub_topic: form.subtopic,
            unit_name: form.unitName,
            unit_number: form.unitNumber,
          },
          { headers: { "x-auth-token": authToken } }
        )
        .then(() => {
          var endpoint = "/api/v1/question";

          const role = JSON.parse(localStorage.getItem("role"));

          endpoint += role === "student" ? "?class=" + classCode : "";
          const authToken = JSON.parse(localStorage.getItem("authToken"));

          axios
            .get(endpoint, { headers: { "x-auth-token": authToken } })
            .then((response) => {
              setQuestions(response.data.data);
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
    <List>
      {role === "student" && (
        <AddQuestion>
          <div className="questionInput">
            <input
              placeholder="Ask a question (Description)"
              type="text"
              name="body"
              value={form.body}
              onChange={handleInputChange}
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
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
          />
          <input
            placeholder="Sub Topic"
            type="text"
            name="subtopic"
            value={form.subtopic}
            onChange={handleInputChange}
          />
          <input
            placeholder="Unit Name"
            type="text"
            name="unitName"
            value={form.unitName}
            onChange={handleInputChange}
          />
          <input
            placeholder="Unit Number"
            type="text"
            name="unitNumber"
            value={form.unitNumber}
            onChange={handleInputChange}
          />
        </AddQuestion>
      )}
      {questions.map((question) => {
        return <QuestionCard key={question.question_id} question={question} />;
      })}
    </List>
  );
}

export default Questions;
