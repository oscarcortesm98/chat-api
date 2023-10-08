const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signAuthToken } = require("../../helpers/signToken");
require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    await User.create(newUser);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      throw {
        status: 400,
        error: "User is not registred.",
        message: "You need register before login",
      };
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw {
        status: 400,
        error: "Incorrect password",
        message: "The password is incorrect. Try again, please.",
      };
    }

    if (!user.validEmail) {
      throw {
        status: 401,
        error: "Email verification needed",
        message: "Look at your email for a verification link.",
      };
    }

    const copyUser = { ...user.dataValues };
    delete copyUser.password;

    const token = signAuthToken(copyUser);
    copyUser.token = token;
    res.json(copyUser);
  } catch (error) {
    next(error);
  }
};

const validateUserEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw {
        status: 400,
        message: "Token is required.",
      };
    }
    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
      algorithms: "HS512",
    });
    const user = await User.findOne({ where: { email } }); // es una isntancia de ese usuario
    if (user.validEmail) {
      throw {
        status: 400,
        message: "Email is already verified.",
      };
    }
    user.validEmail = true;
    user.save();
    res.json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const imageUrl = `${process.env.APP_URL}/avatar/${file.filename}`;
    await User.update(
      { avatar: imageUrl },
      {
        where: { id },
      }
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  validateUserEmail,
  getAllUsers,
  uploadAvatar,
};

// 1.- Enviar un correo electronico a la direccion que nos dieron (link)
// 2.- Presionar en el link para que nos confirme que si es real y es de esa persona

// que nuestro servicio / backend pueda mandar correos electronicos
// nodemailer npm
