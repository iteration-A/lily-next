import joi from "joi";

const loginSchema = joi.object({
  username: joi
    .string()
    .pattern(/^[a-z0-9_-]*[a-z][a-z0-9_-]*$/i)
    .min(4)
    .max(20)
    .required()
    .messages({
      "string.pattern.base": "Username is not valid",
      "string.min": "Username should be at least 4 characters long",
      "string.max": "Username should be at most 20 characters long",
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),
  password: joi.string().min(8).max(100).required().messages({
    "string.min": "Password should be at least 8 characters long",
    "string.max": "Password should be at most 100 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
	first_name: joi.string().min(1).max(100).required().messages({
    "string.min": "First name should be at least 1 characters long",
    "string.max": "First name should be at most 100 characters long",
    "string.empty": "First name is required",
    "any.required": "First name is required",
	}),
	last_name: joi.string().min(1).max(100).required().messages({
    "string.min": "Last name should be at least 1 characters long",
    "string.max": "Last name should be at most 100 characters long",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
	}),
});

export default loginSchema;
