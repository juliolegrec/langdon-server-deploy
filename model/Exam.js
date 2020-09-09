import mongoose, { Schema } from 'mongoose';

const examSchema = new Schema({
	examID: {
		type: String,
		required: true,
		unique: true,
	},
	examDate: {
		type: Date,
		required: true,
	},
	startTime: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
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

export default mongoose.model('Exam', examSchema);
