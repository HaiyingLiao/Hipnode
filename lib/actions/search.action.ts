'use server';

import prisma from '@/prisma';
import { SearchParams } from '@/types/shared';

const SearchableTypes = ['post', 'meetup', 'group', 'podcast', 'interview'];

export async function globalSearch(params: SearchParams) {
  try {
    const { query, type } = params;

    let results = [];

    const modelsAndTypes = [
      { model: 'post', searchField: 'title', type: 'post' },
      { model: 'meetup', searchField: 'title', type: 'meetup' },
      { model: 'group', searchField: 'title', type: 'group' },
      { model: 'podcast', searchField: 'title', type: 'podcast' },
      { model: 'interview', searchField: 'title', type: 'interview' },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // If no type, search in all models
      for (const { model, searchField, type } of modelsAndTypes) {
        // @ts-ignore
        const queryResults = await prisma[model].findMany({
          where: {
            [searchField]: {
              contains: query,
              mode: 'insensitive',
            },
          },
          take: 8,
        });

        results.push(
          ...queryResults.map((item: any) => ({
            title: item[searchField],
            type,
            id: item._id,
          })),
        );
      }
    } else {
      // Search in the specified model type
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error('Invalid search type');
      }
      // @ts-ignore
      const queryResults = await prisma[modelInfo.model].findMany({
        where: {
          [modelInfo.searchField]: {
            contains: query,
            mode: 'insensitive',
          },
        },
        take: 8,
      });

      results = queryResults.map((item: any) => ({
        title: item[modelInfo.searchField],
        type,
        id: item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    throw error;
  }
}
