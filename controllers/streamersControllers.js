import Streamer from '../models/StreamerModel.js';
import { init, getIO } from '../socket.js';

//@desc add new streamer
//@route POST /streamers
//@access Public
export const addNewStreamer = async (req, res, next) => {
	const name = req.body.name;
	const platform = req.body.platform;
	const description = req.body.description;
	// Check for all required data
	if (!name && !platform && !description) {
		return res.status(422).json({
			message: 'Validation fail, entered data is incorrect',
		});
	}
	// Check for name length
	if (name.trim().length > 20) {
		return res.status(422).json({
			message: 'Validation fail, name is to long',
		});
	}
	// Check for description length
	if (description.trim().length > 350) {
		return res.status(422).json({
			message: 'Validation fail, description is to long',
		});
	}
	const streamer = new Streamer({
		name,
		platform,
		description,
		imgUrl: req.file
			? `http://localhost:3000/${req.file.path}`
			: 'http://localhost:3000/images/asmongold.png',
	});
	try {
		const newStreamer = await streamer.save();
		// socket upadte for other users
		getIO().emit('streamers', newStreamer);
		res.status(201).json({
			message: 'New streamer created successfully!',
			streamer: newStreamer,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

//@desc Get all stremers
//@route GET /streamers
//@access Public
export const getStreamers = async (req, res, next) => {
	try {
		const streamers = await Streamer.find({}).exec();
		if (!streamers || streamers.length === 0) {
			return res.status(400).json({
				message: 'No streamers found!',
			});
		}
		res.json(streamers);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

//@desc Get single stremer by id
//@route GET /streamers/:streamerId
//@access Public
export const getStreamerById = async (req, res, next) => {
	try {
		const streamer = await Streamer.findById(req.params.streamerId).exec();
		if (!streamer) {
			return res.status(400).json({
				error: 'Streamer with given id not found',
			});
		}
		res.json(streamer);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

//@desc update streamers data
//@route PUT /streamers/:streamerId
//@access Public
export const updateStreamer = async (req, res, next) => {
	try {
		const streamer = await Streamer.findById(req.params.streamerId);
		if (!streamer) {
			return res.status(400).json({
				error: 'Streamer with given id not found',
			});
		}
		// check if user upvote or downvote
		if (req.body.vote === -1) {
			streamer.downvote -= 1;
		} else if (req.body.vote === 1) {
			streamer.upvote += 1;
		}
		await streamer.save();
		// socket upadte for other users
		getIO().emit('vote', streamer);
		res.json(streamer);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
