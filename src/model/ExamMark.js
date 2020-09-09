import mongoose, { Schema } from 'mongoose';

const examMarkSchema = new Schema({
	examID: {
		type: String,
		required: true,
		unique: true,
	},
	studentMarks: {
		type: Array,
		required: true,
	},
});

export default mongoose.model('ExamMark', examMarkSchema);
