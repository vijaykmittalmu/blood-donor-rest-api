import mongoose from "mongoose";

const OTP = mongoose.model(
  "OTP",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
          },
          message: (props) => `${props.value} is not a valid email address.`,
        },
      },
      otp: {
        type: String,
        required: true,
      },
      expireIn: {
        type: Number,
        required: true,
      },
    },
    { versionKey: false },
    { timestamp: true }
  ),
  "otp"
);

export default OTP;
