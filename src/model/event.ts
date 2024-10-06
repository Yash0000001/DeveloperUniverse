import mongoose, { Document, Schema, Types } from "mongoose";

export interface Event extends Document {
    name: string;
    description: string;
    organizer?: string;
    date: Date;
    attendees?: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const EventSchema: Schema = new Schema<Event>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    organizer: {
        type: String,
        default: 'Organizer Apple khane gya hai'
    },
    date: {
        type: Date,
        required: true,
    },
    attendees: [
        {
            type: Types.ObjectId,
            ref: 'User'  // Ensure this references the correct model
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const EventModel = mongoose.models.Event || mongoose.model<Event>("Event", EventSchema);
export default EventModel;
