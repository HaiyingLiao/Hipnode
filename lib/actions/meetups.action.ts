'use server';

import prisma from '@/prisma';
import { currentUser } from '@clerk/nextjs/server';

import { MeetupsSchema, MeetupsType } from '../validations';
import { revalidatePath } from 'next/cache';

export async function createMeetup(meetupData: MeetupsType) {
  try {
    const validation = MeetupsSchema.safeParse(meetupData);
    if (!validation.success) throw new Error(validation.error.message);

    const {
      title,
      companyName,
      location,
      description,
      image,
      authorclerkId,
      tags,
      category,
    } = meetupData;
    const meetup = await prisma.meetups.create({
      data: {
        title,
        companyName,
        location,
        description,
        image,
        authorclerkId,
        tags,
        category,
      },
    });

    return meetup;
  } catch (error) {
    console.error('Error in createMeetup:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function getMeetups(
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

    const totalPosts = await prisma.meetups.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalPosts / pageSize);

    const data = await prisma.meetups.findMany({
      take: pageSize,
      skip: pageSize * (page - 1),
      orderBy: {
        createdAt: 'desc',
      },
      where: whereClause,
    });

    if (!data) throw new Error('Meetups not found.');

    return { data, totalPages };
  } catch (error) {
    console.error('Error in getMeetups:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateMeetup(id: string, updateData: MeetupsType) {
  try {
    const user = await currentUser();
    if (!user) throw new Error('You must sign in to perform this action');

    const validation = MeetupsSchema.safeParse(updateData);
    if (!validation.success) throw new Error('validation not successful');

    if (user.id !== updateData.authorclerkId)
      throw new Error('You are not allowed to delete this post');

    const {
      title,
      companyName,
      location,
      description,
      image,
      authorclerkId,
      tags,
      category,
    } = updateData;
    const updatedMeetup = await prisma.meetups.update({
      where: {
        id,
      },
      data: {
        title,
        companyName,
        location,
        description,
        image,
        authorclerkId,
        tags,
        category,
      },
    });

    return updatedMeetup;
  } catch (error) {
    console.error('Error in updateMeetup:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function deleteMeetupById(id: string) {
  const user = await currentUser();
  if (!user) throw new Error('You must sign in to perform this action');

  const foundMeetup = await prisma.meetups.findFirst({ where: { id } });

  if (user.id !== foundMeetup?.authorclerkId)
    throw new Error('You are not allowed to delete this post');

  try {
    const deletedmeetup = await prisma.meetups.delete({
      where: {
        id,
      },
    });

    if (!deletedmeetup) {
      throw new Error('Interview not found or could not be deleted.');
    }
    revalidatePath('/meetups');
  } catch (error) {
    console.error('Error in deleteInterview:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
