import mongoose from 'mongoose';

const uri = process.env.NEXT_ATLAS_URI as string;

const connectMongo = async () => {
	try {
		await mongoose.connect(uri);
	} catch (errors) {
		return Promise.reject(errors);
	}
};

export default connectMongo;
