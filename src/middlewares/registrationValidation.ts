import { checkSchema } from "express-validator";
import User from "../models/User";

const registrationValidation = checkSchema({
  fullname: {
    in: ["body"],
    isString: {
      errorMessage: "fullname is not valid",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "email is not valid"
    },
    custom: {
      errorMessage: "email is already registered",
      options: async (value: string) => {
        const countEmail = await User.countDocuments({email: value});
        if (countEmail > 0) return Promise.reject();
      }
    }
  },
  password: {
    in: ["body"],
    isLength: {
      errorMessage: "password must be more than 6",
      options: { min: 6 },
    },
  },
  gender: {
    in: ["body"],
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
    custom: {
      errorMessage: "phone number is not valid",
      options: (value: string) => {
        if (value.match(/^08[0-9]{9,12}$/)) return true;
        return false;
      }
    }
  }
});

export default registrationValidation;