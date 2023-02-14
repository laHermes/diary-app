import express, { Request, Response } from 'express';
import checkAuthenticated from '../../middleware/checkAuthenticated';
import { Story } from '../../models/story';
import { IUserPayload } from '../../types';

const router = express.Router();

router.get(
	'/api/story',
	checkAuthenticated,
	async (req: Request, res: Response) => {
		try {
			const { googleId } = req.user as IUserPayload;
			const stories = await Story.find({ author: googleId });
			res.send(stories || []);
		} catch (err) {
			throw new Error("Stories can't be fetched");
		}
	}
);

export { router as getStoriesRouter };
