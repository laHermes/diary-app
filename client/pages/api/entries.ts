import { unstable_getServerSession } from 'next-auth/next';
import connectMongo from '@lib/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { User } from 'models/user';
import { Story } from 'models/story';
import { z } from 'zod';

export const StoryValidationSchema = z.object({
	content: z.string().max(1000, { message: 'Entry is too big' }).optional(),
	date: z.string(),
	tags: z.string().array().optional(),
	emotion: z.string().optional(),
});

// must be used since req and res are handled by functions outside handler
export const config = {
	api: {
		externalResolver: true,
		runtime: 'edge',
	},
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		res.redirect('/login');
	}

	connectMongo().catch(() =>
		res.status(405).json({ message: 'Error connecting to Mongo' })
	);

	const user = await User.findOne({ email: session?.user?.email });

	if (!user) {
		res.redirect('/login');
		return;
	}

	switch (req.method) {
		case 'GET':
			getEntriesController(req, res, user.id);
			return;
		case 'POST':
			addEntryController(req, res, user.id);
			return;

		case 'PUT':
			updateEntryController(req, res, user.id);
			return;
		case 'DELETE':
			deleteEntryController(req, res, user.id);
			return;
		default:
			return null;
	}
};

export default handler;

// GET ENTRIES
const getEntriesController = async (
	req: NextApiRequest,
	res: NextApiResponse,
	userId: string
) => {
	try {
		const entries = await Story.find({ author: userId });
		res.send(entries);
	} catch (err) {
		res.status(400).send({ message: 'Bad request!' });
	}
};

// ADD
const addEntryController = async (
	req: NextApiRequest,
	res: NextApiResponse,
	userId: string
) => {
	if (!StoryValidationSchema.parse(req.body)) {
		res.status(400).send({ message: 'Invalid Entry' });

		return;
	}

	try {
		const entry = await Story.create({
			content: req.body.content,
			emotion: req.body.emotion,
			tags: req.body.tags,
			numberOfWords: req.body.numberOfWords,
			clientDate: req.body.date,
			author: userId,
		});
		await entry.save();
		res.send(entry);
	} catch (err) {
		res.status(400);
	}
};

// UPDATE
const updateEntryController = async (
	req: NextApiRequest,
	res: NextApiResponse,
	userId: string
) => {
	if (!StoryValidationSchema.parse(req.body)) {
		res.status(400).send({ message: 'Invalid Entry' });

		return;
	}

	try {
		const entry = await Story.findOneAndUpdate(
			{ author: userId, _id: req.body.id },
			{ ...req.body },
			{ new: true }
		);
		await entry.save();
		if (!entry) {
			res.status(204);
		}
		res.send(entry);
	} catch (err) {
		res.status(400).send({ message: 'Failed to update entry!' });
	}
};

// DELETE
const deleteEntryController = async (
	req: NextApiRequest,
	res: NextApiResponse,
	userId: string
) => {
	try {
		await Story.findOneAndDelete({ author: userId, _id: req.body.id });
		res.status(200).send({});
	} catch (err) {
		res.status(400).send('Failed to delete entry!');
	}
};
