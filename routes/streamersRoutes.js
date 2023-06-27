import express from 'express';
import {
	addNewStreamer,
	getStreamers,
	getStreamerById,
	updateStreamer,
} from './../controllers/streamersControllers.js';

const router = express.Router();

router.post('/streamers', addNewStreamer);
router.get('/streamers', getStreamers);
router.get('/streamers/:streamerId', getStreamerById);
router.put('/streamers/:streamerId', updateStreamer);

export default router;
