import { redirect, notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db';
import PDFRenderer from '@/components/pdf-renderer';
import ChatWrapper from '@/components/chat/chat-wrapper';

interface FileIdPageProps {
  params: {
    fileId: string;
  };
}

const FilePage = async ({ params }: FileIdPageProps) => {
  const { fileId } = params;

  const user = await currentUser();

  // This should never happen, but just in case
  // we redirect the user to the auth callback page
  if (!user) {
    return redirect(`/auth-callback?origin=dashboard/${fileId}`);
  }

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-between h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PDFRenderer file={file} />
          </div>
        </div>

        {/* Right side */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default FilePage;
