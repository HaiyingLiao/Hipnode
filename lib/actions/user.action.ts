'use server';

import prisma from '@/prisma';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cache } from 'react';

interface ParamsType {
  clerkId: string;
  name: string;
  email: string;
  image: string;
  businessStage: string;
  codingLevel: string;
  businessTypes: string[];
  pageType: string;
  onboardingProgress: string;
}

export async function createUser(params: ParamsType) {
  try {
    const { clerkId, name, email, image } = params;

    const user = await prisma.user.create({
      data: {
        clerkId,
        name,
        email,
        image,
      },
    });
    revalidateTag('user');
    return user;
  } catch (error) {
    console.log('Error with create user', error);
    throw error;
  }
}

export async function updateUser(params: Partial<ParamsType>) {
  const { name, clerkId, pageType, businessStage, codingLevel, businessTypes } =
    params;

  const updateData: Partial<ParamsType> = {
    name,
  };

  if (pageType === 'current-stage') {
    updateData.businessStage = businessStage;
    updateData.onboardingProgress = 'Business Stage';
  } else if (pageType === 'programming-level') {
    updateData.codingLevel = codingLevel;
    updateData.onboardingProgress = 'Coding Level';
  } else if (pageType === 'interest') {
    updateData.businessTypes = businessTypes;
    updateData.onboardingProgress = 'Business Types';
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: updateData,
    });
    revalidateTag('user');
    return updatedUser;
  } catch (error) {
    console.log('Error with update user', error);
  }
}

export async function deleteUser(params: Pick<ParamsType, 'clerkId'>) {
  const { clerkId } = params;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });
    revalidatePath('/');
    return deletedUser;
  } catch (error) {
    console.log('error with delete user', error);
  }
}

export const getUserByClerkId = cache(async (id: string) => {
  if (!id) return null;

  try {
    const selectedUser = await prisma.user.findFirst({
      where: { clerkId: id },
    });

    if (!selectedUser) return;

    return selectedUser;
  } catch (error) {
    throw new Error('An error occurred while fetching the user');
  }
});
