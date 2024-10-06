import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import UserModel from '@/model/user';
import EventModel from '@/model/event';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { username, eventId } = body;

   
        const user = await UserModel.findOne({ username });
        const event = await EventModel.findById(eventId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        if (!event) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        
        const userId = user._id as Types.ObjectId;
        const eventObjId = event._id as Types.ObjectId;

       
        const hasJoined = user.eventsJoined?.includes(eventObjId);
        if (hasJoined) {
            return NextResponse.json({ message: 'User already joined this event' }, { status: 400 });
        }

       
        event.attendees?.push(userId);
        user.eventsJoined?.push(eventObjId);

        
        await event.save();
        await user.save();

        return NextResponse.json({
            message: 'User successfully joined the event',
            eventId: eventObjId,
            userId: userId,
        }, { status: 200 });

    } catch (error) {
        console.error('Error joining event:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
