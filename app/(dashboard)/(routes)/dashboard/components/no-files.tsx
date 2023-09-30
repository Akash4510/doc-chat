import { Ghost } from 'lucide-react';

const NoFiles = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-2">
      <Ghost className="h-8 w-8 text-zinc-800" />
      <h1 className="font-semibold text-xl">Pretty empty around here</h1>
      <p>Let&apos;s upload your first PDF.</p>
    </div>
  );
};

export default NoFiles;
