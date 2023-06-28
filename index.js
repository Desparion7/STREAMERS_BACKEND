import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { init } from './socket.js';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import corsOptions from './config/corsOptions.js';
import bodyParser from 'body-parser';
import streamersRoutes from './routes/streamersRoutes.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
connectDB();

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + file.originalname);
	},
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(multer({ storage: fileStorage }).single('photo'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', streamersRoutes);

const server = app.listen(3000);
const io = init(server);
io.on('connection', (socket) => {
	console.log('Client connected');
});
