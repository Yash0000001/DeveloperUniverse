import { NextResponse } from 'next/server';
import discussionModel from '@/model/discussion';
import dbConnect from '@/lib/dbConnect';
import { Types } from 'mongoose';

export async function DELETE(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { discussionId, userId } = body;

        if (!discussionId || !userId) {
            return NextResponse.json({ message: 'Discussion ID and User ID are required' }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(discussionId) || !Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ message: 'Invalid Discussion ID or User ID' }, { status: 400 });
        }

        const discussion = await discussionModel.findById(discussionId);
        if (!discussion) {
            return NextResponse.json({ message: 'Discussion not found' }, { status: 404 });
        }

        if (discussion.createdBy.toString() !== userId) {
            return NextResponse.json({ message: 'Unauthorized: Only the creator can delete this discussion' }, { status: 403 });
        }

        await discussionModel.findByIdAndDelete(discussionId);

        return NextResponse.json({ message: 'Discussion deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting discussion:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
