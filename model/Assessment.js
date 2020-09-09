import mongoose, { Schema } from 'mongoose';

const assessmentSchema = new Schema({
	assessmentID: {
		type: String,
		required: true,
		unique: true,
	},
	assessmentDate: {
		type: Date,
		required: true,
	},
	period: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	gradeClass: {
		type: String,
		required: true,
	},
	markings: {
		type: Number,
		required: true,
	},
	term: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Assessment', assessmentSchema);
