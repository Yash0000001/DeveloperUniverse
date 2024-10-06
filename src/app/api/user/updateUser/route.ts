import { NextResponse } from 'next/server';
import UserModel from '@/model/user';
import ProjectModel from '@/model/projects';
import dbConnect from '@/lib/dbConnect';


export async function POST(req: Request) {
    await dbConnect();
    try {

        const body = await req.json();
        const { username, bio, skills, githubUsername, projectData } = body;


        if (!username) {
            return NextResponse.json({ message: 'Username is required' }, { status: 400 });
        }


        const user = await UserModel.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const updateData: any = {};
        if (bio) updateData.bio = bio;
        if (skills) updateData.skills = skills;
        if (githubUsername) updateData.githubUsername = githubUsername;

        if (projectData) {
            const { name, description, githubUrl, visibility } = projectData;


            if (!name || !description) {
                return NextResponse.json({ message: 'Project name and description are required' }, { status: 400 });
            }


            const newProject = new ProjectModel({
                name,
                description,
                githubUrl,
                visibility,
                contributors: [user._id],
            });

            const savedProject = await newProject.save();
            if (!savedProject) {
                return NextResponse.json({ message: "Project not updated" }, { status: 500 })
            }
            const projectId = savedProject._id;

            if (projectId) {
                await UserModel.findOneAndUpdate(
                    { username },
                    { $addToSet: { projects: projectId } },
                    { new: true }
                );
            }

        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { username },
            { $set: { ...updateData, updatedAt: Date.now() } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: 'User update failed' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'User updated successfully',
            data: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating user and creating project:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
