import mongoose, { Model, Document, Schema, Types } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    role?: 'admin' | 'user';
    bio: string;
    githubUsername: string;
    skills: string[];
    projects: Types.ObjectId;
    eventsJoined: Types.ObjectId[];
    level?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema<User>({
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
    },
    githubUsername: {
        type: String,
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
        }
    ],
    eventsJoined: [
        {
            types: Types.ObjectId,
            ref: 'Event',
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

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>("User",UserSchema);

export default UserModel;