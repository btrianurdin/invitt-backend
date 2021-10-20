import { checkSchema } from "express-validator";
import Invitation from "../../models/Invitation";

const invitationUpdate = checkSchema({
  web_url: {
    in: ["body"],
    optional: true,
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
  status: {
    in: ["body"],
    optional: true,
    custom: {
      errorMessage: "status not valid",
      options: (value: string) => {
        const status = ["hide", "show"];
        if (status.includes(value)) return true;
        return false;
      }
    }
  }
});

export default invitationUpdate;