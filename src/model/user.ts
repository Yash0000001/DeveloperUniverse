import mongoose, { Model, Document, Schema, Types } from "mongoose";


export interface updatedUser extends Document {
    bio?: string;
    githubUsername?: string;
    skills?: string[];
    projects?: Types.ObjectId;
}
export interface User extends Document {
    clerkId: string;
    username: string;
    email: string;
    role?: 'admin' | 'user';
    bio?: string;
    githubUsername?: string;
    skills?: string[];
    projects?: Types.ObjectId;
    eventsJoined?: Types.ObjectId[];
    discussions?: mongoose.Schema.Types.ObjectId[];
    comments?:mongoose.Schema.Types.ObjectId[];
    level?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema<User>({
    clerkId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user'
    },
    bio: {
        type: String,
        default: null,
    },
    githubUsername: {
        type: String,
        default: null,
    },
    skills: [
        {
            type: String,
        }
    ],
    projects: [
        {
            type: Types.ObjectId,
            ref: 'Project',
            default: null,
        }
    ],
    eventsJoined: {
        type:[Types.ObjectId],
        ref:"Event",
        default:[]
    },
    discussions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Discussion',
            default: null,
        }
    ],
    comments: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Comment' 
        }
    ],
    level: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;