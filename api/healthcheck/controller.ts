import { logger } from "../constants";

export const serverHealth = () => {
  logger.info(`Server Uptime: ${process.uptime()}s`);
  return {
    status: "Running",
    uptime: `${process.uptime()}s`,
  };
};
