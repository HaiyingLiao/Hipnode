import { z } from 'zod';

export const PostSchema = z
  .object({
    title: z.string().max(130),
    post: z.string(),
    postImage: z.string(),
    group: z.string(),
    createType: z.string(),
    tags: z.array(z.string().min(1).max(15)).min(1).max(5),
  })
  .partial();

export const CreatePostSchema = PostSchema.extend({
  country: z.string(),
  postImageKey: z.string(),
}).required();

export type CreatePostType = z.infer<typeof CreatePostSchema>;
export type UpdatePostSchemaType = z.infer<typeof PostSchema>;
