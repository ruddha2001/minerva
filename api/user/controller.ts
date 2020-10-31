import { errors, logger } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { User } from "../shared/types/UserType";

export const userSignup = async (data: User, role: "student" | "teacher") => {
  try {
    await DatabaseService.getMongoDatabase().collection(role).insertOne(data);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    logger.error(error);
    throw errors.USER_SIGNUP_ERROR;
  }
};
