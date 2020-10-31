require("dotenv").config();
import chai from "chai";
import { DatabaseService } from "../api/shared/services/databaseService";
import { userLogin, userSignup } from "../api/user/controller";

const expect = chai.expect;

export const userTestCases = () => {
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

  describe("User Signup Check ", function () {
    it("Valid Student User details to register", async () => {
      let response = await userSignup(
        {
          user_number: "1002010",
          name: "Dummy User",
          class: ["One"],
          email: "mail@example.com",
          mobile: "1548785471",
          password: "hello123",
        },
        "student"
      );

      expect(response.success).to.be.true;
    });

    it("Duplicate Student User details to register", async () => {
      await expectThrowsAsync(userSignup, [
        {
          user_number: "1002010",
          name: "Dummy User",
          class: ["One"],
          email: "mail@example.com",
          mobile: "1548785471",
          password: "hello123",
        },
        "student",
      ]);
    });

    it("Valid Student User login", async () => {
      let response = await userLogin("mail@example.com", "hello123", "student");

      expect(response.success).to.be.true;
    });

    it("Wrong Student User Login", async () => {
      await expectThrowsAsync(userLogin, [
        "mail@example.com",
        "hello1234",
        "student",
      ]);
    });

    it("Delete Student User Test Data", async () => {
      let response = await DatabaseService.getMongoDatabase()
        .collection("student")
        .deleteOne({ name: "Dummy User" });

      expect(response.result.ok).to.be.equal(1);
    });
  });
};
