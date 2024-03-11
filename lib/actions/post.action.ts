/* eslint-disable no-useless-catch */
'use server';

import {
  redirectToSignIn,
  currentUser as getCurrentUser,
} from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import prisma from '@/prisma';
import { PostsSchema, PostsType } from '../validations';
import {
  CreateCommentTye,
  createCommentSchema,
} from '@/validations/create-comment';

export async function getAllPosts(
  sort: 'popular' | 'newest' = 'popular',
  page: number = 1,
  pageSize: number = 10,
  path: string,
  id?: string,
) {
  try {
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const groupsQuery = path === 'groups' && {
      where: {
        groupId: id,
      },
    };

    const data = await prisma.post.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: sort === 'newest' ? { createdAt: 'desc' } : [{ views: 'desc' }],
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
      ...groupsQuery,
    });

    return {
      data,
      totalPages,
    };
  } catch (error) {
    throw error;
  }
}

export async function createPost(postData: PostsType) {
  try {
    const session = await getCurrentUser();
    if (!session) return redirectToSignIn();

    const parsedData = PostsSchema.safeParse(postData);
    if (!parsedData.success) throw new Error(parsedData.error.message);

    const post = await prisma.post.create({
      data: {
        authorclerkId: postData.authorclerkId,
        altText: postData.title,
        body: postData.post,
        image: postData.image,
        role: 'Developer',
        title: postData.title,
        country: postData.country,
      },
    });

    const tagsDocs: string[] = [];

    for (const tag of postData.tags) {
      // create if tag doesn't exists or use tag is found
      const existingTags = await prisma.tag.upsert({
        where: { title: tag },
        // keep prev tag and push with new tag
        update: { postIds: { push: post.id } },
        // create new tag, assume tag in db empty
        create: { title: tag, postIds: { set: [post.id] } },
      });
      tagsDocs.push(existingTags.title);
    }
    // update post tags with new tags
    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        tags: {
          push: tagsDocs,
        },
      },
    });
    revalidatePath('/');
  } catch (error) {
    throw error;
  }
}

export async function getPostById(id: string) {
  try {
    const [comments, post] = await prisma.$transaction([
      prisma.comment.findMany({
        where: {
          postId: id,
        },
      }),
      prisma.post.findFirst({
        where: { id },
        include: {
          author: {
            select: {
              name: true,
              image: true,
              email: true,
              createdAt: true,
            },
          },
          comments: {
            where: {
              postId: id,
              type: 'comment',
            },

            orderBy: {
              createdAt: 'desc',
            },
          },
          _count: true,
        },
      }),
    ]);

    return { post, totalComments: comments.length };
  } catch (error) {
    throw error;
  }
}

