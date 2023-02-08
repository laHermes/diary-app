import mongoose, { Schema, Types } from 'mongoose';
import { IStorySchema } from './story';

export interface IUser {
	_id: Types.ObjectId;
	email: string;
	username: string;
	stories: IStorySchema[];
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
	build({ email, username }: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
	_id: Types.ObjectId;
	email: string;
	username: string;
	stories: IStorySchema[];
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
		},
		storyIds: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

// to avoid exporting buildUser function and User
userSchema.statics.build = ({ email, username }: IUser) => {
	return new User({
		email,
		username,
	});
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export { User };
