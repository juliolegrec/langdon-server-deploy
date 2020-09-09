import mongoose, { Schema } from 'mongoose';

const assessmentMarkSchema = new Schema({
	assessmentID: {
		type: String,
		required: true,
		unique: true,
	},
	studentMarks: {
		type: Array,
		required: true,
	},
});

export default mongoose.model('AssessmentMark', assessmentMarkSchema);
