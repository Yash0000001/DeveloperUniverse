import mongoose, { Model, Document, Schema, Types } from "mongoose";


export interface Event extends Document {
    name: string;
    description: string;
    organizer?: string;
    date?: Date;
    attendees: Types.ObjectId[];
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
        required: true,
        default: 'Apple'
    },
    date: {
        type: Date,
        requied:true,
        default: Date.now(),
    },
    attendees:[
        {
            type:Types.ObjectId,
            ref : 'User'
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
})

const EventModel: Model<Event> = mongoose.models.Event || mongoose.model<Event>("Event",EventSchema);
export default EventModel;