require("dotenv").config();
import { logger } from "../api/constants";
import { DatabaseService } from "../api/shared/services/databaseService";

DatabaseService.getDatabaseServiceInstance()
  .initializeDatabase()
  .then((_) => {
    const deleteTestEntries = async () => {
      await DatabaseService.getMongoTestDatabase().dropDatabase();
      return;
    };

    deleteTestEntries()
      .then((_) => {
        logger.info("Test entries cleared");
      })
      .catch((_) => {
        process.exit(-1);
      })
      .finally(() => {
        process.exit();
      });
  });
