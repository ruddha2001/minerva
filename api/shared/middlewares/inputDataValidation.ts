import * as yup from "yup";
import { NextFunction, Response, Request } from "express";
import { logger } from "../../constants";

type RequestLocation = "query" | "body" | "params";

export const validateRequest = (
  location: RequestLocation,
  schema: yup.ObjectSchema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let _location: any;
    switch (location) {
      case "query":
        _location = req.query;
        break;
      case "body":
        _location = req.body;
        break;
      case "params":
        _location = req.params;
        break;
    }
    try {
      await schema.validate(_location);
      next();
    } catch (error) {
      const message = error.errors[0];
      logger.error(message);
      return res.status(400).json({ error: message });
    }
  };
};
