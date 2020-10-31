import * as yup from "yup";
import { Request, Response, Router } from "express";
import { validateRequest } from "../shared/middlewares/inputDataValidation";
import { authGuard } from "../shared/middlewares/authValidation";
import { addQuestion } from "./controller";

let router = Router();

const questionSchema = yup.object({
  title: yup.string().required().trim(),
  body: yup.string().required().trim(),
  class_code: yup.string().length(15).required(),
  sub_topic: yup.string().required().trim(),
  unit_name: yup.string().required().trim(),
  unit_number: yup.string().required().trim(),
  tags: yup.array().notRequired(),
});

export const questionRegisterHandler = () => {
  router.post(
    "/add",
    authGuard,
    validateRequest("body", questionSchema),
    addQuestionHandler
  );
  return router;
};

export const addQuestionHandler = async (req: Request, res: Response) => {
  addQuestion(res.locals.user, req.body)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
