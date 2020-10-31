import { Request, Response, Router } from "express";
import { serverHealth } from "./controller";
let router = Router();

export const healthcheckRegisterHandler = () => {
  router.get("/", healthcheckHandler);

  return router;
};

export const healthcheckHandler = (req: Request, res: Response) => {
  res.json(serverHealth());
};
