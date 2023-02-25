import { unstable_getServerSession } from 'next-auth/next';
import connectMongo from '@lib/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { Story } from 'models/story';
import mongoose from 'mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	const userEmail = session?.user?.email;

	if (!session || !session?.user?.email) {
		res.redirect('/login');
	}

	if (typeof userEmail === 'undefined' || userEmail === null) {
		throw new Error('No email address found!');
	}

	connectMongo().catch(() =>
		res.status(405).json({ error: 'Error connecting to Mongo' })
	);

	switch (req.method) {
		case 'DELETE':
			try {
				const deleteSession = await mongoose.startSession();
				// deprecated
				// await User.remove({ _id: userEmail }, { session: deleteSession });
				await Story.remove(
					{ authorEmail: userEmail },
					{ session: deleteSession }
				);
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
