import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/model/Comment';
import discussionModel from '@/model/discussion';
import UserModel from '@/model/user';

export async function DELETE(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { commentId, authorId } = body;

        if (!commentId || !authorId) {
            return NextResponse.json({ message: 'Comment ID and Author ID are required' }, { status: 400 });
        }

        const comment = await Comment.findById(commentId);
        const discussion = await discussionModel.findById(comment.discussion);
        const user = await UserModel.findById(authorId);

        if (!comment) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }
        if(!discussion){
            return NextResponse.json({message: 'Corresponding discussion for this comment is not found'}, {status:404});
        }

        if (comment.author.toString() !== authorId) {
            return NextResponse.json({ message: 'Unauthorized: Only the author can delete this comment' }, { status: 403 });
        }

        await Comment.findByIdAndDelete(commentId);
        discussion.comments = discussion?.comments?.filter((id) => id.toString() !== commentId);
        await discussion.save();

        // Remove the comment ID from the user's comments array
        user!.comments = user?.comments?.filter((id) => id.toString() !== commentId);
        await user!.save();

        return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
