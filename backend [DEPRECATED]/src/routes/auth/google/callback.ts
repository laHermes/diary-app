import express, { Response, Request } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IUserPayload } from '../../../types';
import config from '../../../config';

const router = express.Router();
const jwt_key = process.env.JWT_KEY;

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: config.CLIENT_URL,
		session: true,
	}),
	async (req: Request, res: Response) => {
		const { email, googleId, avatar, username } = req.user as IUserPayload;

		const token = jwt.sign({ email, googleId, avatar, username }, jwt_key!, {
			expiresIn: '14d',
		});
		res.send({ token });
		req.headers['Authorization'] = token;
		res.setHeader('Authorization', token);
		res.cookie('jwt_token', token);
		res.redirect(config.CLIENT_URL + '/api/get-jwt?token:' + token);
	}
);

export { router as redirectRouter };
