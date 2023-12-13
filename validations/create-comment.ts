import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.string(),
  message: z.string(),
  type: z.enum(['comment', 'children']),
  parentId: z.string().nullable(),
  path: z.string(),
});

export type CreateCommentTye = z.infer<typeof createCommentSchema>;
