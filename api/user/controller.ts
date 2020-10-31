import { hash, compare } from "bcrypt";
import { errors, logger } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { signJwt } from "../shared/services/jwtService";
import { User } from "../shared/types/CustomTypes";

export const userSignup = async (data: User) => {
  try {
    let result = await DatabaseService.getMongoDatabase()
      .collection(data.role)
      .find({ $or: [{ email: data.email }, { mobile: data.mobile }] })
      .toArray();
    if (result.length !== 0) throw Error("User Exists");
    let hashedPassword = await hash(data.password, 14);
    data.password = hashedPassword;
    data.class = [];
    await DatabaseService.getMongoDatabase()
      .collection(data.role)
      .insertOne(data);
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    logger.error(error);
    if (error.message === "User Exists") throw errors.USER_SIGNUP_CONFLICT;
    throw errors.USER_SIGNUP_ERROR;
  }
};

export const userLogin = async (
  email: string,
  password: string,
  role: "student" | "teacher"
) => {
  try {
    let result = await DatabaseService.getMongoDatabase()
      .collection(role)
      .findOne({ email: email });
    if (result === null) throw Error("User not found");
    if ((await compare(password, result.password)) === false)
      throw Error("Wrong Credentials");
    return {
      success: true,
      token: await signJwt({
        user_number: result.user_number,
        role: result.role,
      }),
    };
  } catch (error) {
    logger.error(error);
    throw errors.USER_LOGIN_INVALID;
  }
};
