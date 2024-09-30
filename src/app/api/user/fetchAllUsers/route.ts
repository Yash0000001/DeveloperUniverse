import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: Request) {
    await dbConnect();

    try {

        const users = await UserModel.find({}).populate('projects');

        const totalUsersResult = await UserModel.aggregate([
            {
                $group:{
                    _id:null,
                    count:{
                        $sum:1
                    },
                }
            }
        ])
        const totalUsers = totalUsersResult.length > 0 ? totalUsersResult[0].count : 0;

        if (!users || users.length === 0) {
            return NextResponse.json({ message: 'Users not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'All Users fetched successfully',
            data: users,
            totalUsers:  totalUsers 
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching all users:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
