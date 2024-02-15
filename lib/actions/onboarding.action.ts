'use server';

import prisma from '@/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

// Update Business Stage
export async function updateBusinessStage(
  clerkId: string,
  businessStage: string,
) {
  try {
    const selectedUser = await prisma.user.findFirst({
      where: { clerkId },
    });

    if (!selectedUser) return;

    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        onboardingProgress: 'Business Stage',
        businessStage,
      },
    });
    revalidateTag('user');
    revalidatePath('/programming-level');
    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}

// Update Coding Level
export async function updateCodingLevel(clerkId: string, codingLevel: string) {
  try {
    const selectedUser = await prisma.user.findFirst({
      where: { clerkId },
    });

    if (!selectedUser) return;

    const updatedUser = await prisma.user.update({
      where: {
        clerkId: selectedUser.clerkId,
      },
      data: {
        onboardingProgress: 'Coding Level',
        codingLevel,
      },
    });
    revalidateTag('user');
    revalidatePath('/interest');
    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}

// Update Business Types
export async function updateBusinessTypes(
  clerkId: string,
  businessTypes: string[],
) {
  try {
    const selectedUser = await prisma.user.findFirst({
      where: { clerkId },
    });

    if (!selectedUser) return;

    const updatedUser = await prisma.user.update({
      where: {
        clerkId: selectedUser.clerkId,
      },
      data: {
        onboardingProgress: 'Business Types',
        businessTypes,
      },
    });
    revalidateTag('user');
    revalidatePath('/');
    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}
