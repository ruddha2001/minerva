import { exec as execution } from "child_process";
import * as path from "path";
import { promisify } from "util";

const exec = promisify(execution);

export const getAnalytics = async (ch: string, classCode: string) => {
  try {
    const { stdout, stderr } = await exec(
      `python tag.py --file ${path.join(__dirname, classCode)}.csv --op ${ch}`
    );
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (error) {}
};
