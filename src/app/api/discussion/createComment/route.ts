import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/model/Comment';
import DiscussionModel from '@/model/discussion';
import UserModel from '@/model/user';

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { content, username, discussionId } = body;

        if (!content || !username || !discussionId) {
            return NextResponse.json({ message: 'Content, username, and Discussion are required' }, { status: 400 });
        }

        const user = await UserModel.findOne({username});
        const discussion = await DiscussionModel.findById(discussionId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (!discussion) {
            return NextResponse.json({ message: 'Discussion not found' }, { status: 404 });
        }

        const newComment = new Comment({
            content,
            author: user._id,
            discussion: discussion._id,
        });

        const savedComment = await newComment.save();
        user.comments?.push(savedComment._id);
        discussion.comments?.push(savedComment._id);
        discussion.save();
        user.save();

        return NextResponse.json({ message: 'Comment created successfully', comment: savedComment }, { status: 201 });

    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
