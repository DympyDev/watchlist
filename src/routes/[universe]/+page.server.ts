import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { COLLECTIONS } from '$lib/constants/collections.constants';

export const load: PageServerLoad = async ({ params }) => {
  const { universe } = params;
  const collection = COLLECTIONS.find(c => c.key === universe.toLowerCase());

  if (!collection) {
    throw error(404, {
      message: 'This cinematic universe watchlist is not available yet.'
    });
  }

  return collection;
}; 