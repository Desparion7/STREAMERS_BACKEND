import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		platform: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imgUrl: {
			type: String,
			required: false,
		},
		upvote: {
			type: Number,
			required: false,
			default: 0,
		},
		downvote: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Streamer = mongoose.model('Streamer', streamerSchema);

export default Streamer;
