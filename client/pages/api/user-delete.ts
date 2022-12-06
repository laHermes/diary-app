import { unstable_getServerSession } from 'next-auth/next';
import connectMongo from '@lib/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { User } from 'models/user';
import { Story } from 'models/story';
import mongoose from 'mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);

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
		case 'DELETE':
			try {
				const deleteSession = await mongoose.startSession();
				await User.remove({ _id: user.id }, { session: deleteSession });
				await Story.remove({ author: user.id }, { session: deleteSession });
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
