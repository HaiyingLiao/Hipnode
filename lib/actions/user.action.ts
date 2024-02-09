'use server';

import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';

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

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error('An error occurred while fetching the user');
  }
}
