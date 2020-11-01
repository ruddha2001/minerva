import * as yup from "yup";
import { Request, Response, Router } from "express";
import { validateRequest } from "../shared/middlewares/inputDataValidation";
import { authGuard } from "../shared/middlewares/authValidation";
import { addClass, createClass, fetchClass } from "./controller";

let router = Router();

const queryClassSchema = yup.object({
  class: yup.string().required().trim(),
});

export const classRegisterHandler = () => {
  router.post("/create", authGuard, createClassHandler);

  router.post(
    "/add",
    authGuard,
    validateRequest("query", queryClassSchema),
    addClassHandler
  );

  router.get("/", authGuard, fetchClassHandler);

  return router;
};

export const createClassHandler = async (req: Request, res: Response) => {
  createClass(res.locals.user, req.query.name as string)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

export const addClassHandler = async (req: Request, res: Response) => {
  addClass(res.locals.user, req.query.class as string)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};

export const fetchClassHandler = async (req: Request, res: Response) => {
  fetchClass(res.locals.user)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
