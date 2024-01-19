'use server';

import prisma from '@/prisma';
import { Prisma } from '@/prisma/generated/client';
import { group } from 'console';
import { id } from 'date-fns/locale';
import { revalidatePath } from 'next/cache';
import { string } from 'zod';

interface ParamsType {
  name?: string;
  email: string;
}

export async function createUser(params: ParamsType) {
  try {
    const { email, name } = params;

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return user;
  } catch (error) {
    console.log('Error with create user', error);
    throw error;
  }
}

export async function updateUser(params: ParamsType) {
  const { email, name } = params;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log('Error with update user', error);
  }
}

export async function deleteUser(params: ParamsType) {
  const { email } = params;

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        email,
      },
    });

    return deletedUser;
  } catch (error) {
    console.log('error with delete user', error);
  }
}

export async function getUserById(id: string) {
  try {
    const group = await prisma.user.findFirst({
      where: { id },
    });
    return group;
  } catch (error) {
    throw new Error('An error occurred while fetching the user');
  }
}

// Update onboarding progress
export async function updateOnboardingProgress(id: string) {
  try {
    const selectedUser = await prisma.user.findFirst({
      where: { id },
    });

    if (!selectedUser) return;

    const updatedUser = await prisma.user.update({
      where: {
        id: selectedUser.id,
      },
      data: {
        onboardingProgress: selectedUser.onboardingProgress + 1,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}

// Update current business stage
export async function updateStage(id: string, currentStage: string) {
  try {
    const selectedUser = await prisma.user.findFirst({
      where: { id },
    });

    if (!selectedUser) return;

    const updatedUser = await prisma.user.update({
      where: {
        id: selectedUser.id,
      },
      data: {
        currentStage,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}
