import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/model/event';
import ProjectModel from '@/model/projects';

export async function GET(req: Request, { params }: { params: { username: string } }) {
    await dbConnect();
    
    const { username } = params;

    try {
        console.log("Fetching user with username:", username);
        // const x = await EventModel.find();
        // const y = await ProjectModel.find();
        const user = await UserModel.findOne({ username }).populate("projects").populate("eventsJoined", "name description date") 
        // Aggregation for total events joined by the user
        const totalEventsJoined = await EventModel.aggregate([
            {
                $match: { _id: { $in: user!.eventsJoined } }
            },
            {
                $count: "totalEventsJoined"
            }
        ]);

        // Aggregation for total projects created by the user
        const totalProjectsCreated = await ProjectModel.aggregate([
            {
                $match: { _id: { $in: user!.projects } }
            },
            {
                $count: "totalProjectsCreated"
            }
        ]);
        
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'User fetched successfully',
            data: {
                user,
                totalEventsJoined,
                totalProjectsCreated,
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
