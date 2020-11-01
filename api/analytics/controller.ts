import { errors, logger } from "../constants";
import { getAnalytics } from "../shared/services/analyticsService";

export const runAnalytics = async (ch: string, code: string) => {
  try {
    let data = await getAnalytics(ch, code);
    let parsedJson = JSON.parse(data.toString());
    let keysArray = Object.keys(parsedJson);
    let subKeysArray = Object.keys(parsedJson[keysArray[0]]);

    let keyMap = new Map<string, any>();
    subKeysArray.forEach((value: any) => {
      keyMap.set(
        parsedJson[keysArray[0]][value],
        parsedJson[keysArray[1]][value]
      );
    });

    return { success: true, data: Object.fromEntries(keyMap) };
  } catch (error) {
    logger.error(error);
    throw errors.ANALYTIC_ERROR;
  }
};
