import bunyan from "bunyan";

export const logger = bunyan.createLogger({
  name: "minerva",
});

export const routeVariables = {
  API_VERSION: "/api/v1",
  ENDPOINTS: {
    HEALTHCHECK: "/status",
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
};
