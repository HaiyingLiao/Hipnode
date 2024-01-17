'use server';

import prisma from '@/prisma';

interface ParamsType {
  id?: string;
  name?: string;
  email: string;
}

interface CreateUserParams {
  name: string;
  email: string;
  clerkId: string;
}

export async function createUser(userData: CreateUserParams) {
  try {
    const { email, name, clerkId } = userData;

    const user = await prisma.user.create({
      data: { email, name, clerkId },
    });

    return user;
  } catch (error) {
    console.log('Error creating user!', error);
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
