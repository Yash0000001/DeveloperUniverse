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
    <div className='flex items-center justify-center p-20 bg-[#120727]'>
      <UserProfile />
    </div>
  );
}

export default page;
