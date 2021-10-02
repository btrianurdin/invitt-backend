import { Request } from "express";
import { ValidationError, validationResult } from "express-validator";

export const validationErrorFormatter = (
  { msg, param }: ValidationError
  ) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `[${param}]: ${msg}`;
};

export const checkValidation = (req: Request) => {
  const errors = validationResult(req).formatWith(validationErrorFormatter);

  return errors.isEmpty() ? false : errors.array();
}