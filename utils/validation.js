import { isEmailValid } from "./service.js";
import CMS from "./errors.js";

export default function validation(type, body) {
  let errorMsg = "";
  switch (type) {
    case "CHANGE_PASSWORD":
      if (Object.keys(body).length == 0) {
        errorMsg = `${CMS.CHANGE_PWD_FIELDS}`;
      } else if (!body.email || body.email == "") {
        errorMsg = `email ${CMS.REQUIRED_BLANK}`;
      } else if (body.email !== "" && !isEmailValid(body.email)) {
        errorMsg = `${EMAIL_VALID}`;
      } else if (!body.otp || body.otp == "") {
        errorMsg = `otp ${CMS.REQUIRED_BLANK}`;
      } else if (!body.newpwd || body.newpwd == "") {
        errorMsg = `newpwd ${CMS.REQUIRED_BLANK}`;
      } else if (!body.cnfpwd || body.cnfpwd == "") {
        errorMsg = `cnfpwd ${CMS.REQUIRED_BLANK}`;
      } else if (body.newpwd !== body.cnfpwd) {
        errorMsg = `${CMS.PWD_CNFM}`;
      }
      return errorMsg;
    case "LOGIN":
      if (Object.keys(body).length == 0) {
        errorMsg = `${CMS.LOGIN_FIELDS}`;
      } else if (!body.email || body.email == "") {
        errorMsg = `email ${CMS.REQUIRED_BLANK}`;
      } else if (body.email !== "" && !isEmailValid(body.email)) {
        errorMsg = `${CMS.EMAIL_VALID}`;
      } else if (!body.password || body.password == "") {
        errorMsg = `password ${CMS.REQUIRED_BLANK}`;
      }
      return errorMsg;
    case "SIGNUP":
      if (Object.keys(body).length == 0) {
        errorMsg = `${SIGNUP_FIELDS}`;
      } else if (!body.name || body.name == "") {
        errorMsg = `name ${CMS.REQUIRED_BLANK}`;
      } else if (!body.blood_group || body.blood_group == "") {
        errorMsg = `blood_group ${CMS.REQUIRED_BLANK}`;
      } else if (!body.contact_number || body.contact_number == "") {
        errorMsg = `contact_number ${CMS.REQUIRED_BLANK}`;
      } else if (!body.email || body.email == "") {
        errorMsg = `email ${CMS.REQUIRED_BLANK}`;
      } else if (body.email !== "" && !isEmailValid(body.email)) {
        errorMsg = `${CMS.EMAIL_VALID}`;
      } else if (!body.password || body.password == "") {
        errorMsg = `password ${CMS.REQUIRED_BLANK}`;
      } else if (!body.confpwd || body.confpwd == "") {
        errorMsg = `confpwd ${CMS.REQUIRED_BLANK}`;
      } else if (body.password !== body.confpwd) {
        errorMsg = `${CMS.PWD_CNFM}`;
      }
    case "FORGOT_PASSWORD":
      if (!body.email || body.email == "") {
        errorMsg = `email ${CMS.REQUIRED_BLANK}`;
      } else if (body.email !== "" && !isEmailValid(body.email)) {
        errorMsg = `${CMS.EMAIL_VALID}`;
      }
      return errorMsg;
    default:
      break;
  }
}
