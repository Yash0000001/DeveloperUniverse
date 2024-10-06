import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/user';
import EventModel from '@/model/event';
import { Types } from 'mongoose';

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { adminUsername, usernameToRemove, eventId } = body;

        const adminUser = await UserModel.findOne({ username: adminUsername });
        if (!adminUser) {
            return NextResponse.json({ message: 'Admin user not found' }, { status: 404 });
        }

        if (adminUser.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        const userToRemove = await UserModel.findOne({ username: usernameToRemove });
        if (!userToRemove) {
            return NextResponse.json({ message: 'User to be removed not found' }, { status: 404 });
        }

        const event = await EventModel.findById(eventId);
        if (!event) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        const userId = userToRemove._id as Types.ObjectId;
        const eventObjId = event._id as Types.ObjectId;

        const userInEvent = event.attendees?.includes(userId);
        if (!userInEvent) {
            return NextResponse.json({ message: 'User is not an attendee of this event' }, { status: 400 });
        }

        event.attendees = event.attendees?.filter((attendeeId:Types.ObjectId) => !attendeeId.equals(userId));


        userToRemove.eventsJoined = userToRemove.eventsJoined?.filter((joinedEventId) => !joinedEventId.equals(eventObjId));


        await event.save();
        await userToRemove.save();

        return NextResponse.json({
            message: 'User removed from event successfully',
            eventId: eventObjId,
            userId: userId,
        }, { status: 200 });

    } catch (error) {
        console.error('Error removing user from event:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
