import { body, param, validationResult } from "express-validator";
import { errorHandler } from "./errorHandler.js";

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
    .matches(/^[\p{L}0-9 ]+$/u)
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
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateSignin = [
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
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validatePostRegion = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail()
    .matches(/^[\p{L}0-9 ]+$/u)
    .withMessage("Name must contain only letters and spaces")
    .bail(),

  body("description")
    .not()
    .isEmpty()
    .withMessage("Descriptionmust not be empty")
    .bail()
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateGetRegionbyId = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id must not be empty")
    .bail()
    .isString()
    .withMessage("Id must be a string")
    .isLength({ min: 24, max: 24 })
    .withMessage("Name must be 24 characters long")
    .bail()
    .bail()
    .matches(/^[a-f0-9]+$/)
    .withMessage("Id must not contain spaces or special characters")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validatePostProvince = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage("Name must be between 6 and 50 characters long")
    .bail()
    .matches(/^[\p{L}0-9 ]+$/u)
    .withMessage("Name must contain only letters and spaces")
    .bail(),

  body("description")
    .not()
    .isEmpty()
    .withMessage("Descriptionmust not be empty")
    .bail()
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  body("regionId")
    .not()
    .isEmpty()
    .withMessage("regionId must not be empty")
    .bail()
    .isString()
    .withMessage("regionId must be a string")
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage("regionId must be 24 characters long")
    .bail()
    .matches(/^[a-f0-9]+$/)
    .withMessage("Invalid regionId")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];
