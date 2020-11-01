import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { string } from "yup";
import { errors, logger } from "../constants";
import { DatabaseService } from "../shared/services/databaseService";
import { jsonToCsv } from "../shared/services/jsonConversionService";
import { Question, User } from "../shared/types/CustomTypes";

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
    let csvFormattedData = {
      question_id: question.question_id,
      class_code: question.class_code,
      unit_number: question.details.unit_number,
      downvotes: question.downvotes,
      upvotes: question.upvotes,
      answered: question.answered,
    };
    jsonToCsv(csvFormattedData, question.class_code);
    return { success: true, message: "Question added successfully" };
  } catch (error) {
    logger.error(error);
    throw errors.QUESTION_ADD_ERROR;
  }
};

export const updateQuestion = async (
  property: string,
  value: any,
  question_id: string
) => {
  try {
    let setMap = new Map<string, any>();
    setMap.set(property, value);
    await DatabaseService.getMongoDatabase()
      .collection("question")
      .updateOne(
        { question_id: question_id },
        { $set: Object.fromEntries(setMap) }
      );
    let question = await DatabaseService.getMongoDatabase()
      .collection("question")
      .findOne({ question_id: question_id });
    let csvFormattedData = {
      question_id: question.question_id,
      class_code: question.class_code,
      unit_number: question.details.unit_number,
      downvotes: question.downvotes,
      upvotes: question.upvotes,
      answered: question.answered,
    };
    jsonToCsv(csvFormattedData, question.class_code);
    return { success: true, message: "Question updated successfully" };
  } catch (error) {
    logger.error(error);
    throw errors.QUESTION_UPDATE_ERROR;
  }
};

export const fetchQuestion = async (
  user: User,
  classCode?: string | null,
  questionId?: string | null
) => {
  try {
    let data: any = "";
    if (classCode) {
      data = await DatabaseService.getMongoDatabase()
        .collection("question")
        .find({ class_code: classCode })
        .toArray();
    } else if (questionId) {
      data = await DatabaseService.getMongoDatabase()
        .collection("question")
        .findOne({ question_id: questionId });
    } else {
      let response = await DatabaseService.getMongoDatabase()
        .collection("teacher")
        .findOne({ email: user.email });
      let searchQuery: any[] = [];
      response.class.forEach((code: string) => {
        searchQuery.push({ class_code: code });
      });
      logger.info(user.email);
      data = await DatabaseService.getMongoDatabase()
        .collection("question")
        .find({ $or: searchQuery })
        .toArray();
    }
    //logger.info(data);
    return { success: true, data: data };
  } catch (error) {
    logger.error(error);
    throw errors.QUESTION_UPDATE_ERROR;
  }
};
