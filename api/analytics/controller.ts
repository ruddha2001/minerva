import { errors, logger } from "../constants";
import { getAnalytics } from "../shared/services/analyticsService";

export const runAnalytics = async (ch: string, code: string) => {
  try {
    let data = await getAnalytics(ch, code);
    let parsedJson = JSON.parse(data.toString());
    let keysArray = Object.keys(parsedJson);
    let subKeysArray = Object.keys(parsedJson[keysArray[0]]);

    let keyMap = new Map<any, any>();
    subKeysArray.forEach((value: any) => {
      keyMap.set(
        parsedJson[keysArray[0]][value],
        parsedJson[keysArray[1]][value]
      );
    });

    keyMap[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    };

    return { success: true, data: Object.fromEntries(keyMap) };
  } catch (error) {
    logger.error(error);
    throw errors.ANALYTIC_ERROR;
  }
};
