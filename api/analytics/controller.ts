import { errors, logger } from "../constants";
import { getAnalytics } from "../shared/services/analyticsService";

export const runAnalytics = async (ch: string, code: string) => {
  try {
    let data = await getAnalytics(ch, code);
    let parsedJson = JSON.parse(data.toString());
    return { success: true, data: JSON.parse(data.toString()) };
  } catch (error) {
    logger.error(error);
    throw errors.USER_LOGIN_INVALID;
  }
};
