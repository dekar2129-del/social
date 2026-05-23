import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  Bell, 
  Calendar, 
  UserSquare2, 
  Bookmark, 
  GraduationCap, 
  Settings,
  ChevronDown,
  Globe,
  Store,
  FolderClosed,
  MoreHorizontal,
  Sun
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useCampus();
  const [themeOpen, setThemeOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Light Mode');

  const menuItems = [
    { name: 'Home', icon: Home, badge: null },
    { name: 'Explore', icon: Compass, badge: null },
    { 
      name: 'Friends', 
      icon: Users, 
      badge: '2',
      badgeColor: 'bg-red-500 text-white'
    },
    { 
      name: 'Messages', 
      icon: MessageSquare, 
      badge: '3',
      badgeColor: 'bg-red-500 text-white'
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      badge: '6',
      badgeColor: 'bg-red-500 text-white' 
    },
    { name: 'Events', icon: Calendar, badge: null },
    { name: 'Groups', icon: UserSquare2, badge: null },
    { name: 'Pages', icon: FolderClosed, badge: null },
    { name: 'Alumni', icon: GraduationCap, badge: null },
    { name: 'Marketplace', icon: Store, badge: null },
    { name: 'Saved', icon: Bookmark, badge: null },
    { name: 'More', icon: MoreHorizontal, badge: null },
  ];

  const onlineAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
  ];

  return (
    <div className="w-[230px] flex-shrink-0 flex flex-col h-[calc(100vh-2rem)] sticky top-4 select-none font-sans">
      
      {/* ==========================================================
          BRAND HEADER (SHIELD LOGO + DROPDOWN VALUE)
          ========================================================== */}
      <div className="px-1 py-3 mb-4">
        <div className="flex items-center gap-2.5">
          {/* Hexagonal/shield custom logo */}
          <div className="relative w-9 h-9 flex items-center justify-center bg-blue-600 rounded-xl shadow-md text-white flex-shrink-0">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              <path d="M12 12v4" />
            </svg>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-black tracking-tight text-slate-800 leading-none">
              CampusConnect
            </h1>
            
            {/* School name alignment with tiny dropdown chevron */}
            <button 
              onClick={() => alert("University matrix switcher is simulated in this presentation tier.")}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 mt-1 cursor-pointer transition-colors leading-none"
            >
              <span>XYZ University</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================
          NAVIGATION LIST
          ========================================================== */}
      <nav className="flex-1 space-y-0.5 pr-1 overflow-y-auto scrollbar-none">
        {menuItems.map((item) => {
          const isActive = activeTab === item.name;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              id={`sidebar-item-${item.name.toLowerCase()}`}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-xs group cursor-pointer ${
                isActive 
                  ? 'bg-blue-50/70 text-blue-700 font-extrabold shadow-3xs' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
                }`} />
                <span className="tracking-wide">{item.name}</span>
              </div>

              {/* Badge Rendering (Red circular outline background with counts) */}
              {item.badge && (
                <span className="w-5.5 h-5.5 rounded-full bg-red-500 text-white font-black text-[9.5px] flex items-center justify-center border border-white shadow-sm ring-1 ring-red-300/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ==========================================================
          YOUR COLLEGE CARD SECTION
          ========================================================== */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <h4 className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2 px-1">
          Your College
        </h4>
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-3xs relative overflow-hidden group mb-3">
          {/* Cover image of brick university campus */}
          <div className="h-16 w-full rounded-xl overflow-hidden mb-2 relative">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80" 
              alt="XYZ University Campus"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-1.5 flex items-end">
              <span className="text-white text-[8px] font-black tracking-widest leading-none">Est. 1998</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-slate-800 tracking-tight leading-none">XYZ University</span>
              <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-1 leading-none">Est. 1998</p>
          </div>

          <button 
            onClick={() => alert("Navigating to University Administrative Portal...")}
            className="w-full mt-2.5 bg-blue-50/60 hover:bg-blue-100/80 text-blue-600 font-black text-[10px] py-2 rounded-xl text-center block transition-colors border border-blue-50 active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            Go to College Portal
          </button>
        </div>

        {/* ==========================================================
            COPYRIGHT & THEME SELECTOR DROPDOWN
            ========================================================== */}
        <div className="px-1 pt-1.5 flex flex-col gap-2">
          <div>
            <p className="text-[9px] text-slate-400 font-extrabold leading-none">
              © 2024 CampusConnect
            </p>
            <p className="text-[8.5px] text-slate-400/80 mt-1 leading-none">
              All rights reserved.
            </p>
          </div>

          {/* Theme Mode Selector widget */}
          <div className="relative mt-1">
            <button 
              onClick={() => setThemeOpen(!themeOpen)}
              className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100/80 text-slate-600 text-[10px] font-black px-2.5 py-2 rounded-xl border border-slate-200 cursor-pointer outline-none transition-all duration-200"
            >
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeTheme}</span>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {themeOpen && (
              <div className="absolute left-0 bottom-full mb-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-35 font-bold text-[10px] text-slate-700">
                <button 
                  onClick={() => { setActiveTheme('Light Mode'); setThemeOpen(false); }}
                  className="w-full text-left p-2 hover:bg-slate-50 rounded-lg block transition-colors"
                >
                  ☀️ Light Mode
                </button>
                <button 
                  onClick={() => { setActiveTheme('Dark Mode'); setThemeOpen(false); alert("Dark mode requires Enterprise styling subscription; simulated in Light Mode presentation layer."); }}
                  className="w-full text-left p-2 hover:bg-slate-50 rounded-lg block transition-colors mt-0.5"
                >
                  🌙 Dark Mode
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
