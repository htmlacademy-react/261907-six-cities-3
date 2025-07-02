import {Review} from '../types/review';

const reviews: Review[] = [
  {
    id: '0',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
      isPro: false
    },
    comment:'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: '1',
    date: '2025-04-20T15:05:01.569Z',
    user: {
      name: 'Number One',
      avatarUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png',
      isPro: true
    },
    comment:'Horrible!',
    rating: 1
  }
];

export {reviews};
