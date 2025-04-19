import { writable } from 'svelte/store';
import type { MediaCollection } from '$lib/types/media.types';
import { COLLECTIONS } from '$lib/constants/collections.constants';

export const collections = writable<MediaCollection[]>(COLLECTIONS); 