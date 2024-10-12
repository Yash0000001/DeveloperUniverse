import { NextResponse } from 'next/server';
import discussionModel from '@/model/discussion';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/user';
import { Schema, Types } from 'mongoose';

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { title, content, username } = body;

        if (!title || !content || !username) {
            return NextResponse.json({ message: 'Title, Content, and Username are required' }, { status: 400 });
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const userId = user._id as Types.ObjectId;
        const newDiscussion = new discussionModel({
            title,
            content,
            createdBy: userId,
        });


        const savedDiscussion = await newDiscussion.save();
        user.discussions = user.discussions || [];
        user.discussions.push(savedDiscussion._id as Schema.Types.ObjectId);
        await user.save();

        return NextResponse.json({ message: 'Discussion created successfully', discussion: savedDiscussion }, { status: 201 });

    } catch (error) {
        console.error('Error creating discussion:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
