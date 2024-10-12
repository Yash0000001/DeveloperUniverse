import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/model/Comment';

export async function POST(req: Request, { params }: { params: { commentId: string } }) {
    await dbConnect();

    try {
        const { commentId } = params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        comment.upvotes += 1;
        await comment.save();

        return NextResponse.json({ message: 'Upvoted successfully', comment }, { status: 200 });

    } catch (error) {
        console.error('Error upvoting comment:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
