import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import Logger from './logger';
import config from '../config';
import session from 'express-session';
import { limiter } from '../services/rateLimiter';

import {
	logoutRouter,
	loginRouter,
	redirectRouter,
	getUserRouter,
} from '../routes/auth/index';

import { createStoryRouter } from '../routes/story/create-story';
import { getStoriesRouter } from '../routes/story/index';
import { getTodayStoriesRouter } from '../routes/story/get-today-story';
import connectRedis from 'connect-redis';
import redisCli from '../services/redisClient';

export default async ({ app }: { app: express.Application }) => {
	// Redis store for sessions
	const RedisStore = connectRedis(session);
	const redisClient = await redisCli();

	app.use(limiter);

	// enable this if you run a proxy (e.g. nginx, ingress)
	app.set('trust proxy', 1);

	app.use(
		session({
			store: new RedisStore({ client: redisClient }),
			secret: config.SESSION_SECRET as string,
			resave: false,
			saveUninitialized: false,
			cookie: {
				sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
				secure: process.env.NODE_ENV === 'prod', // must be true if sameSite='none'
			},
		})
	);

	app.use(express.json());
	app.use(cors({ origin: config.CLIENT_URL as string, credentials: true }));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(redirectRouter);
	app.use(loginRouter);
	app.use(getStoriesRouter);
	app.use(logoutRouter);
	app.use(getUserRouter);

	app.use(getTodayStoriesRouter);
	app.use(createStoryRouter);

	app.get('/error', (req: Request, res: Response) =>
		res.send('error logging in')
	);

	app.get('/', (req: Request, res: Response) => {
		return res.status(200).json({
			title: 'Express Testing',
			message: 'The app is working properly!',
		});
	});

	app.get('*', async () => {
		throw new Error('Not Found');
	});

	Logger.info('Express started');

	return app;
};
