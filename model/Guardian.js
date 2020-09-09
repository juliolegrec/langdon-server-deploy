import mongoose, { Schema } from 'mongoose';

const guardianSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	relationship: {
		type: String,
		required: true,
	},
	mobilePhone: {
		type: String,
		required: true,
	},
	workPhone: {
		type: String,
		required: true,
	},
	emailAddress: {
		type: String,
		required: true,
	},
	studentID: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Guardian', guardianSchema);
