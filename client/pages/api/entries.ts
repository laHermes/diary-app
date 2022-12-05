import { unstable_getServerSession } from 'next-auth/next';
import connectMongo from '@lib/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { User } from 'models/user';
import { Story } from 'models/story';
import { z } from 'zod';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	// TODO: ADD ZOD VALIDATION SCHEMA

	if (!session) {
		res.redirect('/login');
	}

	connectMongo().catch(() =>
		res.status(405).json({ error: 'Error connecting to Mongo' })
	);

	const user = await User.findOne({ email: session?.user?.email });

	if (!user) {
		res.redirect('/login');
		return;
	}

	switch (req.method) {
		case 'GET':
			try {
				const entries = await Story.find({ author: user.id });
				res.send(entries);
			} catch (err) {
				res.status(400).send('Bad request!');
			}
			return;
		case 'POST':
			try {
				const entry = await Story.create({
					content: req.body.content,
					emotion: req.body.emotion,
					tags: req.body.tags,
					numberOfWords: req.body.numberOfWords,
					clientDate: req.body.date,
					author: user.id,
				});
				await entry.save();
				res.send(entry);
			} catch (err) {
				res.status(400);
			}
			return;

		case 'PUT':
			try {
				const entry = await Story.findOneAndUpdate(
					{ author: user.id, _id: req.body.id },
					{ ...req.body },
					{ new: true }
				);
				await entry.save();
				if (!entry) {
					res.status(204);
				}
				res.send(entry);
			} catch (err) {
				res.status(400).send('Failed to update entry!');
			}

			return;
		case 'DELETE':
			try {
				await Story.findOneAndDelete({ author: user.id, _id: req.body.id });
				res.status(200).send({});
			} catch (err) {
				res.status(400).send('Failed to delete entry!');
			}
			return;
		default:
			return null;
	}
};

export default handler;

export const StoryValidationSchema = z.object({
	content: z.string().max(1000, { message: 'Entry is too big' }).optional(),
	clientDate: z.string(),
	author: z.string(),
	tags: z.string().array().optional(),
	emotion: z.string().optional(),
});
