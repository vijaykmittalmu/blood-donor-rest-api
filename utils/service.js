import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import nodemailer from "nodemailer";

export const generateHashPassword = async function (password) {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashPassword = await bcrypt.hashSync(password, salt);
  return hashPassword;
};

export const compareHashPassword = async function (password, hash) {
  return await bcrypt.compareSync(password, hash);
};

export const generateJwtToken = async function (user) {
  return await jwt.sign(
    { _id: user._id, email: user.password, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey"),
    {
      expiresIn: 600,
    }
  );
};

export const verifyJwtToken = async function (token) {
  return await jwt.verify(token, config.get("jwtPrivateKey"));
};

// ToDo:
export const decodeJwtToken = function (token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(Buffer.from(base64, "base64"));
};

export const isEmailValid = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

export const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const mailer = async function (user, code) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.NODEMAIL_USERNAME,
      pass: process.env.NODEMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAIL_USERNAME, // sender address
    to: user.email, // list of receivers
    subject: "One time password", // Subject line
    html: `Hi <b>${user.name}</b>, Please use <b>${code}</b> OTP to change your password.`, // html body
  };

  return await transporter.sendMail(mailOptions);
};
