import { DatabaseService } from "../api/shared/services/databaseService";
import { healthcheckTestCases } from "./healthcheck.test";

Promise.resolve(
  DatabaseService.getDatabaseServiceInstance().initializeDatabase()
).then(() => {
  healthcheckTestCases();
});

// require("./test/healthcheck.test");
