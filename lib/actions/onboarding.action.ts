'use server';

import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';

// Update Business Stage
export async function updateBusinessStage(id: string, businessStage: string) {
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
        onboardingProgress: 'Business Stage',
        businessStage,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}

// Update Coding Level
export async function updateCodingLevel(id: string, codingLevel: string) {
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
        onboardingProgress: 'Coding Level',
        codingLevel,
      },
    });

    revalidatePath('/interest');
    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}

// Update Business Types
export async function updateBusinessTypes(id: string, businessTypes: string[]) {
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
        onboardingProgress: 'Business Types',
        businessTypes,
      },
    });
    revalidatePath('/');
    return updatedUser;
  } catch (error) {
    throw new Error('User not updated');
  }
}
