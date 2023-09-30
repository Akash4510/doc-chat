'use client';

import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { trpc } from '@/app/_trpc/client';
import FileCard from './file-card';
import NoFiles from './no-files';

const Files = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <>
      {/* User files */}
      {files && files?.length !== 0 ? (
        // Files present
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <FileCard
                file={file}
                currentlyDeletingFile={currentlyDeletingFile}
                deleteFile={deleteFile}
              />
            ))}
        </ul>
      ) : isLoading ? (
        // Files are loading
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        // No files present
        <NoFiles />
      )}
    </>
  );
};

export default Files;
