import React, { useState, useRef } from 'react';
import { useCampus } from '../context/CampusContext';
import { StoryViewer } from './StoryViewer';
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  FileText as NotesIcon, 
  BarChart2 as PollIcon, 
  ChevronDown, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Send,
  Sparkles,
  CheckCircle2,
  X,
  Globe,
  Users
} from 'lucide-react';

export const Feed: React.FC = () => {
  const { 
    posts, 
    stories, 
    currentUser, 
    createPost, 
    createStory, 
    likePost, 
    savePost, 
    addComment,
    activeFilterTag,
    setActiveFilterTag
  } = useCampus();

  // Story state
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [storyChooserOpen, setStoryChooserOpen] = useState(false);

  // Post composer state
  const [postText, setPostText] = useState('');
  const [postVisibility, setPostVisibility] = useState<'College Public' | 'Friends Only'>('College Public');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [showPhotoTray, setShowPhotoTray] = useState(false);
  const [visibilityDropdownOpen, setVisibilityDropdownOpen] = useState(false);

  // Comments drawer tracking
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Media presets for easy mock interaction
  const photoPresets = [
    {
      id: 'preset-collegework',
      name: 'Team Workshop',
      thumb: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80',
      description: 'Collating code templates inside the modern library discussion bay.',
    },
    {
      id: 'preset-hackathon',
      name: 'Hackathon Hackers',
      thumb: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80',
      description: 'Burning the midnight fuel building react prototypes on an infinite grid.',
    },
    {
      id: 'preset-grad',
      name: 'Graduation Cap',
      thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=300&q=80',
      description: 'Hats off to the cohort of 2026! We did it! 🎓🌟',
    },
    {
      id: 'preset-campus-lawn',
      name: 'Central Courtyard',
      thumb: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80',
      description: 'Enjoying the spring breeze during classes in XYZ University lawn.',
    }
  ];

  const handlePostSubmit = () => {
    if (!postText.trim() && !attachedImage) return;
    createPost(postText, postVisibility, attachedImage || undefined);
    
    // Clear states
    setPostText('');
    setAttachedImage(null);
    setShowPhotoTray(false);
  };

  const handleCreateStorySelection = (image: string) => {
    createStory(image);
    setStoryChooserOpen(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId] || '';
    if (!text.trim()) return;
    
    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Filter posts based on active trending tag
  const filteredPosts = activeFilterTag 
    ? posts.filter(p => p.text.toLowerCase().includes(activeFilterTag.toLowerCase()))
    : posts;

  return (
    <div className="flex-1 max-w-2xl px-4 py-4 space-y-6 select-text overflow-y-auto">
      
      {/* Search Header Info for Filter */}
      {activeFilterTag && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 animate-pulse-slow" />
            <p className="text-sm font-semibold text-slate-700">
              Filtering campus feed by <span className="text-blue-600 font-bold">{activeFilterTag}</span>
            </p>
          </div>
          <button 
            onClick={() => setActiveFilterTag(null)}
            className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Composer Grid: What's happening, Rohan? */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative">
        <div className="flex gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <textarea
              id="composer-textarea"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`What's happening, Rohan?`}
              rows={2}
              className="w-full text-slate-800 text-sm placeholder-slate-400 bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 focus:ring-0 rounded-2xl px-4 py-3 outline-none resize-none transition-all leading-relaxed"
            />
          </div>
        </div>

        {/* Attached image preview */}
        {attachedImage && (
          <div className="mt-3 relative inline-block rounded-xl overflow-hidden border border-slate-100 group max-w-sm">
            <img 
              src={attachedImage} 
              alt="Chosen preset" 
              className="max-h-48 object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={() => setAttachedImage(null)}
              className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Tray & Visibility Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          {/* Preset options */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[13px] font-semibold text-slate-500">
            <button 
              id="composer-btn-photo"
              onClick={() => setShowPhotoTray(!showPhotoTray)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border border-transparent transition-all cursor-pointer hover:bg-slate-50 hover:text-green-600 ${showPhotoTray ? 'bg-green-50 text-green-700' : ''}`}
            >
              <ImageIcon className="w-4.5 h-4.5 text-green-500" />
              <span className="hidden sm:inline">Photo</span>
            </button>
            <button 
              onClick={() => alert("Mock Video action triggered! In React static mode, choose standard Photo attachments to showcase live creations.")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-purple-600 transition-all cursor-pointer"
            >
              <VideoIcon className="w-4.5 h-4.5 text-purple-500" />
              <span className="hidden sm:inline">Video</span>
            </button>
            <button 
              onClick={() => setPostText("📊 CAMPUS NOTE:\nEverything is running perfectly on Campus Connect frontend today!\n")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-amber-500 transition-all cursor-pointer"
            >
              <NotesIcon className="w-4.5 h-4.5 text-amber-500" />
              <span className="hidden sm:inline">Notes</span>
            </button>
            <button 
              onClick={() => setPostText("POLL Question: Which technology stack is best for full-stack university applets?\n[ ] Vite + React (SPA)\n[ ] Next.js (SSR)\n[ ] Express + Node.js (Unified)")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-blue-500 transition-all cursor-pointer"
            >
              <PollIcon className="w-4.5 h-4.5 text-blue-500" />
              <span className="hidden sm:inline">Poll</span>
            </button>
          </div>

          {/* Visibility and Post CTA */}
          <div className="flex items-center gap-2">
            
            {/* Visibility Settings Pill with Toggle */}
            <div className="relative">
              <button 
                onClick={() => setVisibilityDropdownOpen(!visibilityDropdownOpen)}
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
              >
                {postVisibility === 'College Public' ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <Users className="w-3.5 h-3.5 text-emerald-500" />}
                <span>{postVisibility}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {visibilityDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-2xl p-2 border border-slate-100 shadow-xl z-30 w-44">
                  <button 
                    onClick={() => { setPostVisibility('College Public'); setVisibilityDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <Globe className="w-4 h-4 text-blue-500" />
                    <div>
                      <p>College Public</p>
                      <p className="text-[9px] text-slate-400 font-normal">Visible to anyone in university</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setPostVisibility('Friends Only'); setVisibilityDropdownOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors mt-1"
                  >
                    <Users className="w-4 h-4 text-emerald-500" />
                    <div>
                      <p>Friends Only</p>
                      <p className="text-[9px] text-slate-400 font-normal">Only visible to connected mutuals</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button 
              id="composer-btn-post"
              onClick={handlePostSubmit}
              disabled={!postText.trim() && !attachedImage}
              className={`bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl px-5 py-2 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer`}
            >
              Post
            </button>
          </div>
        </div>

        {/* Photo preset attachments tray */}
        {showPhotoTray && (
          <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-slate-500 tracking-wider">CHOOSE A CAMPUS PHOTOGRAPH PRESET:</span>
              <button onClick={() => setShowPhotoTray(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {photoPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setAttachedImage(preset.thumb);
                    if (!postText) setPostText(preset.description);
                  }}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${attachedImage === preset.thumb ? 'border-blue-600 ring-2 ring-blue-100 shadow-sm' : 'border-transparent'}`}
                >
                  <img 
                    src={preset.thumb} 
                    alt={preset.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 p-1.5 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-bold">{preset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stories horizontal layout */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none select-none">
          {/* Create Story card */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <button
              id="create-story-trigger"
              onClick={() => setStoryChooserOpen(true)}
              className="w-18 h-18 rounded-3xl bg-white border border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:border-blue-500 hover:bg-slate-50 group transition-all"
            >
              <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                +
              </div>
            </button>
            <span className="text-xs font-bold text-slate-800 mt-2">Create Story</span>
            <span className="text-[9px] text-slate-400 font-semibold mt-0.5 leading-none">Share Memory</span>
          </div>

          {/* Map Stories */}
          {stories.map((story, idx) => (
            <div 
              key={story.id} 
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedStoryIndex(idx)}
            >
              <div className="relative w-18 h-18 rounded-3xl overflow-hidden ring-3 ring-blue-500 ring-offset-2 scale-98 active:scale-95 transition-transform shadow-md">
                {story.imageUrl && (
                  <img 
                    src={story.imageUrl} 
                    alt={story.userName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {/* Visual blur overlay with absolute bottom user avatar */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-between p-2">
                  <img 
                    src={story.userAvatar} 
                    alt="Author" 
                    className="w-5.5 h-5.5 rounded-full object-cover ring-2 ring-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-white font-bold text-[9px] truncate drop-shadow-md text-center max-w-full block">
                    {story.userName}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 mt-2 leading-none">{story.timeAgo}</span>
            </div>
          ))}
        </div>

        {/* Story Asset Selector Trigger Modal card */}
        {storyChooserOpen && (
          <div className="absolute z-40 left-0 top-full mt-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-2xl max-w-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-slate-500">PICK A PHOTO FOR STORIES:</span>
              <button onClick={() => setStoryChooserOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {photoPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleCreateStorySelection(preset.thumb)}
                  className="relative h-20 rounded-xl overflow-hidden border border-slate-100 cursor-pointer group"
                >
                  <img 
                    src={preset.thumb} 
                    alt="Story thumb" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 p-1.5 flex items-end justify-center">
                    <span className="text-[9px] text-white font-bold">{preset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feed post list */}
      <div className="space-y-6">
        {filteredPosts.map((post) => {
          const isCommentsOpen = openCommentsPostId === post.id;
          const userHasLiked = post.likedByUser;
          const userHasSaved = post.savedByUser;

          return (
            <article 
              key={post.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    {post.author.name === 'Rohan Mehta' && (
                      <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-none">
                        {post.author.name}
                      </h3>
                      {post.author.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" strokeWidth={2.5} />
                      )}
                    </div>
                    
                    {/* Role & Visibility details line */}
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mt-1 leading-none">
                      <span>{post.author.role}</span>
                      <span>•</span>
                      <span>{post.timeStamp}</span>
                      <span>•</span>
                      
                      <span className="flex items-center gap-0.5" title={post.visibility}>
                        {post.visibility === 'College Public' ? 'College Public' : 'Friends Only'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overflow three-dot options menu */}
                <button className="text-slate-400 hover:text-slate-600 p-2.5 rounded-full hover:bg-slate-50 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
              </div>

              {/* Post Body text */}
              <div className="px-4 pb-3">
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line select-text">
                  {post.text}
                </p>
              </div>

              {/* Rendering Post Images Grid as asymmetrical composite layouts */}
              {post.images && post.images.length > 0 && (
                <div className="px-4 pb-4">
                  {post.images[0] === 'BANNER_IMAGE_TCS_MARKER' ? (
                    
                    /* Custom beautiful full-grid corporate advertisement flyer */
                    <div className="h-68 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl overflow-hidden shadow-inner border border-slate-800 relative flex items-center">
                      {/* Industrial tech building pattern inside background */}
                      <div className="absolute inset-y-0 right-0 w-1/2 opacity-70">
                        <img 
                          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" 
                          alt="TCS tech hub glass office" 
                          className="w-full h-full object-cover object-left"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950,via-slate-950/20 to-transparent" />
                      </div>

                      {/* Content parameters */}
                      <div className="relative z-10 p-6 flex flex-col justify-between h-full w-3/5 text-white">
                        <div>
                          {/* Corporate Tag */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-widest uppercase">
                              TCS CAREERS
                            </span>
                            <span className="text-[11px] text-blue-300 font-bold tracking-wider">OFFICIAL RECRUITMENT</span>
                          </div>
                          
                          <h2 className="text-2xl font-black font-display tracking-tight text-white leading-tight uppercase">
                            TCS IS HIRING <span className="text-blue-400">INTERNS</span>
                          </h2>
                          <p className="text-xs text-slate-300 mt-1.5 font-semibold">
                            Batch 2025 • Full Semester Engineering Residency Program
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold text-slate-400">APPLY AT:</p>
                          <p className="text-xs font-bold text-blue-400">tcs.com/careers</p>
                        </div>

                        <div className="mt-2.5">
                          <button 
                            onClick={() => alert("Mock Application submitted! Good luck for checking your university placement index.")}
                            className="bg-white text-blue-950 hover:bg-slate-100 font-extrabold text-xs px-5 py-2 rounded-xl transition-all uppercase tracking-wider shadow-sm active:scale-95"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>

                      {/* Small floating branding insignia */}
                      <div className="absolute bottom-5 right-5 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-white/10 flex items-center justify-center">
                        <span className="text-blue-400 text-[10px] font-black tracking-widest">tcs</span>
                      </div>
                    </div>

                  ) : post.images.length === 3 ? (
                    
                    /* EXACT screenshot asymmetrical layout (col-span-3 and dual col-span-2) */
                    <div className="grid grid-cols-5 gap-2 h-72 rounded-2xl overflow-hidden shadow-inner bg-slate-50 border border-slate-100">
                      {/* Left large photo */}
                      <div className="col-span-3 h-full relative group">
                        <img 
                          src={post.images[0]} 
                          alt="Campus feed" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Right column of stacked photos */}
                      <div className="col-span-2 flex flex-col gap-2 h-full">
                        <div className="h-[calc(50%-0.25rem)] relative group">
                          <img 
                            src={post.images[1]} 
                            alt="Campus feed item 2" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="h-[calc(50%-0.25rem)] relative group">
                          <img 
                            src={post.images[2]} 
                            alt="Campus feed item 3" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>

                  ) : (
                    /* Default single/other layout */
                    <div className="rounded-2xl overflow-hidden max-h-96 border border-slate-100 shadow-inner bg-slate-50">
                      <img 
                        src={post.images[0]} 
                        alt="Campus feed photo single" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Post Stats (likes, comments, share counter indicators) */}
              <div className="px-4 pb-3 flex items-center justify-between border-b border-slate-50 text-[12px] font-semibold text-slate-500">
                {/* Micro avatar stacks & like names */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {/* overlapping circles of thumbs up emoji reaction badges */}
                    <div className="flex items-center -space-x-1 z-10">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] border border-white">
                        👍
                      </span>
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] border border-white">
                        ❤️
                      </span>
                      <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] border border-white">
                        😆
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-600">
                    {userHasLiked 
                      ? `You, Priya and ${post.likesCount - 2} others` 
                      : `${post.likesCount} student connections`
                    }
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.commentsCount} comments
                  </button>
                  {post.sharesCount ? <span>• {post.sharesCount} shares</span> : null}
                </div>
              </div>

              {/* Feed CTAs: Like, Comment, Share, Save */}
              <div className="px-2 py-1 flex items-center justify-between text-slate-500 text-xs font-bold font-sans">
                <button 
                  onClick={() => likePost(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all cursor-pointer ${userHasLiked ? 'text-blue-600 bg-blue-50/50' : 'hover:bg-slate-50 hover:text-slate-800'}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${userHasLiked ? 'fill-blue-500 stroke-blue-600' : ''}`} />
                  <span>Like</span>
                </button>
                <button 
                  onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all cursor-pointer ${isCommentsOpen ? 'text-blue-600 bg-blue-50/50' : 'hover:bg-slate-50 hover:text-slate-800'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Comment</span>
                </button>
                <button 
                  onClick={() => alert(`Direct share link copied: https://campusconnect.edu/${post.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button 
                  onClick={() => savePost(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all cursor-pointer ${userHasSaved ? 'text-blue-600 bg-blue-50/50' : 'hover:bg-slate-50 hover:text-slate-800'}`}
                >
                  <Bookmark className={`w-4 h-4 ${userHasSaved ? 'fill-blue-500 stroke-blue-600' : ''}`} />
                  <span>Save</span>
                </button>
              </div>

              {/* Comments drawer */}
              {isCommentsOpen && (
                <div className="border-t border-slate-50 bg-slate-50/50 p-4 space-y-3.5">
                  {/* List comments */}
                  {post.comments.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2.5 items-start">
                          <img 
                            src={comment.authorAvatar} 
                            alt={comment.authorName} 
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-custom text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{comment.authorName}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{comment.timeLabel}</span>
                            </div>
                            <p className="text-slate-600 mt-1 leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-2">No comments yet. Start the conversation!</p>
                  )}

                  {/* Input form */}
                  <div className="flex gap-2.5 items-center">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex items-center bg-white rounded-xl border border-slate-200 px-3 py-1 text-xs">
                      <input
                        type="text"
                        placeholder="Join classroom conversation..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCommentSubmit(post.id);
                        }}
                        className="flex-1 bg-transparent py-1.5 focus:ring-0 outline-none placeholder-slate-400 text-slate-700 font-medium"
                      />
                      <button 
                        onClick={() => handleCommentSubmit(post.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Main Single-screen StoryViewer Overlay anchor */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          isOpen={selectedStoryIndex !== null}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}
    </div>
  );
};
