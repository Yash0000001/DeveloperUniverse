import mongoose, { Schema } from "mongoose";

interface IComment extends Document {
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    discussion: mongoose.Schema.Types.ObjectId;
    upvotes: number;
    downvotes: number;
}

const CommentSchema: Schema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    discussion: {
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
