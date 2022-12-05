import mongoose, { Schema } from 'mongoose';

const dailyInspirationSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: { type: String, required: false },
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

const DailyInspiration =
	mongoose.models.DailyInspiration ||
	mongoose.model('DailyInspiration', dailyInspirationSchema);

export default DailyInspiration;
