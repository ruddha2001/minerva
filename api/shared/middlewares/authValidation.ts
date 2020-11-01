import { NextFunction, Response, Request } from "express";
import { logger } from "../../constants";
import { DatabaseService } from "../services/databaseService";
import { verifyJwt } from "../services/jwtService";

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.get("x-auth-token")!;
    let payload: any = await verifyJwt(token);
    res.locals.user = await DatabaseService.getMongoDatabase()
      .collection(payload.role!)
      .findOne({ email: payload.email });
    if (res.locals.user === null) throw Error("Cannot find user");
    next();
  } catch (error) {
    logger.info(error);
    return res.status(400).json({ error: error.message });
  }
};
