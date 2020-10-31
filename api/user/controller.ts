import { errors, logger } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { User } from "../shared/types/UserType";

export const userSignup = async (data: User, role: "student" | "teacher") => {
  try {
    let result = await DatabaseService.getMongoDatabase()
      .collection(role)
      .find({ $or: [{ email: data.email }, { mobile: data.mobile }] })
      .toArray();
    if (result.length !== 0) throw "User Exists";
    await DatabaseService.getMongoDatabase().collection(role).insertOne(data);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    logger.error(error);
    if (error.message === "User Exists") throw errors.USER_SIGNUP_CONFLICT;
    throw errors.USER_SIGNUP_ERROR;
  }
};
