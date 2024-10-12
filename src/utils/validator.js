import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters long")
    .bail()
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Name must contain only letters and spaces")
    .bail(),

  body("username")
    .not()
    .isEmpty()
    .withMessage("Username must not be empty")
    .bail()
    .isString()
    .withMessage("Username must be a string")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Username must be between 6 and 30 characters long")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username must not contain spaces or special characters")
    .bail(),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Password must not be empty")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be at least 6 characters long")
    .bail()
    .matches(/^\S*$/)
    .withMessage("Password must not contain spaces")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
