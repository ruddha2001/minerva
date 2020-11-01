import { spawnSync } from "child_process";
import * as path from "path";
import { logger } from "../../constants";

export const getAnalytics = async (ch: string, classCode: string) => {
  const analytic = spawnSync("python3", [
    `${path.join(__dirname, "tag.py")}`,
    "-file",
    `${path.join(__dirname, classCode)}.csv`,
    "-op",
    `${ch}`,
  ]);
  if (analytic.error) {
    logger.error(analytic.error);
    logger.info(analytic.stderr);
  }
  return analytic.stdout;
};
