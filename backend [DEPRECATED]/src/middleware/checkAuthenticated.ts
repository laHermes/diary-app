import { NextFunction, Request, Response } from 'express';
import config from '../config';

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.clearCookie('connect.sid');
	res.clearCookie('jwt_token');

	req.session.destroy(() => {
		res.redirect(`${config.CLIENT_URL}/login`);
	});
}

export default checkAuthenticated;
