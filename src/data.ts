import { Post, Story, CampusEvent, PeopleSuggestion, TrendingTag } from './types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 's-techfest',
    userName: 'Tech Fest',
    userAvatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=300&h=450&q=80',
    timeAgo: '2h ago',
    viewed: false,
  },
  {
    id: 's-csedept',
    userName: 'CSE Dept',
    userAvatar: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&h=450&q=80',
    timeAgo: '5h ago',
    viewed: false,
  },
  {
    id: 's-musicclub',
    userName: 'Music Club',
    userAvatar: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&h=450&q=80',
    timeAgo: '12h ago',
    viewed: false,
  },
  {
    id: 's-alumni',
    userName: 'Alumni Meet',
    userAvatar: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&h=450&q=80',
    timeAgo: '1d ago',
    viewed: false,
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      name: 'Rahul Sharma',
      role: 'CSE • 2023',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    timeStamp: '2h ago',
    visibility: 'College Public',
    text: 'Amazing vibes at the Freshers Party 2024! 🥳 Grateful to be a part of this wonderful journey. ❤️',
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', // Vertical stage concert lights
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', // People laughing/posing
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80', // Red/purple purple lights and confetti crowd
    ],
    likesCount: 120, // Rohan + Priya + 118 others = 120
    commentsCount: 18,
    sharesCount: 5,
    likedByUser: true,
    savedByUser: false,
    comments: [
      {
        id: 'c1',
        authorName: 'Priya Nair',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        text: 'The stage lights were absolutely incredible! Best party yet.',
        timeLabel: '1h ago',
      },
      {
        id: 'c2',
        authorName: 'Karan Verma',
        authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        text: 'Wish I did not miss this! Group photo looks top tier.',
        timeLabel: '45m ago',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Placement Cell',
      role: 'Official',
      avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
      isVerified: true,
    },
    timeStamp: '4h ago',
    visibility: 'College Public',
    text: 'TCS is hiring Interns for 2025 batch! Apply now and take the next step in your career. 🚀',
    images: [
      'BANNER_IMAGE_TCS_MARKER', // We will render a beautifully programmed TCS banner or a specific rich CSS styled component / custom generated image.
    ],
    likesCount: 257, // Rohan + 256 others = 257
    commentsCount: 32,
    sharesCount: 45,
    likedByUser: true,
    savedByUser: true,
    comments: [
      {
        id: 'c3',
        authorName: 'Sneha Rao',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        text: 'Is this open to ECE students as well? Please clarify.',
        timeLabel: '3h ago',
      },
      {
        id: 'c4',
        authorName: 'Placement Cell',
        authorAvatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
        text: 'Yes! All CSE, IT, ECE, & EEE branches with CGPA > 7.0 can apply.',
        timeLabel: '2h ago',
      },
    ],
  },
  {
    id: 'post-3',
    author: {
      name: 'Ananya Singh',
      role: 'Alumni • Batch 2019',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
    timeStamp: '6h ago',
    visibility: 'Friends Only',
    text: 'Excited to announce that I have joined Google as a Product Manager! ✨ Dreams do come true. Keep pushing! 💪',
    likesCount: 412,
    commentsCount: 54,
    sharesCount: 16,
    likedByUser: false,
    savedByUser: false,
    comments: [
      {
        id: 'c5',
        authorName: 'Amit Shah',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        text: 'Woah Ananya! Huge congratulations! Super deserved.',
        timeLabel: '5h ago',
      },
    ],
  },
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'Tech Fest 2024',
    location: 'Main Auditorium',
    dateMonth: 'MAY',
    dateDay: '24',
    timeLabel: '10:00 AM',
    isFavorite: true,
  },
  {
    id: 'ev-2',
    title: 'Alumni Meet',
    location: 'University Lawn',
    dateMonth: 'MAY',
    dateDay: '28',
    timeLabel: '04:00 PM',
    isFavorite: false,
  },
  {
    id: 'ev-3',
    title: 'Web Development Workshop',
    location: 'CSE Seminar Hall',
    dateMonth: 'JUN',
    dateDay: '05',
    timeLabel: '11:00 AM',
    isFavorite: false,
  },
];

export const INITIAL_SUGGESTIONS: PeopleSuggestion[] = [
  {
    id: 'sug-1',
    name: 'Priya Nair',
    role: 'CSE • 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    status: 'idle',
  },
  {
    id: 'sug-2',
    name: 'Karan Verma',
    role: 'IT • 2024',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    status: 'idle',
  },
  {
    id: 'sug-3',
    name: 'Mehak Gupta',
    role: 'ECE • 2023',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    status: 'idle',
  },
];

export const INITIAL_TRENDING: TrendingTag[] = [
  { id: 't-1', tag: '#FreshersParty2024', postsCount: '245 posts' },
  { id: 't-2', tag: '#TechFest2024', postsCount: '132 posts' },
  { id: 't-3', tag: '#PlacementDrive', postsCount: '98 posts' },
  { id: 't-4', tag: '#CSELife', postsCount: '76 posts' },
];
