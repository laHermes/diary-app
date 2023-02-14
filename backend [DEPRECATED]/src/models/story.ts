import mongoose, { Schema, Types } from 'mongoose';

interface IStorySchema {
	_id: Types.ObjectId;
	description: string;
	emotion: string;
	reason: string;
	author: string;
	created_at: string;
	updated_at: string;
}

// an interface that describes the properties that a Story model has
interface IStoryModel extends mongoose.Model<IStoryDoc> {
	build({ description, emotion, reason, author }: IStorySchema): IStoryDoc;
}

// an interface that describes the properties that a Story Document has
interface IStoryDoc extends mongoose.Document {
	_id: Types.ObjectId;
	description: string;
	emotion: string;
	reason: string;
	author: string;
}

const storySchema = new Schema(
	{
		description: {
			type: String,
			required: false,
			max: 120,
		},
		emotion: {
			type: String,
			required: false,
		},
		reason: {
			type: String,
			required: false,
		},
		author: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

// to avoid exporting buildStory function and User
storySchema.statics.build = ({
	description,
	emotion,
	reason,
	author,
}: IStorySchema) => {
	return new Story({
		description,
		emotion,
		reason,
		author,
	});
};

const Story = mongoose.model<IStoryDoc, IStoryModel>('Story', storySchema);

export { Story, IStorySchema, storySchema };
