import * as yup from "yup";
import { Request, Response, Router } from "express";
import { validateRequest } from "../shared/middlewares/inputDataValidation";
import { userLogin, userSignup } from "./controller";

let router = Router();

const userSignUpSchema = yup.object({
  name: yup.string().required().trim(),
  email: yup.string().email().required().trim(),
  mobile: yup.string().length(10).required(),
  user_number: yup.string().required().trim(),
  class: yup.array().required(),
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
  router.post(
    "/signup",
    validateRequest("body", userSignUpSchema),
    userSignupHandler
  );

  router.post(
    "/login",
    validateRequest("body", userLoginSchema),
    userLoginHandler
  );

  return router;
};

const userSignupHandler = (req: Request, res: Response) => {
  userSignup(req.body)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

const userLoginHandler = (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  userLogin(email, password, role)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
