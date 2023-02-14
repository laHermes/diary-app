import mongoose, { Schema, Types } from 'mongoose';
import { storySchema, IStory } from './story';

export interface IUser {
	_id: Types.ObjectId;
	googleId: string;
	email: string;
	username: string;
	avatar: string;
	stories: IStory[];
}

// an interface that describes the properties that a Suer model has
export interface IUserModel extends mongoose.Model<IUserDoc> {
	build({ email, username, googleId, avatar }: IUser): IUserDoc;
}

// an interface that describes the properties that a User Document has
export interface IUserDoc extends mongoose.Document {
	_id: Types.ObjectId;
	email: string;
	username: string;
	googleId: string;
	avatar: string;
	stories: IStory[];
}

const userSchema = new Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		stories: [storySchema],
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
userSchema.statics.build = ({ email, username, googleId, avatar }: IUser) => {
	return new User({
		email,
		username,
		googleId,
		avatar,
	});
};

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };
