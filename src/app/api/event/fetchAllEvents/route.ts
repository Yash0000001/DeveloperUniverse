import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/model/event';

export async function GET() {
    await dbConnect();

    try {
        const event = await EventModel.find({}).select('name date description');
        const totalEventsResult = await EventModel.aggregate([
            {
                $group:{
                    _id:null,
                    count:{
                        $sum:1
                    },
                }
            }
        ])
        const totalEvents = totalEventsResult.length > 0 ? totalEventsResult[0].count : 0;

        if (!event) {
            return NextResponse.json({ message: 'Events not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Events fetched successfully',
            data: event,
            totalEvents:totalEvents
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
