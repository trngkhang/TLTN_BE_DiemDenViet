import { body, param, query, validationResult } from "express-validator";
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

export const validateId = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id must not be empty")
    .bail()
    .isString()
    .withMessage("Id must be a string")
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage("Id must be 24 characters long")
    .bail()
    .bail()
    .matches(/^[a-f0-9]+$/)
    .withMessage("Invalid Id")
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

export const validatePostDestination = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 6, max: 100 })
    .withMessage("Name must be between 6 and 100 characters long")
    .bail()
    .matches(/^[\p{L}0-9 ]+$/u)
    .withMessage("Name must contain only letters and spaces")
    .bail(),

  body("image").optional().isString().withMessage("Image be a string").bail(),

  body("introduce")
    .not()
    .isEmpty()
    .withMessage("Introduce must not be empty")
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  body("description")
    .isString()
    .withMessage("Descriptionmust be a string")
    .bail(),

  body("address")
    .optional()
    .bail()
    .isString()
    .withMessage("Address be a string")
    .bail(),

  body("openingTime")
    .optional()
    .isString()
    .withMessage("Opening Time be a string")
    .bail(),

  body("ticketPrice")
    .optional()
    .isString()
    .withMessage("Ticket price be a string")
    .bail(),

  body("provinceId")
    .not()
    .isEmpty()
    .withMessage("Province id must not be empty")
    .bail()
    .isString()
    .withMessage("Province id must be a string")
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage("Province id must be 24 characters long")
    .bail()
    .matches(/^[a-f0-9]+$/)
    .withMessage("Invalid province id")
    .bail(),

  body("destinationTypeId")
    .not()
    .isEmpty()
    .withMessage("Destination type id must not be empty")
    .bail()
    .isString()
    .withMessage("Destination type id must be a string")
    .bail()
    .isLength({ min: 24, max: 24 })
    .withMessage("Destination type id must be 24 characters long")
    .bail()
    .matches(/^[a-f0-9]+$/)
    .withMessage("Invalid destination type id")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateReview = [
  body("rating")
    .not()
    .isEmpty()
    .withMessage("Rating must not be empty")
    .bail()
    .isNumeric()
    .withMessage("Rating must be number")
    .bail(),

  body("comment")
    .optional()
    .isString()
    .withMessage("Destination type id must be a string")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Comment must be less than 500 characters long")
    .bail(),

  body("userId")
    .not()
    .isEmpty()
    .withMessage("User id must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid user id")
    .bail(),

  body("destinationId")
    .not()
    .isEmpty()
    .withMessage("Destination id must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid destination id")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateDeleteReview = [
  body("userId")
    .not()
    .isEmpty()
    .withMessage("User id must not be empty")
    .bail()
    .isMongoId()
    .withMessage("Invalid user id")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errorHandler(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validatePutUser = [
  body("avatarr").optional().isURL().withMessage("Avatar must be url").bail(),

  body("name")
    .optional()
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
    .optional()
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
    .optional()
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
