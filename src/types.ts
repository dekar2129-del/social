export interface Author {
  name: string;
  role: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timeLabel: string;
}

export interface Post {
  id: string;
  author: Author;
  timeStamp: string;
  visibility: 'College Public' | 'Friends Only';
  text: string;
  images?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount?: number;
  likedByUser: boolean;
  savedByUser: boolean;
  comments: Comment[];
}

export interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  imageUrl?: string;
  timeAgo: string;
  isCreate?: boolean;
  viewed: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  location: string;
  dateMonth: string;
  dateDay: string;
  timeLabel: string;
  isFavorite: boolean;
}

export interface PeopleSuggestion {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'idle' | 'requested' | 'friends';
}

export interface TrendingTag {
  id: string;
  tag: string;
  postsCount: string;
}
