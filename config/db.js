import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://DareDrope:DareDrope@streamers.zv9g3mg.mongodb.net/Streamers?retryWrites=true&w=majority'
		);
	} catch (err) {
		console.log(err);
	}
};

export default connectDB;
