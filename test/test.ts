import { DatabaseService } from "../api/shared/services/databaseService";
import { healthcheckTestCases } from "./healthcheck.test";
import { questionTestCases } from "./question.test";
import { userTestCases } from "./user.test";

Promise.resolve(
  DatabaseService.getDatabaseServiceInstance().initializeDatabase()
).then(() => {
  healthcheckTestCases();
  userTestCases();
  questionTestCases();
});
