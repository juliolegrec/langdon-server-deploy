import mongoose, { Schema } from 'mongoose';

const subjectSchema = new Schema({
	subjectID: {
		type: String,
		required: true,
	},
	subjectName: {
		type: String,
		required: true,
	},
	teacherID: {
		type: Array,
	},
});

export default mongoose.model('Subject', subjectSchema);
