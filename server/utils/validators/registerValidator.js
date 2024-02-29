import { check } from "express-validator";
import validator from "../../MiddleWare/validatorMiddleWare.js";

export const registerUserValidator = [
    check("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({min : 3})
        .withMessage("Name must be at least 3 characters")
        .isLength({max : 32})
        .withMessage("Name must be less than 32 characters"),
    check("email")
        .notEmpty()
        .withMessage("email required")
        .isEmail()
        .withMessage("please , enter a correct email address"),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({min : 8})
        .withMessage("Password must be at least 8 characters"),
        validator
]

export const loginValidator = [

    check("email")
        .notEmpty()
        .withMessage("email required")
        .isEmail()
        .withMessage("please , enter a correct email address"),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({min : 8})
        .withMessage("Password must be at least 8 characters"),
        validator
]
