import UserModel from '@/model/user';
import dbConnect from '@/lib/dbConnect';

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
