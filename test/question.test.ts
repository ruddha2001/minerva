require("dotenv").config();
import chai from "chai";
import { addQuestion } from "../api/question/controller";
import { DatabaseService } from "../api/shared/services/databaseService";
import { userLogin, userSignup } from "../api/user/controller";

const expect = chai.expect;

export const questionTestCases = () => {
  const expectThrowsAsync = async (
    method: Function,
    params: any[],
    message?: string
  ) => {
    let err = null;
    try {
      await method(...params);
    } catch (error) {
      err = error;
    }
    if (message) {
      expect(err.message).to.be.equal(message);
    } else if (err.code) {
      expect(err.code).to.be.not.equal(200);
    } else {
      expect(err).to.be.an("Error");
    }
  };

  describe("Question Check ", function () {
    it("Question addition", async () => {
      let response = await addQuestion(
        {
          user_number: "1002010",
          name: "Dummy User",
          class: ["One"],
          email: "mail@example.com",
          mobile: "1548785471",
          password: "hello123",
          role: "teacher",
        },
        {
          title: "Test - What is life?",
          body: "Random body",
          class_code: "111111111111111",
          sub_topic: "me",
          unit_name: "useless",
          unit_number: "5",
        }
      );

      expect(response.success).to.be.true;
    });

    it("Delete Test Question Data", async () => {
      let response = await DatabaseService.getMongoDatabase()
        .collection("question")
        .deleteOne({ title: "Test - What is life?" });

      expect(response.result.ok).to.be.equal(1);
    });
  });
};
