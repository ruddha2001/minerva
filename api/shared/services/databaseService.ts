import { MongoClient, Db } from "mongodb";
import { logger, errors } from "../../constants";

export class DatabaseService {
  private static instance: DatabaseService;
  private client: MongoClient = new MongoClient(process.env.MONGODB_URI!, {
    useUnifiedTopology: true,
  });

  private constructor() {}

  initializeDatabase = async () => {
    this.client.connect((err) => {
      if (err) {
        logger.error(err);
        throw errors.MONGODB_CONNECT_ERROR;
      }
    });
  };

  static getDatabaseServiceInstance = (): DatabaseService => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  };

  static getMongoDatabase = (): Db => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance.client.db("minerva");
  };

  static getMongoTestDatabase = (): Db => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance.client.db("minerva-test");
  };
}
