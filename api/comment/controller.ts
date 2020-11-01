import { nanoid } from "nanoid";
import { errors, logger } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { Comment, User } from "../shared/types/CustomTypes";

export const addComment = async (
  question_id: string,
  data: any,
  user: User
) => {
  let comment: Comment = {
    comment_id: nanoid(10),
    asked_by: user,
    body: data.body,
    teacher_choice: data.choice ? data.choice : false,
    timestamp: Date.now(),
  };
  try {
    let response = await DatabaseService.getMongoDatabase()
      .collection("question")
      .findOne({ question_id: question_id });
    response.comments.push(comment);
    await DatabaseService.getMongoDatabase()
      .collection("question")
      .replaceOne({ question_id: question_id }, response);
    return { success: true, message: "Comment added successfully" };
  } catch (error) {
    logger.error(error);
    throw errors.COMMENT_ADD_ERROR;
  }
};
