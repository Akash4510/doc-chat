import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db';
import DashboardHeader from './components/dashboard-header';
import { trpc } from '@/app/_trpc/client';
import UserFiles from './components/user-files';

const DashboardPage = async () => {
  const user = await currentUser();

  // This should never happen, but just in case
  // we redirect the user to the auth callback page
  if (!user) {
    return redirect('/auth-callback?origin=dashboard');
  }

  // Check if the user is present in our database
  const existingUser = await db.user.findFirst({
    where: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  // If not, means the user is visiting the dashboard
  // for the first time, so we redirect them to the
  // auth callback page to create their account
  if (!existingUser) {
    return redirect('/auth-callback?origin=dashboard');
  }

  return (
    <>
      <DashboardHeader />
      <UserFiles />
    </>
  );
};

export default DashboardPage;
