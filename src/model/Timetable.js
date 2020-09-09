import mongoose, { Schema } from 'mongoose';

const timetableSchema = new Schema({
	classID: {
		type: String,
		required: true,
		unique: true,
	},
	slots: {
		type: Array,
		required: true,
	},
});

export default mongoose.model('Timetable', timetableSchema);
