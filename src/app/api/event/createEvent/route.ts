import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';
import EventModel, { Event } from '@/model/event';

interface UpdatedEvent{
    username:string;
    eventData:Event;
}

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body: UpdatedEvent = await req.json();
        const { username,eventData} = body;
        const {name, description, organizer, date, attendees } = eventData;

        const user = await UserModel.findOne({username});
        if(user?.role === "user"){
            return NextResponse.json({ message: 'Unauthorized: Admin access required' }, { status: 403 });
        }
        if (!name || !description || !date) {
            return NextResponse.json({ message: 'Name, description, and date are required' }, { status: 400 });
        }

        const newEvent = new EventModel({
            name,
            description,
            organizer,
            date,
            attendees
        });

        const savedEvent = await newEvent.save();

        return NextResponse.json({ message: 'Event created successfully', event: savedEvent }, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
