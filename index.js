import { init } from './socket.js';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import corsOptions from './config/corsOptions.js';
import bodyParser from 'body-parser';
import streamersRoutes from './routes/streamersRoutes.js';

const app = express();
connectDB();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', streamersRoutes);

const server = app.listen(3000);
const io = init(server);
io.on('connection', (socket) => {
	console.log('Client connected');
});
