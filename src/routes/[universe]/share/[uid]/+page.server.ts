import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { COLLECTIONS } from '$lib/constants/collections.constants';
import { loadWatchedItems } from '$lib/stores/auth.store';

export const load: PageServerLoad = async ({ params }) => {
  const { universe, uid } = params;
  const collection = COLLECTIONS.find(c => c.key === universe.toLowerCase());

  if (!collection) {
    throw error(404, {
      message: 'This cinematic universe watchlist is not available yet.'
    });
  }

  try {
    // Load the shared user's watch progress
    const watchedItems = await loadWatchedItems(uid, collection.key);
    
    return {
      ...collection,
      sharedUserId: uid,
      watchedItems
    };
  } catch (e) {
    throw error(404, {
      message: 'Could not load watch progress for this user.'
    });
  }
}; 