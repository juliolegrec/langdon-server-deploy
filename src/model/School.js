import mongoose, { Schema } from 'mongoose';

const schoolSchema = new Schema({
	logo: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	streetAddress: {
		type: String,
		required: true,
	},
	telephoneNumber: {
		type: String,
		required: true,
	},
	emailAddress: {
		type: String,
	},
	website: {
		type: String,
	},
	markingSystem: {
		type: String,
		required: true,
	},
});

export default mongoose.model('School', schoolSchema);
