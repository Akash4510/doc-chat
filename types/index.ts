import { File } from '@prisma/client';

export type ModifiedFile = Omit<File, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
