import bunyan from "bunyan";

export const logger = bunyan.createLogger({
  name: "minerva",
});

export const routeVariables = {
  API_VERSION: "/api/v1",
  ENDPOINTS: {
    HEALTHCHECK: "/status",
    USER: "/user",
    QUESTION: "/question",
    ANALYTICS: "/analytic",
  },
};

export const errors = {
  MONGODB_CONNECT_ERROR: {
    code: 500,
    message: "Unable to connect to MongoDB",
  },
  USER_SIGNUP_ERROR: {
    code: 500,
    message: "Unable to sign up new user",
  },
  USER_SIGNUP_CONFLICT: {
    code: 409,
    message: "User already exists",
  },
  USER_LOGIN_INVALID: {
    code: 400,
    message: "Inavlid user credentials",
  },
  QUESTION_ADD_ERROR: {
    code: 500,
    message: "Could not add question",
  },
  QUESTION_UPDATE_ERROR: {
    code: 500,
    message: "Could not update question",
  },
  ANALYTIC_ERROR: {
    code: 500,
    message: "Cannot run analytics",
  },
};
