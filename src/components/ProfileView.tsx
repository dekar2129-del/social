import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Pencil, 
  MoreHorizontal, 
  GraduationCap, 
  MapPin as MapIcon, 
  Building, 
  Mail, 
  Phone, 
  Linkedin, 
  Compass, 
  Image as ImageIcon, 
  Users, 
  UserPlus,
  Bookmark, 
  Lock,
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Clock, 
  Check, 
  HelpCircle,
  Award,
  BookOpen,
  Sparkles,
  Search,
  CheckCircle,
  ExternalLink,
  Sliders,
  Bell,
  ChevronDown
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'about' | 'photos' | 'friends' | 'groups' | 'saved'>('timeline');
  const [likesState, setLikesState] = useState({
    post1: { count: 144, liked: true },
    post2: { count: 87, liked: true },
    post3: { count: 212, liked: true }
  });
  const [savedPosts, setSavedPosts] = useState({
    post1: false,
    post2: false,
    post3: false
  });
  const [postDraft, setPostDraft] = useState('');
  const [draftVisibility, setDraftVisibility] = useState('College Public');
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  // Toggle individual post like state
  const handleLike = (postId: 'post1' | 'post2' | 'post3', defaultString: string) => {
    setLikesState(prev => {
      const isLiked = !prev[postId].liked;
      const countDiff = isLiked ? 1 : -1;
      return {
        ...prev,
        [postId]: {
          liked: isLiked,
          count: prev[postId].count + countDiff
        }
      };
    });
  };

  const handleSave = (postId: 'post1' | 'post2' | 'post3') => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Add Comment simulator
  const [commentTextState, setCommentTextState] = useState({
    post1: '',
    post2: '',
    post3: ''
  });

  const [commentsListState, setCommentsListState] = useState({
    post1: [
      { id: 'c1', author: 'Priya Nair', text: 'The vibes were unreal! Best college festival yet.', time: '1h ago' },
      { id: 'c2', author: 'Karan Verma', text: 'Amazing captures! Looks top-tier.', time: '45m ago' }
    ],
    post2: [
      { id: 'c3', author: 'Amit Shah', text: 'Woah! Huge milestone, congrats!', time: 'Yesterday' }
    ],
    post3: [
      { id: 'c4', author: 'Ananya Singh', text: 'Super proud of this win! CSE supremacy!', time: '2d ago' }
    ]
  });

  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);

  const handleAddComment = (postId: 'post1' | 'post2' | 'post3') => {
    const text = commentTextState[postId];
    if (!text.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: 'You (Rahul Sharma)',
      text: text,
      time: 'Just now'
    };

    setCommentsListState(prev => ({
      ...prev,
      [postId]: [...prev[postId], newComment]
    }));

    setCommentTextState(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const renderPostById = (postId: 'post1' | 'post2' | 'post3') => {
    const isCommentsOpen = activeCommentsPostId === postId;
    const liked = likesState[postId].liked;
    const likesCount = likesState[postId].count;
    const commentsCount = commentsListState[postId].length;
    
    if (postId === 'post1') {
      return (
        <article key="post1" className="bg-white rounded-[24px] border border-slate-100 shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" 
                alt="Rahul Sharma" 
                className="w-9.5 h-9.5 rounded-full object-cover border border-slate-100"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight leading-none">Rahul Sharma</h3>
                  <div className="w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center scale-90">
                    <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1 shadow-2xs">
                  <span>2h ago</span>
                  <span>•</span>
                  <span className="text-blue-500 font-bold bg-blue-50 px-1.5 py-0.5 rounded-md text-[9px]">College Public</span>
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post text */}
          <div className="px-4 pb-3">
            <p className="text-slate-700 text-xs leading-relaxed">
              Amazing vibes at the Tech Fest 2024! 🎉 Grateful to be a part of this incredible journey.
            </p>
          </div>

          {/* Asymmetrical 3-Image Grid */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-5 gap-1.5 h-60 rounded-2xl overflow-hidden shadow-inner bg-slate-50 border border-slate-100">
              <div className="col-span-3 h-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80" 
                  alt="Stage Lights Concert" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5 h-full">
                <div className="h-[calc(50%-0.15rem)] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80" 
                    alt="Laughing Students" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="h-[calc(50%-0.15rem)] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&q=80" 
                    alt="Glowstick Crowd Party" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reaction counts */}
          <div className="px-4 pb-3 border-b border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-500 font-sans">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-1">
                <span className="w-4.5 h-4.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] border border-white">👍</span>
                <span className="w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] border border-white">❤️</span>
              </div>
              <span>You, Priya Nair and {likesCount - 2} others</span>
            </div>
            <button 
              onClick={() => setActiveCommentsPostId(isCommentsOpen ? null : 'post1')}
              className="hover:text-blue-600 transition-colors"
            >
              {commentsCount} comments
            </button>
          </div>

          {/* Core Action triggers */}
          <div className="px-2 py-1 flex items-center justify-between text-slate-500 text-xs font-bold font-sans">
            <button 
              onClick={() => handleLike('post1', 'Priya')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${liked ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              <span>Like</span>
            </button>
            <button 
              onClick={() => setActiveCommentsPostId(isCommentsOpen ? null : 'post1')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${isCommentsOpen ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Comment</span>
            </button>
            <button 
              onClick={() => alert("Copied direct link to clipboard!")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button 
              onClick={() => handleSave('post1')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${savedPosts.post1 ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Bookmark className={`w-4 h-4 ${savedPosts.post1 ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              <span>Save</span>
            </button>
          </div>

          {/* Comments Drawer Expansion */}
          {isCommentsOpen && (
            <div className="border-t border-slate-50 bg-slate-50/50 p-4 space-y-3">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {commentsListState.post1.map(cmt => (
                  <div key={cmt.id} className="text-xs flex gap-2.5 items-start">
                    <div className="w-7.5 h-7.5 rounded-full bg-slate-200 flex-shrink-0 text-slate-700 flex items-center justify-center font-extrabold border border-slate-200">
                      {cmt.author[0]}
                    </div>
                    <div className="flex-1 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-3xs">
                      <div className="flex justify-between font-extrabold text-slate-800">
                        <span>{cmt.author}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{cmt.time}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{cmt.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send action */}
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text" 
                  value={commentTextState.post1}
                  onChange={(e) => setCommentTextState(prev => ({ ...prev, post1: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment('post1')}
                  placeholder="Join the discussion thread..."
                  className="flex-1 bg-white border border-slate-200 outline-none rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
                />
                <button 
                  onClick={() => handleAddComment('post1')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </article>
      );
    }
    if (postId === 'post2') {
      return (
        <article key="post2" className="bg-white rounded-[24px] border border-slate-100 shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" 
                alt="Rahul Sharma" 
                className="w-9.5 h-9.5 rounded-full object-cover border border-slate-100"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight leading-none">Rahul Sharma</h3>
                  <div className="w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center scale-90">
                    <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1 shadow-2xs">
                  <span>Yesterday at 10:30 AM</span>
                  <span>•</span>
                  <span className="text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md text-[9px]">Friends Only</span>
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post text */}
          <div className="px-4 pb-3">
            <p className="text-slate-700 text-xs leading-relaxed">
              Finally completed my certification! ✅ On to the next milestone 🚀
            </p>
          </div>

          {/* Embedded Coursera certification card style */}
          <div className="px-4 pb-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 shadow-inner flex items-center gap-4 hover:border-blue-200 transition-colors duration-200 cursor-pointer select-none">
              <div className="w-[85px] h-12 bg-white rounded-lg overflow-hidden border border-slate-200 p-1.5 flex items-center justify-center shadow-2xs relative flex-shrink-0">
                <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[7px] text-white">★</div>
                  <span className="text-[8px] font-black text-slate-700 tracking-wider">Coursera</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 font-sans">
                <h4 className="text-xs font-black text-slate-800 leading-snug truncate">
                  Google Data Analytics Professional Certificate
                </h4>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                  Coursera • Google Professional Core Cohort
                </p>
              </div>
              
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            </div>
          </div>

          {/* Reaction counts */}
          <div className="px-4 pb-3 border-b border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-500 font-sans">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-1">
                <span className="w-4.5 h-4.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] border border-white">👍</span>
                <span className="w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] border border-white">❤️</span>
              </div>
              <span>You, Karan Verma and {likesCount - 2} others</span>
            </div>
            <button 
              onClick={() => setActiveCommentsPostId(isCommentsOpen ? null : 'post2')}
              className="hover:text-blue-600 transition-colors"
            >
              {commentsCount} comments
            </button>
          </div>

          {/* Core Action triggers */}
          <div className="px-2 py-1 flex items-center justify-between text-slate-500 text-xs font-bold font-sans">
            <button 
              onClick={() => handleLike('post2', 'Karan')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${liked ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              <span>Like</span>
            </button>
            <button 
              onClick={() => setActiveCommentsPostId(isCommentsOpen ? null : 'post2')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${isCommentsOpen ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Comment</span>
            </button>
            <button 
              onClick={() => alert("Copied direct link to clipboard!")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button 
              onClick={() => handleSave('post2')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${savedPosts.post2 ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Bookmark className={`w-4 h-4 ${savedPosts.post2 ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              <span>Save</span>
            </button>
          </div>

          {/* Comments Drawer Expansion */}
          {isCommentsOpen && (
            <div className="border-t border-slate-50 bg-slate-50/50 p-4 space-y-3">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {commentsListState.post2.map(cmt => (
                  <div key={cmt.id} className="text-xs flex gap-2.5 items-start">
                    <div className="w-7.5 h-7.5 rounded-full bg-slate-150 flex-shrink-0 text-slate-700 flex items-center justify-center font-extrabold border border-slate-200">
                      {cmt.author[0]}
                    </div>
                    <div className="flex-1 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-3xs">
                      <div className="flex justify-between font-extrabold text-slate-800">
                        <span>{cmt.author}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{cmt.time}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{cmt.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send action */}
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text" 
                  value={commentTextState.post2}
                  onChange={(e) => setCommentTextState(prev => ({ ...prev, post2: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment('post2')}
                  placeholder="Join the discussion thread..."
                  className="flex-1 bg-white border border-slate-200 outline-none rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
                />
                <button 
                  onClick={() => handleAddComment('post2')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </article>
      );
    }
    if (postId === 'post3') {
      return (
        <article key="post3" className="bg-white rounded-[24px] border border-slate-100 shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" 
                alt="Rahul Sharma" 
                className="w-9.5 h-9.5 rounded-full object-cover border border-slate-100"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-xs font-extrabold text-slate-800 tracking-tight leading-none">Rahul Sharma</h3>
                  <div className="w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center scale-90">
                    <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1 shadow-2xs">
                  <span>3 days ago</span>
                  <span>•</span>
                  <span className="text-blue-500 font-bold bg-blue-50 px-1.5 py-0.5 rounded-md text-[9px]">College Public</span>
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Post text */}
          <div className="px-4 pb-3">
            <p className="text-slate-700 text-xs leading-relaxed">
              Our college team won the annual coding competition! 🏆 Proud of the whole team's hard work and dedication.
            </p>
          </div>

          {/* Trophy win image */}
          <div className="px-4 pb-4">
            <div className="rounded-2xl overflow-hidden max-h-80 border border-slate-100 shadow-inner bg-slate-50 relative group">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" 
                alt="Winning Coding Team Trophy" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Reaction counts */}
          <div className="px-4 pb-3 border-b border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-500 font-sans">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-1">
                <span className="w-4.5 h-4.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] border border-white">👍</span>
                <span className="w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] border border-white">❤️</span>
              </div>
              <span>You, Ananya Singh and {likesCount - 2} others</span>
            </div>
            <button 
              onClick={() => setActiveCommentsPostId(isCommentsOpen ? null : 'post3')}
              className="hover:text-blue-600 transition-colors"
            >
              {commentsCount} comments
            </button>
          </div>

          {/* Core Action triggers */}
          <div className="px-2 py-1 flex items-center justify-between text-slate-500 text-xs font-bold font-sans">
            <button 
              onClick={() => handleLike('post3', 'Ananya')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${liked ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              <span>Like</span>
            </button>
            <button 
              onClick={() => setActiveCommentsPostId(isCommentsOpen ? null : 'post3')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${isCommentsOpen ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Comment</span>
            </button>
            <button 
              onClick={() => alert("Copied direct link to clipboard!")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button 
              onClick={() => handleSave('post3')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${savedPosts.post3 ? 'text-blue-600 bg-blue-50/40' : 'hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Bookmark className={`w-4 h-4 ${savedPosts.post3 ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              <span>Save</span>
            </button>
          </div>

          {/* Comments Drawer Expansion */}
          {isCommentsOpen && (
            <div className="border-t border-slate-50 bg-slate-50/50 p-4 space-y-3">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {commentsListState.post3.map(cmt => (
                  <div key={cmt.id} className="text-xs flex gap-2.5 items-start">
                    <div className="w-7.5 h-7.5 rounded-full bg-slate-200 flex-shrink-0 text-slate-700 flex items-center justify-center font-extrabold border border-slate-200">
                      {cmt.author[0]}
                    </div>
                    <div className="flex-1 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-3xs">
                      <div className="flex justify-between font-extrabold text-slate-800">
                        <span>{cmt.author}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{cmt.time}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{cmt.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send action */}
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text" 
                  value={commentTextState.post3}
                  onChange={(e) => setCommentTextState(prev => ({ ...prev, post3: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment('post3')}
                  placeholder="Join the discussion thread..."
                  className="flex-1 bg-white border border-slate-200 outline-none rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
                />
                <button 
                  onClick={() => handleAddComment('post3')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </article>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 max-w-[1000px] mx-auto select-text pb-20">
      
      {/* ==========================================================
          PROFILE COVER & HEADER AREA (PIXEL PERFECT REPLICA)
          ========================================================== */}
      <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm mb-6 relative">
        
        {/* Banner Cover Wrapper */}
        <div className="h-[280px] w-full relative overflow-hidden bg-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&h=400&q=80" 
            alt="XYZ University Campus"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle bottom shadow overlay on cover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Change Cover Pill Button */}
          <button 
            onClick={() => alert("Change cover picture panel is simulated in this presentation layer.")}
            className="absolute top-5 left-5 bg-white/90 hover:bg-white text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer border border-slate-100 active:scale-95"
          >
            <Camera className="w-4 h-4 text-slate-700" />
            <span>Change Cover</span>
          </button>
        </div>

        {/* Profile Info Details Overlay row */}
        <div className="px-6 pb-6 pt-3 relative">
          
          {/* Avatar Position Overlay */}
          <div className="absolute -top-[85px] left-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Rahul Sharma Profile Photograph" 
                className="w-[150px] h-[150px] rounded-full object-cover border-4 border-white shadow-lg bg-white bg-clip-border"
                referrerPolicy="no-referrer"
              />
              {/* Camera Badge float */}
              <button 
                onClick={() => alert("Change profile avatar panel triggered.")}
                className="absolute bottom-1 right-1 w-[38px] h-[38px] bg-slate-50 hover:bg-white text-slate-700 rounded-full border border-slate-200 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                title="Change Avatar"
              >
                <Camera className="w-4.5 h-4.5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Core Labels & Action Buttons aligned next to avatars */}
          <div className="ml-[170px] mt-1.5 flex justify-between items-start flex-wrap gap-4 min-h-[90px]">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                  Rahul Sharma
                </h1>
                {/* Blue Verified circular crest */}
                <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0" title="Verified Campus Student">
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-500 mt-1">
                CSE Student • Batch 2024
              </p>
              
              <p className="text-xs font-semibold text-slate-600 mt-1 uppercase tracking-wider block">
                XYZ University
              </p>

              {/* Geographic labels & Joined labels */}
              <div className="flex items-center gap-4 text-slate-500 font-semibold text-xs mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ahmedabad, India</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Joined Aug 2022</span>
                </span>
              </div>
            </div>

            {/* CTAs on Right */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => alert("Edit Profile dashboard activated! Custom parameters are customizable below.")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4.5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 uppercase tracking-wider"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button 
                onClick={() => alert("Optional parameters simulated.")}
                className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <MoreHorizontal className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Divider line in Header Card */}
          <div className="h-px bg-slate-100 my-5 mt-6" />

          {/* STATS MATRIX SECTION ROW */}
          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto text-center divide-x divide-slate-100 select-none">
            <div>
              <p className="text-xl font-black text-blue-600 tracking-tight leading-none">234</p>
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1.5 leading-none">Posts</p>
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 tracking-tight leading-none">1.2K</p>
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1.5 leading-none">Followers</p>
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 tracking-tight leading-none">980</p>
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1.5 leading-none">Following</p>
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 tracking-tight leading-none">18</p>
              <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1.5 leading-none">Groups</p>
            </div>
          </div>

        </div>

      </div>

      {/* ==========================================================
          SUB-NAVIGATION CARD (PIXEL-PERFECT HORIZONTAL TAB SHEET)
          ========================================================== */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-6 select-none p-1">
        <div className="flex overflow-x-auto gap-1 scrollbar-none font-sans">
          
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl cursor-pointer text-xs font-bold whitespace-nowrap tracking-wider uppercase transition-all duration-200 ${
              activeSubTab === 'timeline'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-custom'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Timeline</span>
          </button>

          <button
            onClick={() => setActiveSubTab('about')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl cursor-pointer text-xs font-bold whitespace-nowrap tracking-wider uppercase transition-all duration-200 ${
              activeSubTab === 'about'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-custom'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            <GraduationCap className="w-4.5 h-4.5 text-slate-500" />
            <span>About</span>
          </button>

          <button
            onClick={() => setActiveSubTab('photos')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl cursor-pointer text-xs font-bold whitespace-nowrap tracking-wider uppercase transition-all duration-200 ${
              activeSubTab === 'photos'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-custom'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-slate-500" />
            <span>Photos</span>
          </button>

          <button
            onClick={() => setActiveSubTab('friends')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl cursor-pointer text-xs font-bold whitespace-nowrap tracking-wider uppercase transition-all duration-200 ${
              activeSubTab === 'friends'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-custom'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            <Users className="w-4.5 h-4.5 text-slate-500" />
            <span>Friends</span>
          </button>

          <button
            onClick={() => setActiveSubTab('groups')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl cursor-pointer text-xs font-bold whitespace-nowrap tracking-wider uppercase transition-all duration-200 ${
              activeSubTab === 'groups'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-custom'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            <Building className="w-4 h-4 text-slate-500" />
            <span>Groups</span>
          </button>

          <button
            onClick={() => setActiveSubTab('saved')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl cursor-pointer text-xs font-bold whitespace-nowrap tracking-wider uppercase transition-all duration-200 ${
              activeSubTab === 'saved'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600 shadow-custom'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
            }`}
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Saved</span>
          </button>

        </div>
      </div>

      {/* ==========================================================
          THREE-COLUMN GRID LAYOUT MATCHING SCREENSHOT SPECIFICS
          ========================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* ==========================================================
            LEFT SIDEBAR PANELS (Col-span-4): About, Skills, Badges
            ========================================================== */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Card 1: About Card */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                About
              </h2>
              <button 
                onClick={() => alert("Modifying About credentials is coming in secondary phases.")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3.5 font-sans">
              
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <p className="font-extrabold text-slate-700">Computer Science Engineering</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Department of CSE</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <p className="font-extrabold text-slate-700">XYZ University</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Ahmedabad, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <p className="font-extrabold text-slate-700">Batch of 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <p className="font-extrabold text-slate-700 break-all">rahulsharma24@xyz.edu.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <p className="font-extrabold text-slate-700">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Linkedin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs leading-relaxed">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="font-extrabold text-blue-600 hover:underline flex items-center gap-1">
                    <span>www.linkedin.com/in/rahulsharma</span>
                    <ExternalLink className="w-3 h-3 text-blue-500" />
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-50">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5Packed">Bio</p>
                <p className="text-slate-600 text-[12px] leading-relaxed italic">
                  "Passionate about coding, problem solving and building impactful solutions. Always learning, always growing."
                </p>
              </div>

            </div>
          </div>

          {/* Card 2: Skills Card */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Skills
              </h2>
              <button 
                onClick={() => alert("Modify student skill meters.")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="space-y-4 font-sans select-none">
              
              {/* Java Skill */}
              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                  <span>Java</span>
                  <span className="text-blue-600">90%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '90%' }} />
                </div>
              </div>

              {/* Python Skill */}
              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                  <span>Python</span>
                  <span className="text-blue-600">85%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '85%' }} />
                </div>
              </div>

              {/* C++ Skill */}
              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                  <span>C++</span>
                  <span className="text-blue-600">75%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '75%' }} />
                </div>
              </div>

              {/* Web Development Skill */}
              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                  <span>Web Development</span>
                  <span className="text-blue-600">80%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '80%' }} />
                </div>
              </div>

              {/* Data Structures Skill */}
              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1.5">
                  <span>Data Structures</span>
                  <span className="text-blue-600">88%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '88%' }} />
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Badges Card */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Badges
              </h2>
              <button 
                onClick={() => alert("Viewing all dynamic profile badges.")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="flex items-center justify-around gap-2 py-2 font-sans select-none">
              
              {/* Badge 1: Top Contributor */}
              <div className="flex flex-col items-center text-center group relative cursor-pointer">
                <div className="w-[66px] h-[72px] bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col items-center justify-center relative shadow-sm transition-transform hover:scale-110 duration-200">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 rounded-2xl" />
                  <Award className="w-8 h-8 text-indigo-600 z-10 drop-shadow-sm" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-700 mt-2.5 leading-tight">Top<br/>Contributor</span>
                <span className="text-[8px] font-bold text-slate-400 mt-0.5">Community</span>
              </div>

              {/* Badge 2: Active Member */}
              <div className="flex flex-col items-center text-center group relative cursor-pointer">
                <div className="w-[66px] h-[72px] bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center justify-center relative shadow-sm transition-transform hover:scale-110 duration-200">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 rounded-2xl" />
                  <Sparkles className="w-8 h-8 text-emerald-600 z-10 drop-shadow-sm" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-700 mt-2.5 leading-tight">Active<br/>Member</span>
                <span className="text-[8px] font-bold text-slate-400 mt-0.5">Engaged</span>
              </div>

              {/* Badge 3: Event Star */}
              <div className="flex flex-col items-center text-center group relative cursor-pointer">
                <div className="w-[66px] h-[72px] bg-amber-50 border border-amber-100 rounded-2xl flex flex-col items-center justify-center relative shadow-sm transition-transform hover:scale-110 duration-200">
                  <div className="absolute inset-0.5 bg-gradient-to-br from-amber-500 to-orange-500 opacity-10 rounded-2xl" />
                  <Award className="w-8 h-8 text-amber-600 z-10 drop-shadow-sm" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-700 mt-2.5 leading-tight">Event<br/>Star</span>
                <span className="text-[8px] font-bold text-slate-400 mt-0.5">Events</span>
              </div>

            </div>

          </div>

        </div>

            {/* ==========================================================
                MIDDLE PANELS (Col-span-5): Post Composer, Posts list
                ========================================================== */}
            <div className="md:col-span-5 space-y-6">
          {activeSubTab === 'timeline' && (
            <>
              {/* Post Composer card */}
              <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
                <div className="flex gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" 
                    alt="Your Avatar" 
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-100 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <textarea
                      value={postDraft}
                      onChange={(e) => setPostDraft(e.target.value)}
                      placeholder="What's on your mind?"
                      rows={2}
                      className="w-full text-slate-800 text-xs placeholder-slate-400 bg-slate-50 border border-transparent focus:bg-white focus:border-slate-100 rounded-2xl px-4 py-3 outline-none resize-none transition-all leading-relaxed"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[11px] font-extrabold text-slate-500">
                  
                  {/* Media actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-green-600 transition-all cursor-pointer">
                      <ImageIcon className="w-4 h-4 text-green-500" />
                      <span>Photo</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-red-500 transition-all cursor-pointer">
                      <Compass className="w-4 h-4 text-red-500" />
                      <span>Video</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-amber-500 transition-all cursor-pointer">
                      <BookOpen className="w-4 h-4 text-amber-500" />
                      <span>Notes</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-500 transition-all cursor-pointer">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span>Poll</span>
                    </button>
                  </div>

                  {/* Pill Dropdown Visibility and Submit */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <button 
                        onClick={() => setVisibilityOpen(!visibilityOpen)}
                        className="flex items-center gap-1 bg-blue-50/60 text-blue-700 text-[10px] font-black px-3 py-2 rounded-xl border border-blue-100 transition-all cursor-pointer uppercase tracking-wider"
                      >
                        <span>{draftVisibility}</span>
                        <ChevronDown className="w-3 h-3 text-blue-500" />
                      </button>
                      {visibilityOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-30 w-36 text-slate-700 font-bold">
                          <button 
                            onClick={() => { setDraftVisibility('College Public'); setVisibilityOpen(false); }}
                            className="w-full text-left text-[10px] p-2 hover:bg-slate-50 rounded-lg block"
                          >
                            College Public
                          </button>
                          <button 
                            onClick={() => { setDraftVisibility('Friends Only'); setVisibilityOpen(false); }}
                            className="w-full text-left text-[10px] p-2 hover:bg-slate-50 rounded-lg block mt-0.5"
                          >
                            Friends Only
                          </button>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        if (!postDraft.trim()) return;
                        alert("Post submitted to campus timeline database!");
                        setPostDraft('');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] px-4.5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer tracking-wider active:scale-95"
                    >
                      Post
                    </button>
                  </div>

                </div>

              </div>

              {/* Filters Bar */}
              <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-slate-100 font-sans shadow-2xs select-none">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Posts</span>
                <button className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-xl border border-slate-100 cursor-pointer uppercase tracking-wider transition-colors">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filters</span>
                </button>
              </div>

              {renderPostById('post1')}
              {renderPostById('post2')}
              {renderPostById('post3')}
            </>
          )}

          {activeSubTab === 'about' && (
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm space-y-6 font-sans">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Professional Bio & Profile</h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2">
                  Highly driven Computer Science & Engineering student specializing in production frontend architectures, modern UI/UX design components, and state synchronization frameworks. Head coordinator at NIT Coding Circles.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase mb-3">Academic Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">University Affiliation</span>
                    <span className="text-slate-700 font-black mt-1 block">NIT National Institute of Technology</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Academic Grade Indicator</span>
                    <span className="text-slate-700 font-black mt-1 block">GPA Score: 9.42 / 10.0</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">CSE Academic Focus</span>
                    <span className="text-slate-700 font-black mt-1 block">Full-Stack Architect & IoT edge Node</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Ongoing Semester Load</span>
                    <span className="text-slate-700 font-black mt-1 block">4 Theory Labs • CSE Final Year Semester</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase mb-3">Current Semester Courses</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs bg-blue-50/40 p-2.5 rounded-xl border border-blue-50">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="font-extrabold text-slate-700">CS-401: Advanced Distributed Web Systems</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 font-black px-2 py-0.5 rounded-md text-[10px]">A+ Grade</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-50">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      <span className="font-extrabold text-slate-700">CS-404: Database Query Parsing Engines</span>
                    </div>
                    <span className="bg-indigo-100 text-indigo-700 font-black px-2 py-0.5 rounded-md text-[10px]">A+ Grade</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-purple-50/40 p-2.5 rounded-xl border border-purple-50">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      <span className="font-extrabold text-slate-700">CS-408: Modern CSS and Frontend Design Systems</span>
                    </div>
                    <span className="bg-purple-100 text-purple-700 font-black px-2 py-0.5 rounded-md text-[10px]">Outstanding</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase mb-3">Featured Portfolios</h3>
                <div className="space-y-3 font-sans">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-800">Campus Connect Client-Side Portal</h4>
                      <span className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                        Repository <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
                      Engineered pixel-perfect, highly responsive dashboard rendering real-time mock stories, dynamic posts, event filtering, and multi-tier subtabs fully styled with modern Tailwind CSS utilities.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-blue-200 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-800">IoT Air Quality Parsing Microservice</h4>
                      <span className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                        Repository <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
                      Wired gateway parser server connected to DHT22 telemetry nodes. Resolves real-time packet losses and pushes streaming records onto a custom local websocket server.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'photos' && (
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm font-sans">
              <div className="border-b border-slate-100 pb-3 mb-5 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Campus Memories Gallery</h3>
                <span className="text-xs font-bold text-slate-400">6 Photo Archives</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Tech Fest Stage Keynote",
                    desc: "Walking through runtime ES modules and React compiling stages inside the main auditorium.",
                    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Coding Club Hack Sleepover",
                    desc: "Debugging dynamic state re-renders past 3 AM with carbonated caffeine fuels.",
                    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Inter-Department Champion",
                    desc: "Holding the badminton tournament victory cup with our core batch doubles partner.",
                    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Class Seminar Slides",
                    desc: "Interactive whiteboard session of Node.js thread pooling and event loop queues.",
                    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Central Lawn Coffee Catchup",
                    desc: "Resting up during standard midterm revision weeks under breezy spring cherry blossoms.",
                    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    title: "Alumni Interactive Panel",
                    desc: "Coordinating standard placement drives with hiring engineers inside the group library desk.",
                    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
                  }
                ].map((photo, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl border border-slate-100/80 overflow-hidden shadow-custom hover:scale-[1.01] transition-all duration-200 group">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={photo.img} 
                        alt={photo.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-black text-slate-800 truncate">{photo.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-semibold leading-relaxed">{photo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'friends' && (
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm font-sans">
              <div className="border-b border-slate-100 pb-3 mb-5 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Mutual Student Network</h3>
                <span className="text-xs font-bold text-slate-400">980 Connections</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { name: "Priya Nair", role: "CSE Senior • Batch 2024", bio: "Tech circle co-lead. Focuses on Deep Learning NLP classifiers and React state structures.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
                  { name: "Karan Verma", role: "ECE Resident • Batch 2024", bio: "IoT and system engineer. Passionate about embedded microcode controllers and gateway threads.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" },
                  { name: "Ananya Singh", role: "M.Tech Candidate • NLP Desk", bio: "Artificial Intelligence research scholar compiling transformer embeddings on distributed GPU servers.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" },
                  { name: "Amit Patel", role: "CSE Junior • Batch 2025", bio: "Enthusiastic web intern. Loves optimizing tailwind CSS layouts and typescript bundles.", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" },
                  { name: "Sneha Rao", role: "UX/UI Lead • Batch 2024", bio: "Human-centered interaction designer. Focuses on beautiful dark layouts and spacious typography grids.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
                  { name: "Rohan Mehta", role: "CSE Graduate Alum • Google SRE", bio: "Advises campus clubs on scalability models. Enjoys low-level kernel parsing assemblies.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" }
                ].map((friend, idx) => (
                  <div key={idx} className="bg-slate-50 hover:bg-slate-100 p-3.5 rounded-2xl border border-slate-150 hover:border-blue-100 transition-all duration-200 flex gap-3.5 relative">
                    <img 
                      src={friend.avatar} 
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover border border-white shadow-soft flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 pr-2">
                      <h4 className="text-xs font-black text-slate-800 truncate">{friend.name}</h4>
                      <p className="text-[10px] text-blue-600 font-bold mt-0.5 select-none">{friend.role}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-relaxed truncate">{friend.bio}</p>
                      
                      <div className="flex gap-1.5 mt-2.5">
                        <button 
                          onClick={() => alert(`Direct message channel opened with ${friend.name}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9px] px-2.5 py-1.5 rounded-lg uppercase tracking-wider cursor-pointer"
                        >
                          Message
                        </button>
                        <button 
                          onClick={() => alert(`Redirecting profile feed of ${friend.name}`)}
                          className="bg-white hover:bg-slate-50 text-slate-600 font-extrabold text-[9px] px-2.5 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200 cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'groups' && (
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm font-sans">
              <div className="border-b border-slate-100 pb-3 mb-5 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Subscribed Boards & Forums</h3>
                <span className="text-xs font-bold text-slate-400">6 Connected Channels</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { title: "CSE Department Board", type: "Public Board • 1.2k Members", icon: "🛡️", desc: "Official announcements, schedule variations, and classroom feedback threads." },
                  { title: "Coding Club Circle", type: "Private Circle • 540 Members", icon: "💻", desc: "Weekly competitive programming slots, compiler mock guides, and coordinate tasks." },
                  { title: "Tech Enthusiasts Hub", type: "Public Board • 980 Members", icon: "🔌", desc: "Custom hardware frameworks discussions, desktop setups, and linux configs." },
                  { title: "Placement Cell Circle", type: "Private Board • 350 candidates", icon: "💼", desc: "Residency interview rosters, mock interviews, and official corporate placements calendar." },
                  { title: "AI & ML Community", type: "Public Board • 420 Members", icon: "🧠", desc: "Reading circles for transformer weights, fine-tune adapters, and generative models." },
                  { title: "Alumni Association Link", type: "Public Board • 3,110 graduated", icon: "🤝", desc: "Networking pipelines, senior referral tags, and mock start-up pitch forums." }
                ].map((grp, idx) => (
                  <div key={idx} className="bg-slate-50 hover:bg-slate-100 p-3.5 rounded-2xl border border-slate-150 hover:border-indigo-100 transition-all duration-200 flex gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl flex-shrink-0 shadow-3xs">
                      {grp.icon}
                    </div>
                    <div className="min-w-0 font-sans">
                      <h4 className="text-xs font-black text-slate-800 truncate">{grp.title}</h4>
                      <p className="text-[10px] text-indigo-600 font-bold mt-0.5 uppercase tracking-wide">{grp.type}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1.5 leading-relaxed">{grp.desc}</p>
                      <button 
                        onClick={() => alert(`Accessing room directory for "${grp.title}"`)}
                        className="mt-3.5 bg-white text-slate-700 hover:text-indigo-600 font-black text-[9px] px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-200 uppercase tracking-wider block text-center cursor-pointer transition-colors"
                      >
                        Enter Forum Board
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'saved' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs flex justify-between items-center font-sans">
                <div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Your Saved Library</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                    Bookmarked discussions and notices from the central campus grid.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Cleared all local cache library records.")}
                  className="text-[10px] bg-red-50 text-red-600 hover:bg-red-100 font-black uppercase px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {(!savedPosts.post1 && !savedPosts.post2 && !savedPosts.post3) ? (
                <div className="bg-white rounded-[24px] p-12 border border-slate-100 shadow-sm text-center font-sans">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Library is Empty</h4>
                  <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                    Bookmark interesting tech discussions, placements ads, or certification posts from your central timeline to check them later right here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {savedPosts.post1 && renderPostById('post1')}
                  {savedPosts.post2 && renderPostById('post2')}
                  {savedPosts.post3 && renderPostById('post3')}
                </div>
              )}
            </div>
          )}
        </div>


        {/* ==========================================================
            RIGHT SIDEBAR PANELS (Col-span-3): Completion, Groups, Photos, Friends
            ========================================================== */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Card 1: Profile Completion indicator */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Profile Completion
              </h2>
              <button 
                onClick={() => alert("Setup remaining profile sections.")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Edit
              </button>
            </div>

            <div className="flex items-center gap-4.5 mb-4 select-none">
              
              {/* Actual SVG Circular loader ring for 80% */}
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Track ring */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress ring (80%) */}
                  <path
                    className="text-blue-600 transition-all duration-1000"
                    strokeDasharray="80, 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute font-black text-[13px] text-slate-800 tracking-tight">80%</div>
              </div>

              <div className="font-sans leading-snug">
                <h4 className="text-[12px] font-extrabold text-slate-800">You're doing great!</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                  Complete your profile to get discovered.
                </p>
              </div>

            </div>

            {/* Completion checklist boxes */}
            <div className="space-y-2.5 font-sans select-none">
              
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-extrabold">
                <div className="w-[18px] h-[18px] bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] border border-emerald-200">
                  ✔
                </div>
                <span>Add profile picture</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-extrabold font-sans">
                <div className="w-[18px] h-[18px] bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] border border-emerald-200">
                  ✔
                </div>
                <span>Add cover photo</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-extrabold font-sans">
                <div className="w-[18px] h-[18px] bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] border border-emerald-200">
                  ✔
                </div>
                <span>Add bio</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-extrabold font-sans">
                <div className="w-[18px] h-[18px] bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] border border-emerald-200">
                  ✔
                </div>
                <span>Add your skills</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-extrabold font-sans">
                <div className="w-[18px] h-[18px] bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] border border-emerald-200">
                  ✔
                </div>
                <span>Add education details</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-extrabold font-sans">
                <div className="w-[18px] h-[18px] bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-[10px] border-2 border-slate-200" />
                <span>Add work experience</span>
              </div>

            </div>

          </div>

          {/* Card 2: Your Groups (6) */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Your Groups (6)
              </h2>
              <button 
                onClick={() => alert("Loading full group explorer matrix...")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-4 font-sans select-none">
              
              {/* Group 1 */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[38px] h-[38px] bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black flex-shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                    {/* Unique shield logo representation */}
                    🛡️
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-blue-600 transition-colors truncate">
                      CSE Department
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1">Public Group</p>
                  </div>
                </div>
              </div>

              {/* Group 2 */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[38px] h-[38px] bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black flex-shrink-0 border border-indigo-100 group-hover:scale-105 transition-transform">
                    💻
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-blue-600 transition-colors truncate">
                      Coding Club
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-slate-400" />
                      <span>Private Group</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Group 3 */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[38px] h-[38px] bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-black flex-shrink-0 border border-amber-100 group-hover:scale-105 transition-transform">
                    🔌
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-blue-600 transition-colors truncate">
                      Tech Enthusiasts
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1">Public Group</p>
                  </div>
                </div>
              </div>

              {/* Group 4 */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[38px] h-[38px] bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center font-black flex-shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                    💼
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-blue-600 transition-colors truncate">
                      Placement Cell
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-slate-400" />
                      <span>Private Group</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Group 5 */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[38px] h-[38px] bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-black flex-shrink-0 border border-purple-100 group-hover:scale-105 transition-transform">
                    🧠
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-800 leading-none group-hover:text-blue-600 transition-colors truncate">
                      AI & ML Community
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1">Public Group</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Photos Card (6 Grid) */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Photos
              </h2>
              <button 
                onClick={() => setActiveSubTab('photos')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 select-none">
              
              {/* Photo 1 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80" 
                  alt="Campus hall" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo 2 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=150&q=80" 
                  alt="Student Buddies" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo 3 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=150&q=80" 
                  alt="Party lights" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo 4 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=150&q=80" 
                  alt="Classroom seminar" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo 5 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=150&q=80" 
                  alt="Win Ceremony coding" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo 6 */}
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=80" 
                  alt="Computer Hub monitors" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          </div>

          {/* Card 4: Friends (980) Card */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-2xs">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Friends (980)
              </h2>
              <button 
                onClick={() => setActiveSubTab('friends')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                See All
              </button>
            </div>

            {/* Grid of 8 circles with the "+95" item */}
            <div className="grid grid-cols-4 gap-2.5 select-none">
              
              {/* Friend 1 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                    alt="Priya" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Friend 2 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" 
                    alt="Karan" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Friend 3 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" 
                    alt="Ananya" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Friend 4 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" 
                    alt="Amit" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Friend 5 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="Sneha" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Friend 6 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" 
                    alt="Rohan" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Friend 7 */}
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" 
                    alt="Mehak" 
                    className="w-11 h-11 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Plus +95 Slot */}
              <div className="flex flex-col items-center justify-center cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-xs text-slate-500 shadow-2xs hover:bg-slate-100 transition-colors">
                  +95
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
