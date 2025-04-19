import type { MediaCollection } from '$lib/types/media.types';
import { MCU_PHASES } from './mcu.constants';
import { STAR_WARS_SECTIONS } from './star-wars.constants';
import { DCEU_MOVIES } from './dceu-movies.constants';

export const COLLECTIONS: MediaCollection[] = [
    {
        key: 'mcu',
        name: 'Marvel Cinematic Universe',
        description: 'Follow the epic saga of the Marvel Cinematic Universe from Iron Man to the latest releases. Track your progress through all the movies and Disney+ shows.',
        coverImage: '/images/mcu/banner.webp',
        sections: MCU_PHASES
    },
    {
        key: 'dceu',
        name: 'DC Extended Universe',
        description: 'Follow the epic saga of the DC Extended Universe from Man of Steel to the latest releases. Track your progress through all the movies and Disney+ shows.',
        coverImage: '/images/dceu/banner.webp',
        sections: DCEU_MOVIES
    },
    {
        key: 'star-wars',
        name: 'Star Wars',
        description: 'Follow the epic saga of the Star Wars franchise from A New Hope to The Rise of Skywalker. Track your progress through all the movies and Disney+ shows.',
        coverImage: '/images/star-wars/banner.webp',
        sections: STAR_WARS_SECTIONS
    }
]; 