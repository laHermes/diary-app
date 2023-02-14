import { NextFunction, Request, Response } from 'express';

export const deleteCookies = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.clearCookie('connect.sid');
	res.clearCookie('jwt_token');
	req.session.destroy(() => null);

	next();
};
