'use server';

import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';

import { PodcastsType, PodcastsSchema } from '../validations';

export async function createPodcast(podcastData: PodcastsType) {
  try {
    const validation = PodcastsSchema.safeParse(podcastData);
    if (!validation.success) throw new Error(validation.error.message);

    const {
      title,
      location,
      authorclerkId,
      category,
      post,
      image,
      audio,
      tags,
    } = podcastData;
    const podcast = await prisma.podcasts.create({
      data: {
        title,
        location,
        authorclerkId,
        category,
        post,
        image,
        audio,
        tags,
      },
    });

    return podcast;
  } catch (error) {
    console.error('Error in createPodcast:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getPodcasts(
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

    const totalPosts = await prisma.podcasts.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalPosts / pageSize);

    const data = await prisma.podcasts.findMany({
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

    if (!data) throw new Error('Podcasts not found.');

    return { data, totalPages };
  } catch (error) {
    console.error('Error in getPodcasts:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getPodcastById(id: string) {
  try {
    const foundPodcast = await prisma.podcasts.findUnique({
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

    if (!foundPodcast) throw new Error('Interview not found.');

    return foundPodcast;
  } catch (error) {
    console.error('Error in getPodcastById:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updatePodcast(id: string, updateData: PodcastsType) {
  try {
    const user = await currentUser();
    if (!user) throw new Error('You must sign in to perform this action');

    const validation = PodcastsSchema.safeParse(updateData);
    if (!validation.success) throw new Error('validation not successful');

    if (user.id !== updateData.authorclerkId)
      throw new Error('You are not allowed to delete this post');

    const {
      title,
      location,
      authorclerkId,
      category,
      post,
      image,
      audio,
      tags,
    } = updateData;

    const updatedPodcast = await prisma.podcasts.update({
      where: {
        id,
      },
      data: {
        title,
        location,
        authorclerkId,
        category,
        post,
        image,
        audio,
        tags,
      },
    });

    return updatedPodcast;
  } catch (error) {
    console.error('Error in updatePodcast:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deletePodcastById(id: string) {
  const user = await currentUser();
  if (!user) throw new Error('You must sign in to perform this action');

  const foundPodcast = await prisma.podcasts.findFirst({ where: { id } });

  if (user.id !== foundPodcast?.authorclerkId)
    throw new Error('You are not allowed to delete this post');

  try {
    const deletedpodcast = await prisma.podcasts.delete({
      where: {
        id,
      },
    });

    if (!deletedpodcast) {
      throw new Error('Podcast not found or could not be deleted.');
    }
    revalidatePath('/podcasts');
  } catch (error) {
    console.error('Error in deletePodcast:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getPodcastsByUser(
  page: number = 1,
  pageSize: number = 10,
  authorclerkId: string,
) {
  try {
    if (page < 1 || pageSize < 1)
      throw new Error('Invalid pagination parameters.');

    const totalPosts = await prisma.podcasts.count({
      where: { authorclerkId },
    });
    const totalPages = Math.ceil(totalPosts / pageSize);

    const data = await prisma.podcasts.findMany({
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
      where: { authorclerkId },
    });

    if (!data) throw new Error('Podcasts not found.');

    return { data, totalPages };
  } catch (error) {
    console.error('Error in getPodcasts:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
