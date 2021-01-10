import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import userModel from '../models/user.js';

dotenv.config();

export const authRegister = async (req, res) => {
	let { name, email, password } = req.body;

	password = await bcrypt.hash(password, 10);

	const accessToken = jwt.sign({email, password, name}, process.env.API_ACCESS_TOKEN);
	const userSchema = new userModel({ name, email, password, accessToken });
	userSchema.save();
	res.json({ accessToken });
};

export const authLogin = (req, res) => {
	let { email, password } = req.body;

	if(email != null) {
		if(password != null) {
			userModel.find({ email: email })
			.then(users => {
				users.map(user => {
					bcrypt.compare(password, user.password).then(equal => {
						const accessToken = jwt.sign(email, process.env.API_ACCESS_TOKEN);
						return equal ? res.json({ accessToken }) : res.json({ msg: "Invalid password" });
					});
				})
			})
			.catch(err => console.log(err));
		} else {
			res.json({ msg: "You need to put a password" });
		}
	} else {
		res.json({ msg: "You need to put an e-mail" });
	}
}