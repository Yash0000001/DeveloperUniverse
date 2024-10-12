import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/model/Comment';

export async function GET() {
    await dbConnect();

    try {
        const comments = await Comment.find().populate('author', 'username').populate('discussion', 'title');
        const totalCommentResult = await Comment.aggregate([
            {
                $group:{
                    _id:null,
                    count:{
                        $sum:1
                    },
                }
            }
        ])
        
        return NextResponse.json({ comments, totalCommentResult }, { status: 200 });

    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
