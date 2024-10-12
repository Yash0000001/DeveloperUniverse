import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/model/Comment';

export async function PUT(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { commentId, content } = body;

        if (!commentId) {
            return NextResponse.json({ message: 'Comment ID is required or the comment might have been deleted' }, { status: 400 });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content }, 
            { new: true }
        );

        if (!updatedComment) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Comment updated successfully', comment: updatedComment }, { status: 200 });

    } catch (error) {
        console.error('Error updating comment:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
