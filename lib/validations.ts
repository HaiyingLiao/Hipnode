import { z } from 'zod';

// for form
export const PostSchema = z.object({
  title: z.string().min(5).max(130),
  post: z.string().min(100),
  group: z.string(),
  createType: z.string(),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});

export const CreatePostSchema = PostSchema.extend({
  revenue: z.coerce.number().optional(),
  updates: z.coerce.number().optional(),
  website: z.string().optional(),
  authorclerkId: z.string().optional(),
  category: z.string().optional(),
  companyName: z.string().optional(),
});

// for server action
export const InterviewsSchema = z.object({
  title: z.string().min(5).max(130),
  post: z.string().min(100),
  image: z.string(),
  revenue: z.number(),
  updates: z.number(),
  website: z.string(),
  authorclerkId: z.string(),
  category: z.string(),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});

export const PostsSchema = z.object({
  title: z.string().min(5).max(130),
  post: z.string().min(100),
  image: z.string(),
  authorclerkId: z.string(),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
  country: z.string(),
});

export const MeetupsSchema = z.object({
  title: z.string().min(5).max(130),
  companyName: z.string().max(50),
  location: z.string(),
  description: z.string().min(80),
  image: z.string(),
  authorclerkId: z.string(),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
  category: z.string(),
});

export const PodcastsSchema = z.object({
  title: z.string().min(5).max(130),
  location: z.string(),
  description: z.string().min(80),
  authorclerkId: z.string(),
  category: z.string(),
});

export type CreatePostType = z.infer<typeof CreatePostSchema>;
export type UpdatePostSchemaType = z.infer<typeof PostSchema>;
export type InterviewsType = z.infer<typeof InterviewsSchema>;
export type PostsType = z.infer<typeof PostsSchema>;
export type MeetupsType = z.infer<typeof MeetupsSchema>;
export type PodcastsType = z.infer<typeof PodcastsSchema>;
