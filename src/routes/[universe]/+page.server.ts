import { MCU_PHASES } from '$lib/constants/mcu.constants';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { universe } = params;

    switch (universe.toLowerCase()) {
        case 'mcu':
            return {
                universe: 'Marvel Cinematic Universe',
                phases: MCU_PHASES
            };
        // Add more universes here in the future
        default:
            throw error(404, {
                message: 'This cinematic universe watchlist is not available yet.'
            });
    }
}; 