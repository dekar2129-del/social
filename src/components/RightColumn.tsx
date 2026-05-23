import React from 'react';
import { useCampus } from '../context/CampusContext';
import { Star, UserPlus, X, TrendingUp, Calendar, Check, Landmark, Clock } from 'lucide-react';

export const RightColumn: React.FC = () => {
  const { 
    events, 
    suggestions, 
    trendingTags, 
    handleSuggestAction, 
    toggleFavoriteEvent,
    activeFilterTag,
    setActiveFilterTag 
  } = useCampus();

  const handleHashtagClick = (tag: string) => {
    if (activeFilterTag === tag) {
      setActiveFilterTag(null); // Toggle off if already selected
    } else {
      setActiveFilterTag(tag);
    }
  };

  return (
    <div className="w-80 flex-shrink-0 space-y-6 select-none sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto pr-1 hidden lg:block">
      
      {/* 1. Upcoming Events Card list */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-blue-600" />
            <span>Upcoming Events</span>
          </h2>
          <button 
            onClick={() => alert("Calendar panel integration is coming in future phases. Interactive events are fully operable below!")}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            See all
          </button>
        </div>

        <div className="space-y-3.5">
          {events.map((event) => (
            <div 
              key={event.id}
              className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group relative"
            >
              <div className="flex items-center gap-3">
                {/* Custom calendar display sheet block */}
                <div className="w-12 h-13 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-between overflow-hidden shadow-sm flex-shrink-0">
                  <span className={`text-[9px] font-black tracking-widest text-center w-full py-0.5 text-white ${event.id === 'ev-3' ? 'bg-orange-500' : 'bg-red-500'}`}>
                    {event.dateMonth}
                  </span>
                  <span className="text-lg font-black font-display text-slate-800 leading-none pb-1.5 -mt-0.5">
                    {event.dateDay}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                    <Landmark className="w-3 h-3 text-slate-400" />
                    <span>{event.location}</span>
                  </p>
                  <p className="text-[9.5px] font-bold text-slate-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-blue-500" />
                    <span>{event.timeLabel}</span>
                  </p>
                </div>
              </div>

              {/* Dynamic favorite status star selector */}
              <button 
                onClick={() => toggleFavoriteEvent(event.id)}
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                  event.isFavorite 
                    ? 'bg-blue-50 border-blue-100 text-blue-600' 
                    : 'bg-slate-50 border-transparent text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Star className={`w-4 h-4 ${event.isFavorite ? 'fill-blue-500 stroke-blue-600' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. People You May Know suggestions */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <svg className="w-4.5 h-4.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>People You May Know</span>
          </h2>
          <button 
            onClick={() => alert("Connections matrix panel is coming soon. Connect with recommended students below!")}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            See all
          </button>
        </div>

        {suggestions.length > 0 ? (
          <div className="space-y-3.5">
            {suggestions.map((sug) => {
              const hasRequested = sug.status === 'requested';
              const isFriends = sug.status === 'friends';
              
              return (
                <div 
                  key={sug.id}
                  className="flex items-center justify-between p-1.5 rounded-2xl hover:bg-slate-50/50 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={sug.avatar} 
                      alt={sug.name} 
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-none truncate max-w-[100px]">
                        {sug.name}
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-400 mt-1 leading-none">{sug.role}</p>
                    </div>
                  </div>

                  {/* Add Friend status trigger CTA action pill */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSuggestAction(sug.id, 'add')}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1 ${
                        isFriends 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : hasRequested
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isFriends ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Friends</span>
                        </>
                      ) : hasRequested ? (
                        <>
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse mr-0.5" />
                          <span>Sent</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3 h-3" />
                          <span>Add Friend</span>
                        </>
                      )}
                    </button>

                    {/* Dismiss Button */}
                    <button 
                      onClick={() => handleSuggestAction(sug.id, 'dismiss')}
                      className="text-slate-300 hover:text-slate-500 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-semibold text-center py-4 bg-slate-50 rounded-2xl">
            All caught up! Check back later for new classmates.
          </p>
        )}
      </div>

      {/* 3. Trending in College hashtags */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-3.5 px-1">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-blue-600" />
            <span>Trending in College</span>
          </h2>
          <button 
            onClick={() => alert("Global university hash feed analytics scheduled. Click any specific hashtag below to filter direct matching threads!")}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            See all
          </button>
        </div>

        <div className="space-y-3">
          {trendingTags.map((t) => {
            const isSelected = activeFilterTag === t.tag;
            return (
              <button
                key={t.id}
                onClick={() => handleHashtagClick(t.tag)}
                className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
                    : 'bg-slate-50 hover:bg-slate-100 border-transparent hover:border-slate-100'
                }`}
              >
                <div>
                  <h4 className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-blue-600'} tracking-tight`}>
                    {t.tag}
                  </h4>
                  <p className={`text-[10px] font-semibold mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    {t.postsCount}
                  </p>
                </div>

                <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-slate-400'
                }`}>
                  #
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
