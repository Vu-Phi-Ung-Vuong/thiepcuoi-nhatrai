import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isReady: boolean;
  hasInteracted: boolean;
  togglePlay: () => void;
  playMusic: () => Promise<boolean>;
  pauseMusic: () => void;
  trackTitle?: string;
  artist?: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: React.ReactNode;
  audioSrc: string;
  trackTitle?: string;
  artist?: string;
  initialVolume?: number;
  fadeInDurationMs?: number;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  audioSrc,
  trackTitle = 'I Do',
  artist = 'Wedding Music',
  initialVolume = 0.7,
  fadeInDurationMs = 1200,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const userManuallyPausedRef = useRef<boolean>(false);
  const fadeIntervalRef = useRef<number | null>(null);

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0; // Start at 0 for fade-in
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsReady(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.warn("Audio playback notice: Audio file unavailable or playback interrupted", e);
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Attempt browser autoplay (if allowed by browser policy)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        // If autoplay succeeded:
        fadeInVolume(initialVolume, fadeInDurationMs);
        setIsPlaying(true);
      } catch {
        // Expected behavior in modern browsers: blocked until first interaction
        // Audio will start when user taps "Mở thiệp" or the music button.
      }
    };

    tryAutoplay();

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc, initialVolume, fadeInDurationMs]);

  const fadeInVolume = (targetVolume: number, durationMs: number) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const steps = 20;
    const intervalTime = durationMs / steps;
    const volumeStep = targetVolume / steps;
    let currentVol = 0;
    audioRef.current.volume = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }
      currentVol = Math.min(targetVolume, currentVol + volumeStep);
      audioRef.current.volume = currentVol;
      if (currentVol >= targetVolume) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, intervalTime);
  };

  const playMusic = useCallback(async (): Promise<boolean> => {
    setHasInteracted(true);
    userManuallyPausedRef.current = false;
    if (!audioRef.current) return false;

    try {
      await audioRef.current.play();
      fadeInVolume(initialVolume, fadeInDurationMs);
      setIsPlaying(true);
      return true;
    } catch (err) {
      console.warn("Audio playback was blocked or requires user action:", err);
      setIsPlaying(false);
      return false;
    }
  }, [initialVolume, fadeInDurationMs]);

  const pauseMusic = useCallback(() => {
    userManuallyPausedRef.current = true;
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    // Quick fade out
    let vol = audioRef.current.volume;
    const fadeOutInterval = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeOutInterval);
        return;
      }
      vol = Math.max(0, vol - 0.15);
      audioRef.current.volume = vol;
      if (vol <= 0) {
        clearInterval(fadeOutInterval);
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }, 40);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isReady,
        hasInteracted,
        togglePlay,
        playMusic,
        pauseMusic,
        trackTitle,
        artist,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
