import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);

export { router as loginRouter };
