import { currentUser } from '@clerk/nextjs';
import { TRPCError } from '@trpc/server';

import { db } from '@/lib/db';
import { protectedProcedure, publicProcedure, router } from './trpc';
import { z } from 'zod';

// Export type router type signature,
// NOT the router itself.

// We are exporting the router itself because the only place we will
// use it is in the server itself.
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const existingUser = await db.user.findFirst({
      where: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (!existingUser) {
      await db.user.create({
        data: {
          clerkId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    return {
      name: user.firstName,
      email: user.emailAddresses[0].emailAddress,
      success: true,
    };
  }),
  getUserFiles: protectedProcedure.query(async ({ ctx }) => {
    // This userId and user is from the clerk
    // and not from our database.
    const { userId } = ctx;

    const files = await db.file.findMany({
      where: {
        userId,
      },
    });

    return files;
  }),
  getFile: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });

      if (!file) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return file;
    }),
  deleteFile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!file) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      await db.file.delete({
        where: {
          id: input.id,
          userId,
        },
      });

      return file;
    }),
});

export type AppRouter = typeof appRouter;
