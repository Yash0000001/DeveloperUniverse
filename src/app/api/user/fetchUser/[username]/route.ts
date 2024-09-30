import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: Request, { params }: { params: { username: string } }) {
    await dbConnect();
    
    const { username } = params;

    try {
        console.log("Fetching user with username:", username);
        
        const user = await UserModel.findOne({ username }).populate('projects'); 
        
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'User fetched successfully',
            data: user
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
