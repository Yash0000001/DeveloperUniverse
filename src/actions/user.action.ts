import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';
import ProjectModel from '@/model/projects';

interface CreateUserInput {
  clerkId: string;
  username: string;
  email: string;
}

export const createUser = async ({ clerkId, username, email }: CreateUserInput) => {
  // Ensure MongoDB connection
  await dbConnect();

  try {
    // Create a new user in MongoDB
    const newUser = new UserModel({
      clerkId,
      username,
      email,
    });

    // Save the user in the database
    await newUser.save();

    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const deleteUser = async (clerkId: string) => {

  await dbConnect();
  try {
    const deletedUser = await UserModel.findOneAndDelete({ clerkId });


    if (!deletedUser) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }
    // Find all projects where this user is a contributor
    const projects = await ProjectModel.find({ contributors: deletedUser._id });


    for (const project of projects) {
      if (project.contributors.length === 1) {

        await ProjectModel.findByIdAndDelete(project._id);
      } else {

        await ProjectModel.findByIdAndUpdate(
          project._id,
          { $pull: { contributors: deletedUser._id } }
        );
      }
    }

    return Response.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }


}
