import { NextResponse } from 'next/server';
import discussionModel from '@/model/discussion';
import dbConnect from '@/lib/dbConnect';
import { Types } from 'mongoose';

export async function PATCH(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { discussionId, title, content } = body;

        if (!discussionId || !title || !content) {
            return NextResponse.json({ message: 'Discussion ID, Title, and Content are required' }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(discussionId)) {
            return NextResponse.json({ message: 'Invalid Discussion ID' }, { status: 400 });
        }

        const updatedDiscussion = await discussionModel.findByIdAndUpdate(
            discussionId,
            { title, content },
            { new: true } 
        );

        if (!updatedDiscussion) {
            return NextResponse.json({ message: 'Discussion not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Discussion updated successfully', discussion: updatedDiscussion }, { status: 200 });

    } catch (error) {
        console.error('Error updating discussion:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
