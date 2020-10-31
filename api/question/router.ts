import * as yup from "yup";
import { Request, Response, Router } from "express";
import { validateRequest } from "../shared/middlewares/inputDataValidation";

let router = Router();

const userSignUpSchema = yup.object({
  name: yup.string().required().trim(),
  email: yup.string().email().required().trim(),
  mobile: yup.string().length(10).required(),
  user_number: yup.string().required().trim(),
  class: yup.string().required().trim(),
  password: yup.string().required().trim(),
  role: yup
    .string()
    .matches(/(student|teacher)/)
    .required(),
});

const userLoginSchema = yup.object({
  email: yup.string().email().required().trim(),
  password: yup.string().required().trim(),
  role: yup
    .string()
    .matches(/(student|teacher)/)
    .required(),
});

export const userRegisterHandler = () => {
  return router;
};