export async function getCommentsReply(postId: string, parentId: string) {
  try {
    return await prisma.comment.findMany({
      where: {
        postId,
        parentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function deletePostById(id: string) {
  try {
    const session = await getCurrentUser();
    if (!session) throw new Error('You must sign in to perform this action');

    const foundPost = await prisma.post.findFirst({ where: { id } });

    if (session.id !== foundPost?.authorclerkId)
      throw new Error('You are not allowed to delete this post');

    const tags = await prisma.tag.findMany();

    for (const { title } of tags) {
      await removeTagOrUpdatePostIds(title, id);
    }

    await prisma.post.delete({
      where: { id },
      include: { comments: true },
    });

    revalidatePath('/');
  } catch (error) {
    throw error;
  }
}

async function removeTagOrUpdatePostIds(title: string, postId: string) {
  try {
    const tag = await prisma.tag.findUnique({ where: { title } });

    if (tag) {
      const updatedPostIds = tag.postIds.filter((id) => id !== postId);
      if (updatedPostIds.length === 0) {
        await prisma.tag.delete({ where: { title } });
      } else {
        await prisma.tag.update({
          where: { title },
          data: { postIds: updatedPostIds },
        });
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function updatePost(id: string, postData: PostsType) {
  try {
    const parsedData = PostsSchema.safeParse(postData);
    if (!parsedData.success) throw new Error(parsedData.error.message);

    const session = await getCurrentUser();
    if (!session) throw new Error(`No current user`);

    const foundPost = await prisma.post.findFirst({ where: { id } });
    if (!foundPost) return notFound();

    if (foundPost?.authorclerkId !== session.id)
      throw new Error('You not allowed edit this post');

    await prisma.post.update({
      where: { id: foundPost.id },
      data: {
        authorclerkId: postData.authorclerkId,
        altText: postData.title,
        body: postData.post,
        image: postData.image,
        role: 'Developer',
        title: postData.title,
        country: postData.country,
      },
    });
    revalidatePath('/');
  } catch (error) {
    throw error;
  }
}

export async function updateView(id: string) {
  try {
    const foundPost = await prisma.post.findFirst({ where: { id } });
    if (!foundPost) return;

    await prisma.post.update({
      where: { id: foundPost.id },
      data: { views: { increment: 1 } },
    });
    revalidatePath('/');
  } catch (error) {
    throw error;
  }
}

export async function likePost(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return;

    const { emailAddress } = user.emailAddresses[0];
    const foundPost = await prisma.post.findFirst({ where: { id } });
    if (!foundPost) return;

    const isLikedByUser = foundPost.likes.includes(emailAddress);

    const data = {
      likes: isLikedByUser
        ? foundPost.likes.filter((email) => email !== emailAddress)
        : { push: emailAddress as string },
    };

    await prisma.post.update({ where: { id: foundPost.id }, data });

    revalidatePath('/');
    return foundPost;
  } catch (error) {
    throw error;
  }
}

export async function uploadComment(data: CreateCommentTye) {
  const { postId, message, type, parentId, path } = data;
  try {
    const parsedData = createCommentSchema.safeParse(data);
    if (!parsedData.success) throw new Error(parsedData.error.message);

    const user = await getCurrentUser();
    if (user === null)
      throw new Error('You have to sign in to perform this action');

    const foundPost = await prisma.post.findFirst({ where: { id: postId } });
    if (!foundPost) throw new Error('Post not found');

    await prisma.comment.create({
      data: {
        type,
        authorImage: user?.imageUrl,
        comment: message,
        name:
          user?.username! ??
          user.firstName ??
          user.lastName ??
          user.emailAddresses[0].emailAddress,
        postId,
        ...(parentId && { parentId }),
      },
    });
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function likeComments(
  commentId: string,
  path: string,
  type: string,
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser)
      throw new Error('You must sign in to perform this action');

    const foundComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        type,
      },
    });

    if (!foundComment) throw new Error('Comment not found');

    const { emailAddress } = currentUser.emailAddresses[0];
    const isLikedByCurrentUser = foundComment.likes.includes(emailAddress);

    const updateData = {
      likes: isLikedByCurrentUser
        ? foundComment.likes.filter((email) => email !== emailAddress)
        : { push: emailAddress },
    };
    await prisma.comment.update({
      where: { id: commentId, type },
      data: updateData,
    });

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getRelatedPosts(authorclerkId: string, title: string) {
  try {
    return await prisma.post.findMany({
      where: {
        authorclerkId,
        title: {
          not: title,
        },
      },
      select: {
        id: true,
        title: true,
        tags: true,
      },
      take: 3,
    });
  } catch (error) {
    throw error;
  }
}

export async function reportPost(id: string, reasons: string[]) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return redirectToSignIn();

    await prisma.report.create({
      data: {
        postId: id,
        reportedBy:
          currentUser.username ??
          currentUser.firstName ??
          currentUser.lastName ??
          currentUser.emailAddresses[0].emailAddress,
        reasons: { set: reasons },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function sharePost(id: string, path: string) {
  try {
    const foundPost = await prisma.post.findUnique({ where: { id } });
    if (!foundPost) return;

    await prisma.post.update({
      where: { id },
      data: { share: { increment: 1 } },
    });
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getPostsByUser(
  sort: 'popular' | 'newest' = 'popular',
  page: number = 1,
  pageSize: number = 10,
  authorclerkId: string,
) {
  try {
    const totalPosts = await prisma.post.count({ where: { authorclerkId } });
    const totalPages = Math.ceil(totalPosts / pageSize);

    const data = await prisma.post.findMany({
      where: { authorclerkId },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: sort === 'newest' ? { createdAt: 'desc' } : [{ views: 'desc' }],
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return {
      data,
      totalPages,
    };
  } catch (error) {
    throw error;
  }
}
