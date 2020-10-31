require("dotenv").config();
import chai from "chai";
import { userSignup } from "../api/user/controller";

const expect = chai.expect;

export const userTestCases = () => {
  describe("User Signup Check ", function () {
    it("Valid User details to register", async () => {
      let response = await userSignup(
        {
          user_number: "1002010",
          name: "Dummy User",
          class: ["One"],
          email: "mail@example.com",
          mobile: "1548785471",
        },
        "student"
      );

      expect(response.success).to.be.true;
    });
  });
};
