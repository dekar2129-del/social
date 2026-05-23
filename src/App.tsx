import React, { useState, useEffect } from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { ProfileView } from './components/ProfileView';
import { RightColumn } from './components/RightColumn';
import { MobileFrame } from './components/MobileFrame';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronDown, 
  Smartphone, 
  LayoutGrid, 
  Laptop, 
  Users, 
  Sparkles,
  UserCheck
} from 'lucide-react';

function DashboardContent() {
  const { searchQuery, setSearchQuery, activeTab, setActiveTab } = useCampus();
  const [viewMode, setViewMode] = useState<'all' | 'desktop' | 'mobile'>('desktop');
  const [activePage, setActivePage] = useState<'profile' | 'feed'>('profile');

  // Hardcoded current user matching Rahul Sharma's active session in the screenshot
  const rahulUser = {
    name: 'Rahul Sharma',
    role: 'CSE Student • Batch 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  };

  // Keep page and active tab fully synchronized.
  useEffect(() => {
    if (activeTab === 'Home' || activeTab === 'Explore') {
      setActivePage('feed');
    } else if (activeTab === 'Friends' || activeTab === 'Saved' || activeTab === 'Alumni') {
      setActivePage('profile');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans pb-12 selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
      
      {/* ==========================================================
          DYNAMIC VIEW MODE CONTROL TRAY
          ========================================================== */}
      <div className="bg-slate-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sticky top-0 z-50 select-none shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse-slow ring-1 ring-blue-300"></span>
          <p className="font-extrabold tracking-wider uppercase text-[10px]">
            EXPERT PRESENTATION MODULE: <span className="text-blue-400">RAHUL SHARMA WORKSPACE</span>
          </p>
        </div>

        {/* Dynamic page switcher (Profile replica vs General Feed) */}
        <div className="flex items-center gap-1.5 bg-slate-800 rounded-xl p-1 text-[11px] font-bold">
          <button
            onClick={() => { setActivePage('profile'); setActiveTab('Saved'); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activePage === 'profile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile Page (Exact Replica)</span>
          </button>
          
          <button
            onClick={() => { setActivePage('feed'); setActiveTab('Home'); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activePage === 'feed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Home General Feed</span>
          </button>
        </div>
        
        {/* Screen view layout configuration controller */}
        <div className="flex items-center gap-1.5 bg-slate-800 rounded-xl p-1 text-[11px] font-bold">
          <button 
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Split layout side-by-side with simulator"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split Replica View</span>
          </button>
          
          <button 
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Desktop 1:1 view of profile"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop Clean</span>
          </button>

          <button 
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Pure smartphone terminal model"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Focus</span>
          </button>
        </div>
      </div>

      {/* ==========================================================
          MAIN LAYOUT CONTAINER
          ========================================================== */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 md:px-8 py-4 flex gap-6 relative">
        
        {/* Left column sidebar (Always visible on desktop mode) */}
        {viewMode !== 'mobile' && (
          <aside className="hidden md:block w-[230px] flex-shrink-0">
            <Sidebar />
          </aside>
        )}

        {/* Big center columns */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Universal Header - Match the screenshot perfectly */}
          {viewMode !== 'mobile' && (
            <header className="bg-transparent h-16 flex items-center justify-between gap-4 py-2 border-b border-slate-100 mb-6 select-none">
              
              {/* Search center bar */}
              <div className="flex-1 max-w-lg relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students, alumni, posts..."
                  className="w-full text-slate-800 text-xs font-semibold placeholder-slate-400 bg-white border border-slate-100 rounded-full pl-11 pr-4 py-2.5 outline-none focus:border-blue-400 focus:bg-white shadow-3xs transition-all duration-200"
                />
              </div>

              {/* Action bells with notification indices */}
              <div className="flex items-center gap-3">
                
                {/* Plus button inside bordered card */}
                <button 
                  onClick={() => alert("Quick Post composer trigger is fully accessible on the middle column.")}
                  className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200 shadow-3xs cursor-pointer text-base font-bold select-none transition-all active:scale-95"
                >
                  +
                </button>

                {/* Friends shield */}
                <button 
                  onClick={() => { setActivePage('profile'); setActiveTab('Friends'); }}
                  className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200 shadow-3xs cursor-pointer transition-all active:scale-95"
                >
                  <Users className="w-4.5 h-4.5 text-slate-500" />
                </button>

                {/* Message (Group Chat counter) */}
                <div className="relative">
                  <button className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200 shadow-3xs relative transition-all active:scale-95 cursor-pointer">
                    <MessageSquare className="w-4.5 h-4.5 text-slate-500" />
                  </button>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-50 shadow-sm animate-pulse-slow">
                    3
                  </span>
                </div>

                {/* Bell (Online Alerts) */}
                <div className="relative">
                  <button className="w-10 h-10 bg-white hover:bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center border border-slate-200 shadow-3xs relative transition-all active:scale-95 cursor-pointer">
                    <Bell className="w-4.5 h-4.5 text-slate-500" />
                  </button>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-50 shadow-sm animate-pulse-slow">
                    6
                  </span>
                </div>

                {/* User Dropdown Profile card details */}
                <div className="flex items-center gap-2.5 pl-2.5 border-l border-slate-200">
                  <img 
                    src={rahulUser.avatar} 
                    alt={rahulUser.name} 
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100 p-0.5 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block text-left">
                    <h4 className="text-[11px] font-black text-slate-800 leading-none">{rahulUser.name}</h4>
                    <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase leading-none">CSE Student</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
            </header>
          )}

          {/* Central display viewport container grids */}
          <main className="flex-1">
            
            {viewMode === 'all' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Horizontal flow containing user contents */}
                <div className="lg:col-span-8">
                  {activePage === 'profile' ? <ProfileView /> : <Feed />}
                </div>

                {/* Combined Right Info col alongside Mobile Simulator frame right inside the viewport grid */}
                <div className="lg:col-span-4 space-y-6">
                  {activePage === 'feed' && <RightColumn />}
                  
                  <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col items-center">
                    <div className="w-full text-center pb-2.5 mb-2.5 border-b border-slate-100 select-none">
                      <p className="text-xs font-black text-blue-600 tracking-wider flex items-center justify-center gap-1.5 uppercase">
                        <Smartphone className="w-4 h-4 text-slate-700 animate-pulse-slow" />
                        <span>LIVE DEVICE SYNC</span>
                      </p>
                    </div>
                    <MobileFrame />
                  </div>
                </div>

              </div>
            )}

            {viewMode === 'desktop' && (
              <div className="w-full">
                {activePage === 'profile' ? (
                  <ProfileView />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                      <Feed />
                    </div>
                    <div className="lg:col-span-4">
                      <RightColumn />
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === 'mobile' && (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-center max-w-sm mb-4 px-4 select-none">
                  <h2 className="text-sm font-black text-slate-800">Operational Mobile Terminal</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Every touch, like, posting memory, or event trigger updates the global application environment. Real-time synchronicity at its finest!
                  </p>
                </div>
                <MobileFrame />
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CampusProvider>
      <DashboardContent />
    </CampusProvider>
  );
}
