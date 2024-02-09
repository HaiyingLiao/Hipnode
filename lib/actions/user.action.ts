'use server';

import prisma from '@/prisma';
import { revalidatePath } from 'next/cache';

interface ParamsType {
  name: string;
  email: string;}

export async function createUser(params: ParamsType) {
  try {
    const { name, email } = params;

    const user = await prisma.user.create({
      data: {
        name,
        email,
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
    revalidatePath('/');
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
