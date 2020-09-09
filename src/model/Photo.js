import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
	path: {
		type: String,
		required: true,
	},
	// userType: {
	// 	type: String,
	// 	required: true,
	// },
	// userID: {
	// 	type: String,
	// 	required: true,
	// },
});

export default mongoose.model('Photo', photoSchema);
