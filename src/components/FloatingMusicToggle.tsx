import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const FloatingMusicToggle: React.FC = () => {
  const { isPlaying, togglePlay, trackTitle, artist } = useAudio();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Điều khiển nhạc nền"
      className="fixed bottom-6 right-5 md:bottom-10 md:right-8 z-40 flex items-center gap-3 safe-right safe-bottom pointer-events-auto"
    >
      {/* Optional gentle song title pill on hover/playing */}
      <div
        className={`hidden md:flex flex-col items-end pr-1 transition-all duration-300 pointer-events-none ${
          showTooltip || isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="text-[11px] font-sans tracking-widest uppercase text-champagne-gold font-medium bg-ivory-100/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-champagne-border/80 shadow-sm">
          {isPlaying ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold animate-ping" />
              {trackTitle || 'I Do'}
            </span>
          ) : (
            'Nhạc nền'
          )}
        </span>
        {artist && isPlaying && (
          <span className="text-[9px] text-ink-muted/80 tracking-wider mr-1 mt-0.5 font-sans">
            {artist}
          </span>
        )}
      </div>

      {/* Main Floating Button */}
      <button
        onClick={togglePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        className={`relative group w-12 h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-stationery-lg bg-ivory-100/95 backdrop-blur-md border ${
          isPlaying
            ? 'border-champagne-gold text-champagne-gold shadow-gold-glow'
            : 'border-champagne-border text-ink-muted hover:text-champagne-gold hover:border-champagne-gold'
        } active:scale-95 focus:outline-none focus:ring-2 focus:ring-champagne-gold/50`}
      >
        {/* Subtle rotating gold ring when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border border-dashed border-champagne-gold/40 animate-spin-slow pointer-events-none" />
        )}

        {/* Music Icon */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              {/* Sound wave dot */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-champagne-gold animate-pulse" />
            </div>
          ) : (
            <div className="relative">
              <VolumeX className="w-5 h-5 text-ink-muted transition-transform duration-300 group-hover:scale-110" />
            </div>
          )}
        </div>

        {/* Minimal ripple on click */}
        <span className="sr-only">{isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}</span>
      </button>
    </aside>
  );
};
