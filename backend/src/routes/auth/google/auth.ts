import express from 'express';
import passport from 'passport';
import { deleteCookies } from '../../../middleware/deleteCookies';

const router = express.Router();

router.get(
	'/auth/google',
	deleteCookies,
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

export { router as authRouter };
