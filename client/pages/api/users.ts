import { unstable_getServerSession } from 'next-auth/next';
import connectMongo from '@lib/connection';
import { authOptions } from './auth/[...nextauth]';
import { User } from 'models/user';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	// TODO: ADD ZOD VALIDATION SCHEMA

	if (!session) {
		res.redirect('/login');
	}

	connectMongo().catch(() =>
		res.status(405).json({ error: 'Error connecting to Mongo' })
	);

	switch (req.method) {
		case 'DELETE':
			try {
				await User.findOneAndDelete({ email: session?.user?.email });
				res.status(200).send({});
			} catch (err) {
				res.status(400).send('Failed to delete user!');
			}
			return;
		default:
			return null;
	}
};

export default handler;
