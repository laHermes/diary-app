import { NextApiRequest, NextApiResponse } from 'next';
import startOfDay from 'date-fns/startOfDay';
import endOfDayfrom from 'date-fns/endOfDay';
import DailyInspiration from 'models/dailyInspiration';
import connectMongo from '@lib/connection';
import { fetchInspiration } from '@lib/fetchers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	connectMongo().catch(() =>
		res.status(405).json({ error: 'Error in the Connection' })
	);

	const date = new Date();

	try {
		let inspiration;
		inspiration = await DailyInspiration.findOne({
			created_at: { $gte: startOfDay(date), $lte: endOfDayfrom(date) },
		});

		// if today inspiration is undefined
		if (!inspiration) {
			const randomInspiration = await fetchInspiration().then(
				(res) => res.data
			);
			inspiration = await DailyInspiration.create({
				content: randomInspiration.content,
				author: randomInspiration.author,
			});
		}

		res.status(200).json({ success: true, data: inspiration });
	} catch (error) {
		res.status(400).json({ success: false });
	}
};

export default handler;
