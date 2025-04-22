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
    sections: MCU_PHASES,
    sources: [
      {
        name: 'Digital Spy',
        url: 'https://www.digitalspy.com/movies/a825774/marvel-cinematic-universe-in-chronological-order/#mcu-timeline-how-to-watch-the-mcu-in-chronological-order'
      }
    ]
  },
  {
    key: 'dceu',
    name: 'DC Extended Universe',
    description: 'Keep track of all the movies that are part of the DC Extended Universe. Most of them are available on HBO Max.',
    coverImage: '/images/dceu/banner.webp',
    sections: DCEU_MOVIES,
    sources: [
      {
        name: 'Odeon',
        url: 'https://www.odeon.co.uk/odeon-scene/dceu-movies-in-order/'
      }
    ]
  },
  {
    key: 'star-wars',
    name: 'Star Wars',
    description: 'Follow the epic saga of the Star Wars franchise from A New Hope to The Rise of Skywalker. Track your progress through all the movies and Disney+ shows.',
    coverImage: '/images/star-wars/banner.webp',
    sections: STAR_WARS_SECTIONS,
    sources: [
      {
        name: 'Star Wars',
        url: 'https://www.starwars.com/news/star-wars-movies-and-series-guide'
      }
    ]
  }
]; 