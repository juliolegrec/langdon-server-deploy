import mongoose, { Schema } from 'mongoose';

const staffSchema = new Schema({
	staffID: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	streetAddress: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	zipCode: {
		type: String,
		required: true,
	},
	telephoneNumber: {
		type: String,
		required: true,
	},
	emailAddress: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
	},
});

export default mongoose.model('Staff', staffSchema);
