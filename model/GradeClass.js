import mongoose, { Schema } from 'mongoose';

const gradeClassSchema = new Schema({
	classID: {
		type: String,
		required: true,
	},
	className: {
		type: String,
		required: true,
	},
	grade: {
		type: String,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	teacherID: {
		type: String,
	},
	numberOfStudents: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('GradeClass', gradeClassSchema);
