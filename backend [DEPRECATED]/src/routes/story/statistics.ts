import express, { Request, Response } from 'express';
import checkAuthenticated from '../../middleware/checkAuthenticated';
import { User } from '../../models/user';
import { IUserPayload } from '../../types';

const router = express.Router();

router.get(
	'api/story/statistics',
	checkAuthenticated,
	async (req: Request, res: Response) => {
		const { googleId } = req.user as IUserPayload;
		const user = await User.findOne({ googleId });

		const stories = user?.stories;
		res.send(stories || []);
	}
);
