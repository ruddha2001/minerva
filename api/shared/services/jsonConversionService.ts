import { parseAsync } from "json2csv";
import * as path from "path";
import { readFile, writeFile } from "fs";
import { logger } from "../../constants";

export const jsonToCsv = (data: any, classCode: string) => {
  readFile(path.join(__dirname, `${classCode}.json`), {}, function (
    err,
    buffer
  ) {
    let jsonFinal: any = [];
    if (err) {
      logger.error(err);
    } else {
      let jsonString = buffer.toString();
      jsonFinal = JSON.parse(jsonString);
    }
    jsonFinal.push(data);
    writeFile(
      path.join(__dirname, `${classCode}.json`),
      JSON.stringify(jsonFinal),
      function (err) {
        if (err) {
          return logger.error(err);
        }
        parseAsync(jsonFinal, {})
          .then((csv) => {
            writeFile(path.join(__dirname, `${classCode}.csv`), csv, function (
              err
            ) {
              if (err) {
                return logger.error(err);
              }
              logger.info(`${classCode}.csv is generated`);
            });
          })
          .catch((error) => {
            logger.error(error);
          });
      }
    );
  });
};
