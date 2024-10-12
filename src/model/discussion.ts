import mongoose, { Model, Document, Schema, Types } from "mongoose";

export interface Discussion extends Document {
    title: string;
    content: string;
    createdBy: Types.ObjectId;
    comments?: mongoose.Schema.Types.ObjectId[];
    upvotes?: number;
    downvotes?: number;
    createdAt?: Date;
    updatedAt?: Date;
}


const discussionSchema = new Schema<Discussion>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        content: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

const discussionModel: Model<Discussion> = mongoose.models.Discussion || mongoose.model<Discussion>("Discussion", discussionSchema);
export default discussionModel;
