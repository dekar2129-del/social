import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Menu, 
  ChevronDown, 
  Search, 
  Bell, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Bookmark,
  Home,
  Compass,
  PlusCircle,
  Users,
  CheckCircle2,
  Calendar,
  Grid,
  MapPin,
  Settings,
  X
} from 'lucide-react';

export const MobileFrame: React.FC = () => {
  const { 
    posts, 
    stories, 
    likePost, 
    savePost, 
    addComment,
    currentUser,
    events,
    suggestions 
  } = useCampus();

  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'explore' | 'friends' | 'profile'>('home');
  const [mobileCommentPostId, setMobileCommentPostId] = useState<string | null>(null);
  const [mobileCommentText, setMobileCommentText] = useState('');

  // Local mobile post draft state when clicking the "+" button
  const [isMobileComposerOpen, setIsMobileComposerOpen] = useState(false);
  const [mobileComposerText, setMobileComposerText] = useState('');

  const handleMobileSubmitPost = () => {
    if (!mobileComposerText.trim()) return;
    
    // Simulate uploading from mobile
    const { createPost } = useCampus();
    // Since createPost is in context, call it directly:
    // Simply submit to standard feed
    alert("Mobile draft injected into unified campus feed!");
    setMobileComposerText('');
    setIsMobileComposerOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 xl:p-4">
      <div className="relative w-[345px] h-[720px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl shadow-slate-900 border-4 border-slate-800 ring-15 ring-slate-900/10 flex flex-col overflow-hidden">
        
        {/* Physical notch / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-40 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 bg-black rounded-full ring-1 ring-slate-900" />
          <div className="w-11 h-1 bg-neutral-900 rounded-full" />
        </div>

        {/* Operating System Status bar */}
        <div className="h-7 px-5 flex items-center justify-between text-black text-xs font-bold leading-none select-none z-30 bg-slate-50 border-b border-slate-100 rounded-t-[32px] pt-1">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Cell signal lines */}
            <div className="flex items-end gap-0.5 h-2.5">
              <div className="w-0.5 h-0.8 bg-black rounded-[1px]" />
              <div className="w-0.5 h-1.2 bg-black rounded-[1px]" />
              <div className="w-0.5 h-1.6 bg-black rounded-[1px]" />
              <div className="w-0.5 h-2 bg-black rounded-[1px]" />
            </div>
            {/* Wifi arcs */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {/* Battery contour */}
            <div className="w-5.5 h-2.8 border border-black rounded-sm p-0.5 flex">
              <div className="h-full w-4/5 bg-black rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Main interactive viewport */}
        <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative font-sans text-slate-800">
          
          {/* Viewport content rendering based on active internal mobile screen tab */}
          {activeMobileTab === 'home' && (
            <>
              {/* Desktop App Header replica inside mobile */}
              <header className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20 shadow-xs">
                <div className="flex items-center gap-2">
                  <button className="text-slate-600 p-1 rounded-lg hover:bg-slate-50">
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs font-black tracking-tight text-slate-900 uppercase">XYZ Uni</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button className="text-slate-500 p-1 rounded-full hover:bg-slate-100">
                    <Search className="w-4.5 h-4.5" />
                  </button>
                  <div className="relative">
                    <button className="text-slate-500 p-1 rounded-full hover:bg-slate-100">
                      <Bell className="w-4.5 h-4.5" />
                    </button>
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 text-[6px] font-black text-white rounded-full flex items-center justify-center">1</span>
                  </div>
                </div>
              </header>

              {/* Scrollable Mobile App Area */}
              <div className="flex-1 overflow-y-auto space-y-4 p-3 pb-16 scrollbar-none">
                
                {/* 1. Miniature Stories strip */}
                <div className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-2xs">
                  <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-0.5 flex-nowrap">
                    {/* Your story trigger */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-100">
                        <img 
                          src={currentUser.avatar} 
                          alt="Create story" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-blue-600/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-base font-extrabold leading-none">+</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1">Your Story</span>
                    </div>

                    {/* Standard mapped stories */}
                    {stories.map((st) => (
                      <div key={st.id} className="flex flex-col items-center flex-shrink-0">
                        <div className="w-12 h-12 rounded-full ring-2 ring-blue-500 p-0.5 scale-95 overflow-hidden object-cover bg-white">
                          <img 
                            src={st.userAvatar} 
                            alt={st.userName} 
                            className="w-full h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 mt-1 max-w-[50px] truncate leading-none text-center">
                          {st.userName.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Miniature Composer entry indicator */}
                <div 
                  onClick={() => setIsMobileComposerOpen(true)}
                  className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8.5 h-8.5 rounded-full object-cover ring-2 ring-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 bg-slate-50 rounded-xl px-3.5 py-2 text-[11px] text-slate-400 font-semibold border border-transparent">
                    What's happening? Compose on mobile...
                  </div>
                </div>

                {/* 3. Streamlined Mobile Feeds */}
                <div className="space-y-3.5">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs">
                      {/* Post mini header */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-[11px] font-black text-slate-800 leading-none">{post.author.name}</h4>
                            {post.author.isVerified && <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500/10" />}
                          </div>
                          <p className="text-[9px] text-slate-400 mt-0.5 leading-none">{post.author.role} • {post.timeStamp}</p>
                        </div>
                      </div>

                      {/* Post body snippet */}
                      <p className="text-[11.5px] text-slate-600 leading-relaxed mb-2 pb-0.5 whitespace-pre-line truncate-3-lines">
                        {post.text}
                      </p>

                      {/* Render one tiny post image for speed */}
                      {post.images && post.images.length > 0 && (
                        <div className="rounded-xl overflow-hidden max-h-40 mb-2.5 bg-slate-50 border border-slate-100 shadow-2xs relative">
                          {post.images[0] === 'BANNER_IMAGE_TCS_MARKER' ? (
                            <div className="w-full h-24 bg-gradient-to-tr from-slate-900 to-indigo-950 p-2.5 flex flex-col justify-between">
                              <span className="text-white text-[9px] font-extrabold tracking-wider uppercase bg-blue-600 px-1.5 py-0.5 rounded self-start">TCS CAREERS</span>
                              <h5 className="text-xs font-black text-white leading-tight uppercase">TCS IS HIRING INTERNS</h5>
                              <span className="text-[9px] text-blue-400 font-bold">tcs.com/careers</span>
                            </div>
                          ) : (
                            <img 
                              src={post.images[0]} 
                              alt="Feed display" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                      )}

                      {/* Overlapping small like indicators */}
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-b border-slate-50 pb-2 mb-2">
                        <span className="text-blue-600">👍 {post.likesCount} student likes</span>
                        <span>{post.commentsCount} comments</span>
                      </div>

                      {/* Quick tactile triggers */}
                      <div className="flex items-center justify-around text-slate-500 font-extrabold text-[10.5px]">
                        <button 
                          onClick={() => likePost(post.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${post.likedByUser ? 'text-blue-600 bg-blue-50' : ''}`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Like</span>
                        </button>
                        <button 
                          onClick={() => setMobileCommentPostId(mobileCommentPostId === post.id ? null : post.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-50"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Comment</span>
                        </button>
                        <button 
                          onClick={() => savePost(post.id)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${post.savedByUser ? 'text-blue-600 bg-blue-50' : ''}`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Miniature comment pop-up section */}
                      {mobileCommentPostId === post.id && (
                        <div className="mt-2.5 pt-2 border-t border-slate-50 bg-slate-50 rounded-xl p-2.5 space-y-2">
                          {post.comments.slice(0, 1).map((comm) => (
                            <div key={comm.id} className="text-[10px] leading-relaxed flex gap-1.5 items-start">
                              <span className="font-extrabold text-slate-800">{comm.authorName}:</span>
                              <span className="text-slate-500">{comm.text}</span>
                            </div>
                          ))}
                          <div className="flex items-center bg-white rounded-lg border border-slate-200 px-2 py-0.5">
                            <input 
                              type="text" 
                              placeholder="Add comment..."
                              value={mobileCommentText}
                              onChange={(e) => setMobileCommentText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  addComment(post.id, mobileCommentText);
                                  setMobileCommentText('');
                                  setMobileCommentPostId(null);
                                }
                              }}
                              className="text-[10px] flex-1 outline-none py-1 text-slate-700"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeMobileTab === 'explore' && (
            <div className="flex-1 p-3.5 space-y-4 overflow-y-auto scrollbar-none pb-16">
              <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase">Active University Events</h3>
              <div className="space-y-2.5">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex flex-col items-center justify-center p-1 text-[9px] font-bold text-red-600">
                      <span>{ev.dateMonth}</span>
                      <span className="text-sm -mt-1 font-extrabold text-red-700">{ev.dateDay}</span>
                    </div>
                    <div>
                      <h4 className="text-[11.5px] font-extrabold text-slate-800">{ev.title}</h4>
                      <p className="text-[9px] text-slate-400">{ev.location} • {ev.timeLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMobileTab === 'friends' && (
            <div className="flex-1 p-3.5 space-y-4 overflow-y-auto scrollbar-none pb-16">
              <h3 className="text-xs font-black text-slate-400 tracking-wider uppercase">Find Active Classmates</h3>
              <div className="space-y-2.5">
                {suggestions.map((sug) => (
                  <div key={sug.id} className="bg-white p-2 text-xs rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={sug.avatar} className="w-8.5 h-8.5 rounded-full object-cover" alt="Avatar" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-extrabold text-slate-800 leading-none">{sug.name}</h4>
                        <span className="text-[9px] text-slate-400">{sug.role}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Add</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMobileTab === 'profile' && (
            <div className="flex-1 overflow-y-auto scrollbar-none pb-16">
              {/* Cover Banner */}
              <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-700 relative" />
              <div className="px-4 text-center pb-4 -mt-8 relative z-10">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-18 h-18 rounded-full border-4 border-white mx-auto object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-sm font-extrabold text-slate-800 mt-2">{currentUser.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">COMPUTERS • SENIOR BATCH 2024</p>
                
                {/* Micro indicators */}
                <div className="grid grid-cols-3 gap-2 mt-4 bg-white p-2.5 rounded-xl border border-slate-100">
                  <div className="text-center">
                    <p className="text-[13px] font-black text-blue-600">218</p>
                    <p className="text-[8.5px] font-extrabold text-slate-400">Classmates</p>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <p className="text-[13px] font-black text-amber-500">14</p>
                    <p className="text-[8.5px] font-extrabold text-slate-400">Feed Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-black text-emerald-500">6</p>
                    <p className="text-[8.5px] font-extrabold text-slate-400">Events</p>
                  </div>
                </div>

                <div className="text-left mt-4 text-[10px] text-slate-500 space-y-2 leading-relaxed font-semibold bg-slate-50/50 p-3 rounded-xl">
                  <p className="flex items-center gap-1.5">👨‍💻 Major: Computer Science Engineering</p>
                  <p className="flex items-center gap-1.5">📍 Location: Central Campus, Bay 4</p>
                  <p className="flex items-center gap-1.5">📧 Email: rohan.met@xyz.edu</p>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Absolute Floating Mobile Draft Composer Overlay */}
          {isMobileComposerOpen && (
            <div className="absolute inset-0 bg-black/60 z-30 flex items-end">
              <div className="bg-white w-full rounded-t-2xl p-4 space-y-3.5 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-black text-slate-500">MOBILE POST DRAFT</span>
                  <button onClick={() => setIsMobileComposerOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <textarea 
                  rows={3}
                  value={mobileComposerText}
                  onChange={(e) => setMobileComposerText(e.target.value)}
                  placeholder="Share details on mobile..."
                  className="w-full text-xs text-slate-700 bg-slate-50 rounded-xl p-2.5 border border-slate-200 outline-none resize-none placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-0"
                />
                <button 
                  onClick={handleMobileSubmitPost}
                  disabled={!mobileComposerText.trim()}
                  className="w-full bg-blue-600 disabled:bg-slate-200 hover:bg-blue-700 disabled:text-slate-400 text-white font-extrabold text-xs py-2 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Post Draft
                </button>
              </div>
            </div>
          )}

          {/* Device Absolute Sticky Bottom Navigation Panel */}
          <nav className="absolute bottom-0 inset-x-0 h-[48px] bg-white border-t border-slate-200/80 z-20 flex items-center justify-around text-slate-400 pb-1.5 selection:bg-transparent">
            <button 
              onClick={() => { setActiveMobileTab('home'); setIsMobileComposerOpen(false); }}
              className={`flex flex-col items-center p-1.5 cursor-pointer hover:text-slate-800 ${activeMobileTab === 'home' ? 'text-blue-600' : ''}`}
            >
              <Home className="w-[19px] h-[19px]" />
              <span className="text-[7.5px] font-black leading-none mt-1">Home</span>
            </button>
            <button 
              onClick={() => { setActiveMobileTab('explore'); setIsMobileComposerOpen(false); }}
              className={`flex flex-col items-center p-1.5 cursor-pointer hover:text-slate-800 ${activeMobileTab === 'explore' ? 'text-blue-600' : ''}`}
            >
              <Compass className="w-[19px] h-[19px]" />
              <span className="text-[7.5px] font-black leading-none mt-1">Explore</span>
            </button>

            {/* Quick circular plus compose sign */}
            <button 
              onClick={() => setIsMobileComposerOpen(true)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold shadow-md hover:bg-blue-700 active:scale-95 transition-transform"
            >
              +
            </button>

            <button 
              onClick={() => { setActiveMobileTab('friends'); setIsMobileComposerOpen(false); }}
              className={`flex flex-col items-center p-1.5 cursor-pointer hover:text-slate-800 ${activeMobileTab === 'friends' ? 'text-blue-600' : ''}`}
            >
              <Users className="w-[19px] h-[19px]" />
              <span className="text-[7.5px] font-black leading-none mt-1">Friends</span>
            </button>
            <button 
              onClick={() => { setActiveMobileTab('profile'); setIsMobileComposerOpen(false); }}
              className={`flex flex-col items-center p-1.5 cursor-pointer hover:text-slate-800 ${activeMobileTab === 'profile' ? 'text-blue-600' : ''}`}
            >
              <img 
                src={currentUser.avatar} 
                className={`w-[19px] h-[19px] rounded-full object-cover border ${activeMobileTab === 'profile' ? 'border-blue-600 ring-1 ring-blue-100' : 'border-transparent'}`} 
                alt="Profile" 
                referrerPolicy="no-referrer"
              />
              <span className="text-[7.5px] font-black leading-none mt-1">Profile</span>
            </button>
          </nav>
        </div>

        {/* Physical Home Indicator bar */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white hover:bg-neutral-200 cursor-pointer rounded-full z-40 transition-colors" />
      </div>
    </div>
  );
};
