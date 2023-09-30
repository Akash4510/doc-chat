import Link from 'next/link';
import { format } from 'date-fns';
import { Loader2, MessageSquare, Plus, Trash } from 'lucide-react';

import { ModifiedFile } from '@/types';
import { Button } from '@/components/ui/button';

interface FileProps {
  file: ModifiedFile;
  currentlyDeletingFile: string | null;
  deleteFile: ({ id }: { id: string }) => void;
}

const FileCard = ({ file, currentlyDeletingFile, deleteFile }: FileProps) => {
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
      <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
        <div className="pt-6 px-6 w-full flex items-center justify-between space-x-6">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-lg font-medium">{file.name}</h3>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {format(new Date(file.createdAt), 'MMM yyyy')}
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Mocked
        </div>

        <Button
          onClick={() => deleteFile({ id: file.id })}
          variant="destructive"
          size="sm"
          className="w-full"
        >
          {currentlyDeletingFile === file.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </li>
  );
};

export default FileCard;
