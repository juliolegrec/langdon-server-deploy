import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	defaultPassword: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
});

export default mongoose.model('User', userSchema);
