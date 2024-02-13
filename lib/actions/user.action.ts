'use server';

import prisma from '@/prisma';

import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';

interface ParamsType {
  clerkId: string;
  name: string;
  email: string;
  image: string;
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

export async function updateUser(params: Pick<ParamsType, 'email' | 'name'>) {
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
    revalidateTag('user');
    revalidatePath('/');
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

export const getUserByClerkId = unstable_cache(
  async (id: string) => {
    // get random number between 1 to 100
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    console.log('randomNumber', randomNumber);

    if (!id) return null;

    try {
      // const user = await getCachedUser();

      const selectedUser = await prisma.user.findFirst({
        // where: { clerkId: user?.id },
        where: { clerkId: id },
      });

      if (!selectedUser) return;

      return selectedUser;
    } catch (error) {
      throw new Error('An error occurred while fetching the user');
    }
  },
  ['user'],
);
