'use server';

import prisma from '@/prisma';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface UserParams {
  name: string;
  email: string;
}

interface CreateUserParams {
  name: string;
  email: string;
  clerkId: string;
}

export async function createUser(userData: CreateUserParams) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { email, name, clerkId } = userData;

    const newUser = await prisma.user.create({
      data: { email, name, clerkId },
    });

    return newUser;
  } catch (error) {
    console.log('Error creating user!', error);
    throw error;
  }
}

export async function updateUser(userData: UserParams) {
  const { email, name } = userData;

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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
    console.log('User not updated!', error);
    return NextResponse.json({ error: 'User not updated!', status: 500 });
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const deletedUserFromMongoDb = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    return deletedUserFromMongoDb;
  } catch (error) {
    console.log('User not deleted!', error);
    return NextResponse.json({ error: 'User not deleted!', status: 500 });
  }
}
