import * as yup from "yup";
import { Request, Response, Router } from "express";
import { runAnalytics } from "./controller";

let router = Router();

export const analyticRegisterHandler = () => {
  router.get("/", fetchAnalyticsHandler);

  return router;
};

const fetchAnalyticsHandler = (req: Request, res: Response) => {
  runAnalytics(req.query.op as string, req.query.code as string)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
