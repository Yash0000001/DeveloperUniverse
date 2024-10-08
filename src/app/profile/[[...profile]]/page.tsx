import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react';
import { UserProfile } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const page = async () => {
  const user = await currentUser();  
  const { userId } = auth();  
  

  if (!userId && !user) {  
    redirect("/");
  }

  

  return (
    <div className='flex items-center justify-center mt-6'>
      <h1 className='text-2xl'>{user?.username}</h1>
      <UserProfile />
    </div>
  );
}

export default page;
