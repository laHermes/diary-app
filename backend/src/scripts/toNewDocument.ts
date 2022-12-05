import { IUser, User } from '../models/user';
import mongooseLoader from '../loaders/mongoose';
import { IStory, Story } from '../models/story';

// NOTE: make sure the path to env file is specified in config file

// creates new separate document from a subdocument
const fromSubDocArrayToDoc = async () => {
	try {
		// separate connection to mongoDB
		await mongooseLoader();

		const user = await User.aggregate([
			{
				$project: {
					stories: {
						$filter: {
							input: '$stories',
							as: 'story',
							cond: {
								$or: [
									{ $eq: ['$$story.isMigrated', false] },
									{ $lte: ['$$story.isMigrated', null] },
								],
							},
						},
					},
				},
			},
		]);

		user.forEach(({ _id: authorId, stories }: IUser) => {
			stories.forEach(async (story: IStory) => {
				try {
					const { description, reason, emotion } = story;

					const newStory = new Story({
						description,
						reason,
						emotion,
						isMigrated: true,
						author: authorId,
					});
					newStory.save();
				} catch (err) {
					console.log(err);
				}
			});
		});
		console.log('Success, I guess...');
	} catch (err) {
		console.log(err);
	}
};

fromSubDocArrayToDoc();
