import { writable } from 'svelte/store';
import type { MediaCollection } from '$lib/types/media.types';
import { MCU_PHASES } from '$lib/constants/mcu.constants';

// Initialize collections with MCU data
const initialCollections: MediaCollection[] = [
    {
        key: 'mcu',
        name: 'Marvel Cinematic Universe',
        description: 'Follow the epic saga of the Marvel Cinematic Universe from Iron Man to the latest releases. Track your progress through all the movies and Disney+ shows.',
        coverImage: '/images/collections/mcu-cover.jpg', // You'll need to add this image
        sections: MCU_PHASES
    }
    // Add more collections here as they become available
];

export const collections = writable<MediaCollection[]>(initialCollections); 