import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import discussionModel from '@/model/discussion';

export async function POST(req: Request, { params }: { params: { discussionId: string } }) {
    await dbConnect();

    try {
        const { discussionId } = params;
        const discussion = await discussionModel.findById(discussionId);
        
        if (!discussion) {
            return NextResponse.json({ message: 'Discussion not found' }, { status: 404 });
        }

        // Ensure upvotes is initialized and increment it
        if (typeof discussion.downvotes !== 'number') {
            discussion.downvotes = 0;
        }

        discussion.downvotes += 1;
        await discussion.save();

        return NextResponse.json({ message: 'Downvoted discussion successfully', discussion }, { status: 200 });

    } catch (error) {
        console.error('Error Downvoting discussion:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
