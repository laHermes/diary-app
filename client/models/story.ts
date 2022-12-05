import mongoose, { Schema, Types } from 'mongoose';

export interface IStorySchema {
	_id: Types.ObjectId;
	content: string;
	emotion: string;
	tags: string[];
	author: Types.ObjectId;
	clientDate: string;
	numberOfWords: string | number;
	created_at: string;
	updated_at: string;
}

// an interface that describes the properties that a Story model has
export interface IStoryModel extends mongoose.Model<IStoryDoc> {
	build({ content, emotion, tags, author }: IStorySchema): IStoryDoc;
}

// an interface that describes the properties that a Story Document has
interface IStoryDoc extends mongoose.Document {
	_id: Types.ObjectId;
	entryId: string;
	content: string;
	emotion: string;
	clientDate: string;
	numberOfWords: string | number;
	tags: string[];
	author: Types.ObjectId;
}

const storySchema = new Schema(
	{
		content: {
			type: String,
			required: false,
		},
		emotion: {
			type: String,
			required: false,
		},
		tags: {
			type: [String],
			required: false,
			default: [],
		},
		clientDate: {
			type: String,
			required: false,
			default: '',
		},
		numberOfWords: {
			type: String || Number,
			required: false,
			default: 0,
		},
		author: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		toJSON: {
			transform(doc: any, ret: any) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

// to avoid exporting buildStory function and User
storySchema.statics.build = ({
	content,
	emotion,
	tags,
	author,
	numberOfWords,
	clientDate,
}: IStorySchema) => {
	return new Story({
		content,
		emotion,
		tags,
		author,
		clientDate,
		numberOfWords,
	});
};

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

export { Story, storySchema };
