'use server';

import prisma from '@/prisma';

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

export async function getUserByPostAuthor(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw error;
  }
}
