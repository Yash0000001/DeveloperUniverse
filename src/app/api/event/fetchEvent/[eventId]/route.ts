import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/model/event';

export async function GET(req: Request, { params }: { params: { eventId: string } }) {
    await dbConnect();

    const { eventId } = params;

    try {
        console.log("Fetching event with eventid:", eventId);

        const event = await EventModel.findById(eventId).populate('attendees','clerkId username email');

        if (!event) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Event fetched successfully',
            data: event
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
