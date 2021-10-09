import { checkSchema } from "express-validator";

const updateUser = checkSchema({
  fullname: {
    in: ["body"],
    optional: true,
    custom: {
      errorMessage: "fullname is not valid",
      options: (value: string) => {
        if (value.match(/(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/)) return true;
        return false
      }
    },
  },
  gender: {
    in: ["body"],
    optional: true,
    custom: {
      errorMessage: "gender is not valid",
      options: (value: string) => {
        const gender = ["man", "women", "none"];
        if (gender.includes(value)) return true;
        return false;
      }
    }
  },
  phoneNumber: {
    in: ["body"],
    optional: true,
    custom: {
      errorMessage: "phone number is not valid",
      options: (value: string) => {
        if (value.match(/^08[0-9]{9,12}$/)) return true;
        return false;
      }
    }
  },
  email: {
    in: ["body"],
    optional: true,
    custom: {
      options: (value: string, { req }) => {
        return req.body.email = "";
      }
    }
  }
});

export default updateUser;