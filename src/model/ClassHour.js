import mongoose, { Schema } from 'mongoose';

const classHourSchema = new Schema({
	hourName: {
		type: String,
		required: true,
	},
	beginTime: {
		type: String,
		required: true,
	},
	endTime: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

export default mongoose.model('ClassHour', classHourSchema);
