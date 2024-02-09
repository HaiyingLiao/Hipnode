import type { Comment as PostComments } from '@prisma/client';

type PostCommentsType = {
  parentId: string | null;
  type: string;
} & PostComments;

interface PostArticleProps {
  postHeader: string;
  alt: string;
  title: string;
  tags: string[];
  description: string;
  user: string;
  createdDate: string;
  comments: PostCommentsType[];
  likes: number;
  share: number;
  id: string;
}
