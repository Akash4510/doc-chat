import { z } from 'zod';

export const sendMessageValidator = z.object({
  fileId: z.string().min(1),
  message: z.string().min(1),
});
