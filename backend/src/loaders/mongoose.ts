import mongoose from 'mongoose';
import Logger from './logger';
import config from '../config/index';

export default async () => {
	if (!config.MONGO_URI) {
		const errMsg = 'MONGO_URI is undefined';
		Logger.warn(errMsg);
		throw new Error(errMsg);
	}
	try {
		mongoose.connect(config.MONGO_URI);
		Logger.info('Mongoose started');
	} catch (err) {
		Logger.warn('Unable to establish connection to MongoDB:', err);
	}
};
