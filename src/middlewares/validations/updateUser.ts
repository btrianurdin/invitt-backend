import { checkSchema } from "express-validator";

const updateUser = checkSchema({
  fullname: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "fullname is not valid",
    },
  },
  gender: {
    in: ["body"],
    optional: true,
    custom: {
      errorMessage: "gender is not valid",
      options: (value: string) => {
        const gender = ["man", "woman", "none"];
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
});

export default updateUser;