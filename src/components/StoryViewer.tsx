import React, { useEffect, useState } from 'react';
import { Story } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle story progress timer
  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1.5; // Tick speed
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, isOpen]);

  if (!isOpen || stories.length === 0) return null;

  const currentStory = stories[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    } else {
      // Loop or exit
      onClose();
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      // Finished all stories
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center select-none backdrop-blur-md transition-opacity duration-300">
      {/* Keyboard instructions or top info bar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full flex items-center justify-center transition-all border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main story container */}
      <div className="relative w-full max-w-sm aspect-[9/16] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col mx-4 select-none">
        
        {/* Story top timeline meters */}
        <div className="absolute top-3 inset-x-3 z-30 flex gap-1">
          {stories.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all ease-linear"
                style={{
                  width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%',
                  transitionDuration: index === currentIndex ? '50ms' : '0s'
                }}
              />
            </div>
          ))}
        </div>

        {/* User identification header overlay */}
        <div className="absolute top-6 inset-x-3 z-30 flex items-center justify-between p-1.5 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2.5">
            <img 
              src={currentStory.userAvatar} 
              alt={currentStory.userName} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-white text-xs font-bold leading-none">{currentStory.userName}</p>
              <p className="text-white/70 text-[10px] mt-0.5 leading-none">{currentStory.timeAgo}</p>
            </div>
          </div>
        </div>

        {/* Story visual background */}
        {currentStory.imageUrl && (
          <img 
            src={currentStory.imageUrl} 
            alt="Story context"
            className="w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Overlay touch zones for sliding and clicking navigation */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left tap zone */}
          <div 
            onClick={handlePrev} 
            className="w-1/3 h-full cursor-w-resize active:bg-white/5 transition-colors"
          />
          {/* Middle context reading pointer */}
          <div className="w-1/3 h-full" />
          {/* Right tap zone */}
          <div 
            onClick={handleNext} 
            className="w-1/3 h-full cursor-e-resize active:bg-white/5 transition-colors"
          />
        </div>

        {/* Big tactile visual helpers for desktop mouse devices */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 cursor-pointer disabled:opacity-0 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center z-20 cursor-pointer transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Decorative caption / text box if present */}
        <div className="absolute bottom-6 inset-x-3 z-30 bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <p className="text-white text-xs text-center font-medium">
            🔥 Vibes are immaculate! Enjoying the campus spirit inside <span className="text-blue-400 font-bold">#CampusLife</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
