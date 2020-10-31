import * as yup from "yup";
import { Request, Response, Router } from "express";
import { validateRequest } from "../shared/middlewares/inputDataValidation";
import { authGuard } from "../shared/middlewares/authValidation";
import { addQuestion, fetchQuestion, updateQuestion } from "./controller";

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

const questionUpdateSchema = yup.object({
  question_id: yup.string().required().trim(),
  property: yup.string().required().trim(),
  value: yup.mixed().required(),
});

export const questionRegisterHandler = () => {
  router.post(
    "/",
    authGuard,
    validateRequest("body", questionSchema),
    addQuestionHandler
  );

  router.put(
    "/",
    authGuard,
    validateRequest("body", questionUpdateSchema),
    updateQuestionHandler
  );

  router.get("/", authGuard, fetchQuestionHandler);
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

export const updateQuestionHandler = async (req: Request, res: Response) => {
  updateQuestion(req.body.property, req.body.value, req.body.question_id)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

export const fetchQuestionHandler = async (req: Request, res: Response) => {
  fetchQuestion(
    res.locals.user,
    req.query.class ? <string>req.query.class : null
  )
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
