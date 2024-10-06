import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/model/event';


export async function DELETE(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const {username,eventId} = body;

        const user = await UserModel.findOne({username});
        if(user?.role === "user"){
            return NextResponse.json({ message: 'Unauthorized: Admin access required' }, { status: 403 });
        }
        

        const updatedEvent = await EventModel.findByIdAndDelete(eventId);

        if (!updatedEvent) {
            return NextResponse.json({ message: 'Event deletion failed' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'Event deleted successfully',
            data: updatedEvent
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
