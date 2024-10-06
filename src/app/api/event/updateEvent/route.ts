import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/model/event';


export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const {username,eventId, name, description, organizer, date} = body;

        const user = await UserModel.findOne({username});
        if(user?.role === "user"){
            return NextResponse.json({ message: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (organizer) updateData.organizer = organizer;
        if(date) updateData.date = date;
        

        const updatedEvent = await EventModel.findByIdAndUpdate(
            { _id:eventId },
            { $set: { ...updateData, updatedAt: Date.now() } },
            { new: true }
        );

        if (!updatedEvent) {
            return NextResponse.json({ message: 'Event updation failed' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'Event updated successfully',
            data: updatedEvent
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
