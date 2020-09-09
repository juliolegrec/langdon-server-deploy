import mongoose, { Schema } from 'mongoose';

const schoolTermSchema = new Schema({
	termName: {
		type: String,
		required: true,
	},
	beginDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
});

export default mongoose.model('SchoolTerm', schoolTermSchema);
