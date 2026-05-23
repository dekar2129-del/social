import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Story, CampusEvent, PeopleSuggestion, TrendingTag, Comment } from '../types';
import { INITIAL_POSTS, INITIAL_STORIES, INITIAL_EVENTS, INITIAL_SUGGESTIONS, INITIAL_TRENDING } from '../data';

interface CampusContextType {
  posts: Post[];
  stories: Story[];
  events: CampusEvent[];
  suggestions: PeopleSuggestion[];
  trendingTags: TrendingTag[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilterTag: string | null;
  setActiveFilterTag: (tag: string | null) => void;
  currentUser: {
    name: string;
    role: string;
    avatar: string;
  };
  createPost: (text: string, visibility: 'College Public' | 'Friends Only', image?: string) => void;
  createStory: (imageUrl: string) => void;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  handleSuggestAction: (id: string, action: 'add' | 'dismiss') => void;
  toggleFavoriteEvent: (id: string) => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [suggestions, setSuggestions] = useState<PeopleSuggestion[]>(INITIAL_SUGGESTIONS);
  const [trendingTags] = useState<TrendingTag[]>(INITIAL_TRENDING);
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);

  const currentUser = {
    name: 'Rohan Mehta',
    role: 'CSE • 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  };

  const createPost = (text: string, visibility: 'College Public' | 'Friends Only', image?: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: currentUser.name,
        role: currentUser.role,
        avatar: currentUser.avatar,
      },
      timeStamp: 'Just now',
      visibility,
      text,
      images: image ? [image] : undefined,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      likedByUser: false,
      savedByUser: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  const createStory = (imageUrl: string) => {
    const newStory: Story = {
      id: `story-${Date.now()}`,
      userName: 'Your Story',
      userAvatar: currentUser.avatar,
      imageUrl,
      timeAgo: 'Just now',
      viewed: false,
    };
    setStories([newStory, ...stories]);
  };

  const likePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newLiked = !post.likedByUser;
          return {
            ...post,
            likedByUser: newLiked,
            likesCount: post.likesCount + (newLiked ? 1 : -1),
          };
        }
        return post;
      })
    );
  };

  const savePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            savedByUser: !post.savedByUser,
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      text: commentText,
      timeLabel: 'Just now',
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  const handleSuggestAction = (id: string, action: 'add' | 'dismiss') => {
    if (action === 'dismiss') {
      setSuggestions(prev => prev.filter(s => s.id !== id));
    } else {
      setSuggestions(prev =>
        prev.map(s => {
          if (s.id === id) {
            const nextStatus = s.status === 'idle' ? 'requested' : s.status === 'requested' ? 'friends' : 'idle';
            return { ...s, status: nextStatus };
          }
          return s;
        })
      );
    }
  };

  const toggleFavoriteEvent = (id: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === id) {
          return { ...ev, isFavorite: !ev.isFavorite };
        }
        return ev;
      })
    );
  };

  return (
    <CampusContext.Provider
      value={{
        posts,
        stories,
        events,
        suggestions,
        trendingTags,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        activeFilterTag,
        setActiveFilterTag,
        currentUser,
        createPost,
        createStory,
        likePost,
        savePost,
        addComment,
        handleSuggestAction,
        toggleFavoriteEvent,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
