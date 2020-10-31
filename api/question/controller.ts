import { nanoid } from "nanoid";
import { errors, logger } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { Question } from "../shared/types/CustomTypes";

export const addQuestion = async (user: any, data: any) => {
  let question: Question = {
    question_id: nanoid(10),
    asked_by: user,
    answered: false,
    body: data.body,
    title: data.title,
    timestamp: Date.now(),
    class_code: data.class_code,
    comments: [],
    details: {
      sub_topic: data.sub_topic,
      unit_name: data.unit_name,
      unit_number: data.unit_number,
    },
    downvotes: 0,
    upvotes: 0,
    tags: data.tags || [],
    teacher_choice: false,
  };
  try {
    await DatabaseService.getMongoDatabase()
      .collection("question")
      .insertOne(question);
    return { success: true, message: "Question added successfully" };
  } catch (error) {
    logger.error(error);
    throw errors.QUESTION_ADD_ERROR;
  }
};
