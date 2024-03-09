'use server';

import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';

import { InterviewsSchema, InterviewsType } from '../validations';

export async function createInterview(interviewData: InterviewsType) {
  try {
    const validation = InterviewsSchema.safeParse(interviewData);
    if (!validation.success) throw new Error(validation.error.message);

    const {
      image,
      title,
      post,
      revenue,
      updates,
      website,
      authorclerkId,
      category,
      tags,
    } = interviewData;
    const interview = await prisma.interviews.create({
      data: {
        image,
        title,
        post,
        revenue,
        updates,
        website,
        authorclerkId,
        category,
        tags,
      },
    });

    return interview;
  } catch (error) {
    console.error('Error in createInterview:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getInterviews(
  page: number = 1,
  pageSize: number = 10,
  category: string = '',
) {
  try {
    if (page < 1 || pageSize < 1)
      throw new Error('Invalid pagination parameters.');

    const categories: string[] =
      category.trim() !== '' ? category.split('_') : [];

    const whereClause =
      categories.length > 0 ? { category: { in: categories } } : {};

    const totalPosts = await prisma.interviews.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalPosts / pageSize);

    const data = await prisma.interviews.findMany({
      take: pageSize,
      skip: pageSize * (page - 1),
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: whereClause,
    });

    if (!data) throw new Error('Interviews not found.');

    return { data, totalPages };
  } catch (error) {
    console.error('Error in getInterviews:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getInterviewById(id: string) {
  try {
    const foundInterview = await prisma.interviews.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!foundInterview) throw new Error('Interview not found.');

    return foundInterview;
  } catch (error) {
    console.error('Error in getInterviewById:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateInterview(id: string, updateData: InterviewsType) {
  try {
    const user = await currentUser();
    if (!user) throw new Error('You must sign in to perform this action');

    const validation = InterviewsSchema.safeParse(updateData);
    if (!validation.success) throw new Error('validation not successful');

    if (user.id !== updateData.authorclerkId)
      throw new Error('You are not allowed to delete this post');

    const updatedInterview = await prisma.interviews.update({
      where: {
        id,
      },
      data: {
        title: updateData.title,
        image: updateData.image,
        post: updateData.post,
        revenue: updateData.revenue,
        updates: updateData.updates,
        website: updateData.website,
        authorclerkId: updateData.authorclerkId,
        category: updateData.category,
        tags: updateData.tags,
      },
    });

    return updatedInterview;
  } catch (error) {
    console.error('Error in updateInterview:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteInterviewById(id: string) {
  const user = await currentUser();
  if (!user) throw new Error('You must sign in to perform this action');

  const foundInterview = await prisma.interviews.findFirst({ where: { id } });

  if (user.id !== foundInterview?.authorclerkId)
    throw new Error('You are not allowed to delete this post');

  try {
    const deleteinterview = await prisma.interviews.delete({
      where: {
        id,
      },
    });

    if (!deleteinterview) {
      throw new Error('Interview not found or could not be deleted.');
    }
    revalidatePath('/interviews');
  } catch (error) {
    console.error('Error in deleteInterview:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
