import { Request, Response, Router } from "express";
import { userSignup } from "./controller";

let router = Router();

export const userRegisterHandler = () => {
  router.post("/signup", userSignupHandler);

  return router;
};

const userSignupHandler = (req: Request, res: Response) => {
  const { role, ...data } = req.body;
  userSignup(data, role)
    .then((success) => {
      res.json(success);
    })
    .catch((error) => {
      res.status(error.code).json({ success: false, message: error.message });
    });
};
