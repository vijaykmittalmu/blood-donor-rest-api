import { User } from "../model/users.js";

const allUsers = async function (req, res) {
  try {
    const result = await User.find().select("-password");
    res.status(200).send({ status: 200, data: result, length: result.length });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const specificUserDetails = async function (req, res) {
  try {
    const result = await User.findById({ _id: req.params.id }).select(
      "-password"
    );
    return res.status(200).send({ status: 200, data: result });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const updateSpecificUserDetails = async function (req, res) {
  try {
    const userUpdatedInfo = Object.assign({}, req.body);
    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      userUpdatedInfo
    ).select("-password");

    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "User information does not exist!",
      });
    }

    if (user) {
      return res.status(200).send({
        status: 400,
        message: "User information update successfully!",
      });
    }
  } catch (ex) {
    res.status(400).send({ status: 400, message: ex.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({
        status: 400,
        message: "User information does not exist!",
      });
    }

    await User.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: "user deleted!",
    });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

export const users = {
  allUsers,
  specificUserDetails,
  updateSpecificUserDetails,
  deleteUser,
};
