import { NextFunction, Response, Request } from "express";
import { DatabaseService } from "../services/databaseService";
import { verifyJwt } from "../services/jwtService";

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.get("x-api-token")!;
    let payload: any = await verifyJwt(token);
    res.locals.user = await DatabaseService.getMongoDatabase()
      .collection(payload.role!)
      .findOne({ user_name: payload.user_name });
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
