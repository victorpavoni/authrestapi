import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
		unique: true,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const UserSchema = mongoose.model('User', userSchema);
export default UserSchema;
