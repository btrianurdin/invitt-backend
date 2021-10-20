import { checkSchema } from "express-validator";
import Invitation from "../../models/Invitation";

const completedAccount = checkSchema({
  web_url: {
    in: ["body"],
    isSlug: {
      errorMessage: "slug is not valid",
    },
    custom: {
      errorMessage: "slug is not available",
      options: async (value: string) => {
        const countEmail = await Invitation.countDocuments({web_url: value});
        if (countEmail > 0) return Promise.reject();
      }
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