import * as yup from "yup";
import { Request, Response, Router } from "express";
import { validateRequest } from "../shared/middlewares/inputDataValidation";
import { authGuard } from "../shared/middlewares/authValidation";
import { addComment } from "./controller";
import { logger } from "../constants";

let router = Router();

const queryCommentSchema = yup.object({
  id: yup.string().required().trim(),
});
const commentSchema = yup.object({
  body: yup.string().required().trim(),
  choice: yup.boolean().notRequired(),
});

export const commentRegisterHandler = () => {
  router.post(
    "/",
    authGuard,
    validateRequest("query", queryCommentSchema),
    validateRequest("body", commentSchema),
    addCommentHandler
  );
  return router;
};

export const addCommentHandler = async (req: Request, res: Response) => {
  addComment(req.query.id as string, req.body, res.locals.user)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
