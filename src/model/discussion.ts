import mongoose, { Model, Document, Schema, Types } from "mongoose";

export interface Comment extends Document {
    user: Types.ObjectId[];
    content: string;
    createdAt: Date;
}


export interface Discussion extends Document {
    title: string;
    content: string;
    createdBy: Types.ObjectId[];
    comments: Comment[];
    upvotes: number;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<Comment>({
    user: [
        {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


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
        createdBy: [{
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        }],
        comments: [commentSchema],
        upvotes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const discussionModel: Model<Discussion> = mongoose.models.Discussion || mongoose.model<Discussion>("Discussion", discussionSchema);
export default discussionModel;
