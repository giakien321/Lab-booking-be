import User from "../models/userModel.js";

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.status(200).json(user);
};
