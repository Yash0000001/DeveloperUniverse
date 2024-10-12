import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/model/Comment';

export async function GET(req: Request, { params }: { params: { commentId: string } }) {
    await dbConnect();

    try {
        const { commentId } = params;

        const comment = await Comment.findById(commentId).populate('author', 'username').populate('discussion', 'title');
        
        if (!comment) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        return NextResponse.json({ comment }, { status: 200 });

    } catch (error) {
        console.error('Error fetching comment:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
