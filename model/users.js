import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  location: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

export const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      blood_group: {
        type: String,
        enum: {
          values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          message: "{VALUE} is not supported.",
        },
        required: true,
      },
      contact_number: {
        type: String,
        validate: {
          validator: function (v) {
            return /^[0]?[789]\d{9}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid mobile number`,
        },
        required: [true, "User phone number required,"],
      },
      country: {
        type: String,
      },
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
      password: {
        type: String,
        required: [true, "Password is required."],
      },
      address: {
        type: addressSchema,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { versionKey: false },
    { timestamp: true }
  )
);
