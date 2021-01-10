import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user.js';

dotenv.config();

export const usersList = async (req, res) => {
  let data = await userModel.find();

  res.json({data, user: req.loggedUser});
};

export const usersCreate = async (req, res) => {
  let { name, email, password } = req.body;

  password = await bcrypt.hash(password, 10);

  let accessToken = jwt.sign({ name, email, password }, process.env.API_ACCESS_TOKEN);

  let userSchema = new userModel({ name, email, password, accessToken });
  userSchema.save();

	res.json({ name, email, password, accessToken });
  res.status(201)

};