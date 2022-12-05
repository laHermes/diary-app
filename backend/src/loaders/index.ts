import express from 'express';
import mongooseLoader from './mongoose';
import passportLoader from './passport';
import Logger from './logger';
import expressLoader from './express';

interface ILoader {
	app: express.Application;
}

export default async ({ app }: ILoader) => {
	try {
		await expressLoader({ app });
		await mongooseLoader();
		await passportLoader();
	} catch (err) {
		Logger.warn('Error starting app:', err);
	}
};
