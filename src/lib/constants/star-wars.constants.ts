import type { MediaSection } from "../types/media.types";

// Based on: https://www.starwars.com/news/star-wars-movies-and-series-guide
export const STAR_WARS_SECTIONS: MediaSection[] = [
  {
    name: "Star Wars",
    media: [
      {
        id: 'the-acolyte',
        name: 'The Acolyte',
        image: '/images/star-wars/star-wars/acolyte.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'the-phantom-menace',
        name: 'The Phantom Menace',
        subLine: 'Episode I',
        image: '/images/star-wars/star-wars/phantom-menace.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'attack-of-the-clones',
        name: 'Attack of the Clones',
        subLine: 'Episode II',
        image: '/images/star-wars/star-wars/attack-of-the-clones.webp',
        watched: false,
        comicSize: 'two-thirds'
      },
      {
        id: 'the-clone-wars-movie',
        name: 'The Clone Wars',
        subLine: 'Movie',
        image: '/images/star-wars/star-wars/clone-wars-movie.webp',
        watched: false,
        comicSize: 'third'
      },
      {
        id: 'the-clone-wars-series',
        name: 'The Clone Wars',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/clone-wars-series.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'the-tales-of-the-jedi',
        name: 'The Tales of the Jedi',
        subLine: 'Anthology, spans over multiple movies/series',
        image: '/images/star-wars/star-wars/tales-of-the-jedi.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'revenge-of-the-sith',
        name: 'Revenge of the Sith',
        subLine: 'Episode III',
        image: '/images/star-wars/star-wars/revenge-of-the-sith.webp',
        watched: false,
        comicSize: 'full'
      },
      {
        id: 'tales-of-the-empire',
        name: 'Tales of the Empire',
        subLine: 'Anthology, spans over multiple movies/series',
        image: '/images/star-wars/star-wars/tales-of-the-empire.webp',
        watched: false,
        comicSize: 'third'
      },
      {
        id: 'the-bad-batch',
        name: 'The Bad Batch',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/bad-batch.webp',
        watched: false,
        comicSize: 'two-thirds'
      },
      {
        id: 'solo',
        name: 'Solo: A Star Wars Story',
        subLine: 'Movie',
        image: '/images/star-wars/star-wars/solo.webp',
        watched: false,
        comicSize: 'full'
      },
      {
        id: 'obi-wan-kenobi',
        name: 'Obi-Wan Kenobi',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/obi-wan-kenobi.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'andor',
        name: 'Andor',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/andor.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'star-wars-rebels',
        name: 'Star Wars Rebels',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/rebels.webp',
        watched: false,
        comicSize: 'third'
      },
      {
        id: 'rogue-one',
        name: 'Rogue One: A Star Wars Story',
        subLine: 'Movie',
        image: '/images/star-wars/star-wars/rogue-one.webp',
        watched: false,
        comicSize: 'two-thirds'
      },
      {
        id: 'a-new-hope',
        name: 'A New Hope',
        subLine: 'Episode IV',
        image: '/images/star-wars/star-wars/a-new-hope.webp',
        watched: false,
        comicSize: 'full'
      },
      {
        id: 'the-empire-strikes-back',
        name: 'The Empire Strikes Back',
        subLine: 'Episode V',
        image: '/images/star-wars/star-wars/empire-strikes-back.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'return-of-the-jedi',
        name: 'Return of the Jedi',
        subLine: 'Episode VI',
        image: '/images/star-wars/star-wars/return-of-the-jedi.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'the-mandalorian',
        name: 'The Mandalorian',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/mandalorian.webp',
        watched: false,
        comicSize: 'two-thirds'
      },
      {
        id: 'the-book-of-boba-fett',
        name: 'The Book of Boba Fett',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/book-of-boba-fett.webp',
        watched: false,
        comicSize: 'third'
      },
      {
        id: 'ahsoka',
        name: 'Ahsoka',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/ahsoka.webp',
        watched: false,
        comicSize: 'full'
      },
      {
        id: 'skeleton-crew',
        name: 'Skeleton Crew',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/skeleton-crew.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'star-wars-resistance',
        name: 'Star Wars Resistance',
        subLine: 'Series',
        image: '/images/star-wars/star-wars/resistance.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'the-force-awakens',
        name: 'The Force Awakens',
        subLine: 'Episode VII',
        image: '/images/star-wars/star-wars/the-force-awakens.webp',
        watched: false,
        comicSize: 'full'
      },
      {
        id: 'the-last-jedi',
        name: 'The Last Jedi',
        subLine: 'Episode VIII',
        image: '/images/star-wars/star-wars/last-jedi.webp',
        watched: false,
        comicSize: 'half'
      },
      {
        id: 'the-rise-of-skywalker',
        name: 'The Rise of Skywalker',
        subLine: 'Episode IX',
        image: '/images/star-wars/star-wars/rise-of-skywalker.webp',
        watched: false,
        comicSize: 'half'
      }
    ]
  },
];


