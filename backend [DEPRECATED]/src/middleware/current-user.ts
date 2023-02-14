import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index';
import { IUserPayload } from '../types';

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers['authorization']) {
		return next();
	}

	// const authToken = req.headers['authorization']?.split(' ')[1]; --> OLD APPS
	const authToken = req.headers['authorization'];

	try {
		const payload = jwt.verify(authToken, config.JWT_KEY) as IUserPayload;
		req.user = payload;
	} catch (err) {
		console.log(err);
	}

	next();
};
