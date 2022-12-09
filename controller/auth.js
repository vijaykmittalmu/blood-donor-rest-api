import { User } from "../model/users.js";
import OTP from "../model/otp.js";
import {
  generateHashPassword,
  compareHashPassword,
  generateJwtToken,
  generateOTP,
  mailer,
} from "../utils/service.js";
import validation from "../utils/validation.js";

const userLogin = async function (req, res) {
  try {
    const error = validation("LOGIN", req.body);
    if (error !== "") {
      return res.status(400).send({ message: error });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "Invalid email and password!",
      });
    }
    const isUserValid = await compareHashPassword(
      req.body.password,
      user.password
    );

    if (!isUserValid) {
      return res.status(400).send({
        status: 400,
        message: "Invalid email and password!",
      });
    }

    const jwtToken = await generateJwtToken(user);
    return res.send({
      message: "login successfully!",
      token: jwtToken,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const userSignup = async function (req, res) {
  try {
    const error = validation("SIGNUP", req.body);
    if (error !== "") {
      return res.status(400).send({ message: error });
    }

    const userExist = await User.findOne({
      $or: [
        { email: req.body.email },
        { contact_number: req.body.contact_number },
      ],
    });

    if (userExist) {
      return res.status(400).send({
        status: 400,
        message:
          "User already exist. email and contact number should be different!",
      });
    }

    const encryptPwd = await generateHashPassword(req.body.password);
    const user = new User({
      name: req.body.name,
      blood_group: req.body.blood_group,
      contact_number: req.body.contact_number,
      password: encryptPwd,
      email: req.body.email,
    });

    const result = await user.save();
    const jwtToken = await generateJwtToken(result);
    res.status(200).send({
      status: 200,
      message: "New user successfully created.",
      token: jwtToken,
    });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const userForgotPassword = async function (req, res) {
  try {
    const error = validation("FORGOT_PASSWORD", req.body);
    if (error !== "") {
      return res.status(400).send({ message: error });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: `${req.body.email} is not available in our database.`,
      });
    }
    let code = generateOTP();
    let newEmailInOTP;
    const existEmailInOTP = await OTP.findOneAndUpdate(
      { email: user.email },
      {
        otp: await generateHashPassword(code),
        expireIn: new Date().getTime() + 300 * 1000,
      }
    );

    if (!existEmailInOTP) {
      newEmailInOTP = new OTP({
        email: user.email,
        otp: await generateHashPassword(code),
        expireIn: new Date().getTime() + 300 * 1000,
      });
      await newEmailInOTP.save();
    }
    const info = await mailer(user, code);
    if (info.messageId) {
      return res.status(200).send({
        status: 200,
        message: `Please check your mail, OTP has been send to your email id.`,
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const userChangePassword = async function (req, res) {
  try {
    const error = validation("CHANGE_PASSWORD", req.body);
    if (error !== "") {
      return res.status(400).send({ message: error });
    }

    const user = await OTP.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: `${req.body.email} is not available in our database.`,
      });
    }
    if (user.expireIn >= new Date().getTime()) {
      const isOTPValid = await compareHashPassword(req.body.otp, user.otp);
      if (!isOTPValid) {
        return res.status(400).send({
          status: 400,
          message: `invalid otp`,
        });
      }
      await User.findOneAndUpdate(
        { email: req.body.email },
        { password: await generateHashPassword(req.body.newpwd) }
      );
      return res.status(200).send({ message: "Password update successfully." });
    }
    return res.status(400).send({ message: "OTP has been expired!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const auth = {
  userLogin,
  userSignup,
  userForgotPassword,
  userChangePassword,
};
