import React from "react";
import styled from "styled-components";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import colors from "../assets/colors.json";
import logo from "../assets/minerva.svg";

const LoginContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 2fr 3fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Login = styled.div`
  background-color: ${colors.foreground};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: black;

  .logo-mobile {
    display: none;
    color: ${colors.text};

    @media (max-width: 768px) {
      display: block;
    }

    header {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 2rem;
      margin-bottom: 1rem;
      img {
        width: 4rem;
        margin-right: 0.2rem;
      }
    }
  }

  .container {
    /* background-color: ${colors.background}; */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-self: stretch;
    padding: 0.75rem;
    width: 100%;
    max-width: 400px;
    transition: all 0.5s linear;

    .message {
      margin-top: 1rem;
      padding: 0.5rem;
      color: #dc3545 !important;
      background-color: ${colors.background};
      border: 1px solid ${colors.textgrey};
      border-radius: 0.2rem;
    }
    .button {
      margin-top: 2rem;
      background-color: ${colors.green};
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      text-align: center;
      color: white;
      outline: none;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      cursor: pointer;

      &:disabled {
        filter: brightness(0.5);
      }
    }

    .label {
      margin: 1rem 0 0.5rem 0;
      color: ${colors.text};
      animation: slide-up 0.4s ease;
    }

    .radio {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-basis: 1.75rem;
      input {
        height: 1rem;
        width: 1rem;
      }
    }

    input {
      padding: 0.75rem 1rem;
      outline-style: none;
      border-radius: 0.5rem;
      background-color: ${colors.background};
      border: solid 1px ${colors.textgrey};
      color: ${colors.text};
      animation: slide-up 0.4s ease;
    }

    .text-danger {
      color: #dc3545 !important;
      margin-left: 0.5rem;
      margin-top: 0.2rem;
      font-size: 0.9rem;
      animation: slide-up 0.4s ease;
    }

    .name {
      display: ${(props) => (props.signup ? "block" : "none")};
    }

    @keyframes slide-up {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes rotate {
      0% {
        opacity: 0;
        transform: rotate(3deg);
      }
      33% {
        opacity: 0.7;
        transform: rotate(-2deg);
      }

      66% {
        opacity: 1;
        transform: rotate(1deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  }

  .signup-message {
    color: ${colors.text};
    cursor: default;

    span {
      color: ${colors.green};
      font-weight: bold;
      cursor: pointer;

      &:hover {
        filter: brightness(1.2);
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
`;

const Landing = styled.div`
  background-color: ${colors.background};
  display: grid;
  place-items: center;
  color: ${colors.text};
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Note = styled.div`
  background-color: ${colors.foreground};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem 2rem;
  position: relative;
  border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 1.75rem 1.75rem 0;
    border-style: solid;
    border-color: ${colors.green} ${colors.background};
    display: block;
    width: 0;
    -moz-border-radius: 0 0 0 0.5rem;
    border-radius: 0 0 0 0.5rem;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3),
      -1px 1px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3),
      -1px 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .title {
    font-weight: bold;
    color: ${colors.textgrey};
    font-size: 2rem;
    text-align: left;
    margin-bottom: 2rem;
  }

  .logo {
    width: 8rem;
    align-self: center;
    margin-bottom: 2rem;
  }

  .note {
    margin-bottom: 3rem;
  }
`;

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      processing: false,
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "student",
      message: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleRoleChange = (evt) => {
    evt.stopPropagation();
    this.setState({
      role: evt.target.value,
    });
  };

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    // ? TO BE CHANGED
    this.setState({ message: "" });
    if (
      this.validator.fieldValid("email") &&
      this.validator.fieldValid("password") &&
      (!this.state.signup || this.validator.fieldValid("name")) &&
      (!this.state.signup || this.validator.fieldValid("mobile"))
    ) {
      this.setState({ processing: true });

      const endpoint =
        "/api/v1/user/" + (this.state.signup ? "signup" : "login");

      axios
        .post(endpoint, {
          name: this.state.name,
          email: this.state.email,
          mobile: this.state.mobile,
          password: this.state.password,
          role: this.state.role,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            if (this.state.signup) {
              toast.success("🚀 Registered successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              this.setState({ processing: false });
            } else {
              localStorage.setItem(
                "authToken",
                JSON.stringify(response.data.token)
              );
              localStorage.setItem(
                "role",
                JSON.stringify(JSON.parse(response.config.data).role)
              );
            }
          }
        })
        .catch((error) => {
          this.setState({ message: error.response.data.message });
          this.setState({ processing: false });
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  render() {
    return (
      <LoginContainer>
        <Login signup={this.state.signup}>
          <div className="logo-mobile">
            <header>
              <img className="logo" src={logo} />
              {/* Minerva */}
            </header>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing el</div>
          </div>
          <div className="container">
            <div className="label name">Name</div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              className="name"
            />
            {this.validator.message("name", this.state.name, "required", {
              className: "text-danger name",
            })}

            <div className="label">Email</div>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            {this.validator.message(
              "email",
              this.state.email,
              "required|email",
              { className: "text-danger" }
            )}

            <div className="label name">Mobile</div>
            <input
              type="tel"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleInputChange}
              className="name"
            />
            {this.validator.message(
              "mobile",
              this.state.mobile,
              "required|min:10",
              {
                className: "text-danger name",
              }
            )}

            <div className="label">Password</div>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
            />
            {this.validator.message(
              "password",
              this.state.password,
              "required|min:6",
              { className: "text-danger" }
            )}

            <div className="label">Role</div>
            <div className="radio">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={this.state.role === "student"}
                onChange={this.handleRoleChange}
              />
              <div className="label">Student</div>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="teacher"
                name="role"
                value="teacher"
                checked={this.state.role === "teacher"}
                onChange={this.handleRoleChange}
              />
              <div className="label">Teacher</div>
            </div>

            <button
              className="button"
              onClick={this.handleSubmit}
              disabled={this.state.processing}
            >
              {this.state.processing
                ? "Please wait..."
                : this.state.signup
                ? "Sign Up"
                : "Login"}
            </button>
            {this.state.message && (
              <div className="message">{this.state.message}</div>
            )}
          </div>
          <div className="signup-message">
            {this.state.signup
              ? "Already have an account? "
              : "Don't have an account yet? "}
            <span
              onClick={() =>
                this.setState({
                  signup: !this.state.signup,
                  name: "",
                  mobile: "",
                })
              }
            >
              {this.state.signup ? "Login" : "Sign Up"}
            </span>
          </div>
        </Login>
        <Landing>
          <div></div>
          <Note>
            <div className="title">Minerva</div>
            <img className="logo" src={logo} />
            <div className="note">
              Lorem ipsum dolor sit amet, consectetur adipiscing el
            </div>
          </Note>
          <div></div>
        </Landing>
        <ToastContainer />
      </LoginContainer>
    );
  }
}
