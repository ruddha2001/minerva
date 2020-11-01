import { nanoid } from "nanoid";
import { logger, errors } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { User } from "../shared/types/CustomTypes";

export const createClass = async (user: User) => {
  try {
    let classCode = nanoid(15);
    let data = await DatabaseService.getMongoDatabase()
      .collection("teacher")
      .findOne({ email: user.email });
    data.class.push(classCode);
    await DatabaseService.getMongoDatabase()
      .collection("teacher")
      .replaceOne({ email: user.email }, data);
    return {
      success: true,
      data: classCode,
    };
  } catch (error) {
    logger.error(error);
    throw errors.CLASS_ERROR;
  }
};

export const addClass = async (user: User, classCode: string) => {
  try {
    let data = await DatabaseService.getMongoDatabase()
      .collection("student")
      .findOne({ email: user.email });
    data.class.push(classCode);
    await DatabaseService.getMongoDatabase()
      .collection("student")
      .replaceOne({ email: user.email }, data);
    return {
      success: true,
      message: "Class added successfully",
    };
  } catch (error) {
    logger.error(error);
    throw errors.CLASS_ERROR;
  }
};

export const fetchClass = async (user: User, classCode: string) => {
  try {
    let data = await DatabaseService.getMongoDatabase()
      .collection("student")
      .findOne({ email: user.email });
    data.class.push(classCode);
    await DatabaseService.getMongoDatabase()
      .collection("student")
      .replaceOne({ email: user.email }, data);
    return {
      success: true,
      message: "Class added successfully",
    };
  } catch (error) {
    logger.error(error);
    throw errors.CLASS_ERROR;
  }
};
