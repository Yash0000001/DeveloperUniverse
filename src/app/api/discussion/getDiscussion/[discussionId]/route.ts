import { NextResponse } from 'next/server';
import discussionModel from '@/model/discussion';
import dbConnect from '@/lib/dbConnect';
import { Types } from 'mongoose';

export async function GET(req: Request, { params }: { params: { discussionId: string } }) {
    await dbConnect();

    try {
        const { discussionId } = params;

        if (!Types.ObjectId.isValid(discussionId)) {
            return NextResponse.json({ message: 'Invalid Discussion ID' }, { status: 400 });
        }

        const discussion = await discussionModel.findById(discussionId).populate('createdBy', 'username');
        if (!discussion) {
            return NextResponse.json({ message: 'Discussion not found' }, { status: 404 });
        }

        return NextResponse.json({ discussion }, { status: 200 });

    } catch (error) {
        console.error('Error fetching discussion:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
