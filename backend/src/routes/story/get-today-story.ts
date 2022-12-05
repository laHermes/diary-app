import express, { Request, Response } from 'express';
import checkAuthenticated from '../../middleware/checkAuthenticated';
import { IStory, Story } from '../../models/story';
import { User } from '../../models/user';
import { IUserPayload } from '../../types';
import { parse, isValid, format } from 'date-fns';

import endOfDayfrom from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

const router = express.Router();

// ?start=123 ?end=123 ?mode=

router.get(
	'/api/story-today',
	checkAuthenticated,

	async (req: Request, res: Response) => {
		try {
			const { googleId } = req.user as IUserPayload;

			const limit = +(req.query.limit as string) || 10;
			const page = +(req.query.page as string) - 1 || 0;
			const search = (req.query.search as string) || '';

			let sort: any = req.query.sort as string;

			sort ? (sort = sort.split(',')) : (sort = [sort]);

			const sortBy: Record<string, string> = {};

			// TODO: this looks ugly & difficult to understand
			if (sort.length > 0) {
				sortBy[sort[0]] = sort[1];
			} else {
				sort[sort[0]] = 'asc';
			}

			const stories = await Story.find({
				// author: googleId,
				// comment: { $regex: search , $options: 'i' },
			})
				.skip(page * limit)
				.limit(limit);

			const total = await Story.countDocuments({
				comment: { $regex: search, $options: 'i' },
			});

			const result = {
				error: false,
				total,
				page: page + 1,
				limit,
				stories,
			};

			res.status(200).json(result);

			// const user = await User.findOne({
			// 	googleId,
			// });

			// const storiesFilter = {
			// 	$filter: {
			// 		input: '$stories',
			// 		as: 'story',
			// 		cond: {
			// 			$regexMatch: { input: '$$story.comment', regex: search, options: "i" },
			// 			// $and: [
			// 			// 	{ $gte: ['$$story.created_at', startOfDay(parse(startDate))] },
			// 			// 	{ $lte: ['$$story.created_at', endOfDayfrom(parse(endDate))] },
			// 			// ],
			// 		},
			// 	},
			// 	limit: queryLimit,
			// };

			// const awd = await User.aggregate([
			// 	{ $match: { googleId } },
			// 	{
			// 		$project: {
			// 			stories: storiesFilter,
			// 		},
			// 	},
			// 	{ $sort: { created_at: -1 } },
			// ]);
		} catch (err) {
			console.log(err);
			res.status(500).send({ error: 'Error fetching stories' });
		}
	}
);

export { router as getTodayStoriesRouter };
