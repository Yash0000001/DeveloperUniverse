import { NextResponse } from 'next/server';
import discussionModel from '@/model/discussion';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
    await dbConnect();

    try {
        const discussions = await discussionModel.find({}).populate('createdBy', 'username');
        const totalDiscussionResult = await discussionModel.aggregate([
            {
                $group:{
                    _id:null,
                    count:{
                        $sum:1
                    },
                }
            }
        ])
        return NextResponse.json({ discussions,totalDiscussionResult}, { status: 200 });

    } catch (error) {
        console.error('Error fetching discussions:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
