import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db';
import UploadButton from '@/components/upload-btn';
import Files from './components/files';

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
    <main className="mx-auto max-w-7xl p-5 md:p-10">
      <div className="mt-8 flex flex-row items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:items-center sm:gap-0">
        <h1 className="font-bold text-4xl text-gray-900">My Files</h1>
        <UploadButton />
      </div>
      <Files />
    </main>
  );
};

export default DashboardPage;
