const { check } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const registerValidator = [
  // FIRSTNAME VALIDATIONS
  check("firstname", "Invalid format in 'firstname' field.")
  .exists()
      .withMessage("This form must have 'firstname'")
  .notEmpty()
      .withMessage("This field cannot be empty.")
  .isString()
      .withMessage("You must be write a string in this field.")
  .isLength({ min: 2, max:50 })
      .withMessage("Length must be between 2 and 50 characters.")
  .matches(/^[a-zA-Z\s]/)
      .withMessage("This field should be letters only."),
  
  // LASTNAME VALIDATIONS
  check("lastname", "Invalid format in 'lastname' field.")
  .exists()
      .withMessage("This form must have 'lastname'")
  .notEmpty()
      .withMessage("This field cannot be empty.")
  .isString()
      .withMessage("You must be write a string in this field.")
  .isLength({ min: 2, max:50 })
      .withMessage("Length must be between 2 and 50 characters.")
  .matches(/^[a-zA-Z\s]/)
      .withMessage("This field should be letters only."),

  // EMAIL VALIDATIONS
  check("email", "Invalid format in 'email' field.")
  .exists()
      .withMessage("This form must have 'email'")
  .notEmpty()
      .withMessage("This field cannot be empty.")
  .isString()
      .withMessage("You must be write a string in this field.")
  .isEmail()
      .withMessage("This format is invalid")
  .isLength({ min: 7, max:50 })
      .withMessage("Length must be between 2 and 50 characters.")
  .matches(/^[a-zA-Z\s]/)
      .withMessage("This field should be letters only."),
  
  // PASSWORD VALIDATIONS
  check("password", "Invalid format in 'password' field.")
  .exists()
      .withMessage("This form must have 'password'")
  .notEmpty()
      .withMessage("This field cannot be empty.")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/)
      .withMessage("The password must contain min 8 characters, uppercase, lowercase and a symbol."),

  validateResult,
];

const loginValidator = [

   // EMAIL VALIDATIONS
   check("email", "Invalid format in 'email' field.")
   .exists()
      .withMessage("This email is incorrect. Please try again.")
   .notEmpty()
      .withMessage("This field cannot be empty.")
   .isString()
      .withMessage("You must be write a string in this field.")
   .isEmail()
      .withMessage("This format is invalid"),
   
   // PASSWORD VALIDATIONS
   check("password", "Invalid format in 'password' field.")
   .exists()
      .withMessage("This password is incorrect. Please try again.")
   .notEmpty()
      .withMessage("This field cannot be empty.")
   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/)
       .withMessage("The password must contain min 8 characters, uppercase, lowercase and a symbol."),

   validateResult,
]

module.exports = {
  registerValidator,
  loginValidator,
};

