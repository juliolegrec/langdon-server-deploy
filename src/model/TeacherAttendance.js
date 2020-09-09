import mongoose, { Schema } from 'mongoose';

const teacherAttendanceSchema = new Schema({
	dateOfAttendance: {
		type: Date,
		required: true,
		unique: true,
	},
	attendance: {
		type: Array,
		required: true,
	},
});

export default mongoose.model('TeacherAttendance', teacherAttendanceSchema);
