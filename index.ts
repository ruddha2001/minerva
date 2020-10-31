require("dotenv").config();
import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { DatabaseService } from "./api/shared/services/databaseService";
import { logger, routeVariables } from "./api/constants";
import { healthcheckRegisterHandler } from "./api/healthcheck/router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(cors());
app.use(morgan("dev"));

app.use(
  `${routeVariables.API_VERSION}${routeVariables.ENDPOINTS.HEALTHCHECK}`,
  healthcheckRegisterHandler()
);

logger.info("Connecting to MongoDB...");
DatabaseService.getDatabaseServiceInstance()
  .initializeDatabase()
  .then((_) => {
    logger.info("Connected to MongoDB");
    logger.info("Starting server...");
    http.createServer(app).listen(process.env.PORT || 7700, () => {
      logger.info(`Server started on Port ${process.env.PORT || 7700}`);
    });
  });
