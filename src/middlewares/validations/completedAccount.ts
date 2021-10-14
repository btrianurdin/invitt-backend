import { checkSchema } from "express-validator";

const completedAccount = checkSchema({
  web_url: {
    in: ["body"],
    isSlug: {
      errorMessage: "slug is not valid",
    }
  },
  groom_fullname: {
    in: ["body"],
    isString: {
      errorMessage: "groom fullname is not valid",
    }
  },
  bride_fullname: {
    in: ["body"],
    isString: {
      errorMessage: "bride fullname is not valid",
    }
  },
  template: {
    in: ["body"],
    isString: {
      errorMessage: "template is not found"
    }
  }
});

export default completedAccount;