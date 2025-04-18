import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { MCU_PHASES } from '$lib/constants/mcu.constants';

const collections = [
    {
        key: 'mcu',
        name: 'Marvel Cinematic Universe',
        description: 'Follow the epic saga of the Marvel Cinematic Universe from Iron Man to the latest releases.',
        coverImage: '/images/collections/mcu-cover.jpg',
        sections: MCU_PHASES
    }
    // Add more collections here as they become available
];

export const load: PageServerLoad = async ({ params }) => {
    const { universe } = params;
    const collection = collections.find(c => c.key === universe.toLowerCase());

    if (!collection) {
        throw error(404, {
            message: 'This cinematic universe watchlist is not available yet.'
        });
    }

    return collection;
}; 