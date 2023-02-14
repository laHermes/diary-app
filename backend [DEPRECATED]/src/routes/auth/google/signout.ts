import express, { Response, NextFunction, Request } from 'express';

const router = express.Router();
router.get(
	'/auth/logout',
	async (req: Request, res: Response, next: NextFunction) => {
		res.clearCookie('connect.sid');
		res.clearCookie('jwt_token');

		req.session.destroy(() => {
			res.redirect('/');
		});
		res.status(204);
	}
);

export { router as logoutRouter };
