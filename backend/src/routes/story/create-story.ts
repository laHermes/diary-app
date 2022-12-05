import express, { Request, Response } from 'express';
import checkAuthenticated from '../../middleware/checkAuthenticated';
import { User } from '../../models/user';
import { IUserPayload } from '../../types/index';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';
import Logger from '../../loaders/logger';
import { BadRequestError } from '../../errors/bad-request-error';
import { Story } from '../../models/story';

const router = express.Router();

router.post(
	'/api/story',
	checkAuthenticated,
	[
		body('emotion').notEmpty().isString().withMessage('Invalid Emotion'),
		body('reason').notEmpty().isString().withMessage('Invalid Reason'),
		body('description')
			.isString()
			.isLength({ min: 2, max: 280 })
			.withMessage('Invalid Description'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { googleId } = req.user as IUserPayload;
		const { description, emotion, reason } = req.body;

		try {
			const userExists = await User.findOne({ googleId });

			if (!userExists) {
				throw new BadRequestError('Error saving story.');
			}

			const newStory = new Story({
				description,
				emotion,
				reason,
				author: userExists._id,
			});
			await newStory.save();
			res.status(201).send(newStory);
		} catch (err) {
			res.status(500).send({ error: 'Error saving story.' });
			throw new Error('Could not update stories!');
		}
	}
);

export { router as createStoryRouter };
