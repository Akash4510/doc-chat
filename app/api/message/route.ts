import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs';

import { sendMessageValidator } from '@/lib/validators/send-message-validator';
import { db } from '@/lib/db';

export const POST = async (req: NextRequest) => {
  // endpoint for POST /api/message
  // for asking a question to a PDF file

  const body = await req.json();
  const user = await currentUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { fileId, message } = sendMessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) {
    return new Response('Not found', { status: 404 });
  }

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId: user.id,
      fileId,
    },
  });

  //
};
