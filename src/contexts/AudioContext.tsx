"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { Track } from "@/src/types";
import pb from "@/src/lib/pocketbase";

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
}

type AudioAction =
  | { type: "SET_TRACK"; track: Track }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_TIME"; time: number }
  | { type: "SET_DURATION"; duration: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "SET_LOADING"; loading: boolean };

const initialState: AudioState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isLoading: false,
};

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case "SET_TRACK":
      return {
        ...state,
        currentTrack: action.track,
        currentTime: 0,
        isLoading: true,
      };
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_TIME":
      return { ...state, currentTime: action.time };
    case "SET_DURATION":
      return { ...state, duration: action.duration };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "SET_LOADING":
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
}

interface AudioContextType {
  state: AudioState;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldPlayRef = useRef<boolean>(false);

  const playTrack = (track: Track) => {
    if (state.currentTrack?.id === track.id) {
      // Same track, just toggle play/pause
      togglePlayPause();
    } else {
      // New track - set track and mark as should play
      dispatch({ type: "SET_TRACK", track });
      dispatch({ type: "PLAY" });
      shouldPlayRef.current = true;
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.pause();
        dispatch({ type: "PAUSE" });
        shouldPlayRef.current = false;
      } else {
        audioRef.current.play().catch(error => {
          console.error('Play failed:', error);
          dispatch({ type: "PAUSE" });
        });
        dispatch({ type: "PLAY" });
      }
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch({ type: "SET_TIME", time });
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      dispatch({ type: "SET_VOLUME", volume });
    }
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      dispatch({ type: "SET_TIME", time: audio.currentTime });
    };

    const handleDurationChange = () => {
      dispatch({ type: "SET_DURATION", duration: audio.duration });
    };

    const handleLoadStart = () => {
      dispatch({ type: "SET_LOADING", loading: true });
    };

    const handleCanPlay = () => {
      dispatch({ type: "SET_LOADING", loading: false });
      // Auto-play if shouldPlay ref is true (for new tracks)
      if (shouldPlayRef.current) {
        shouldPlayRef.current = false;
        audio.play().catch(error => {
          console.error('Auto-play failed:', error);
          dispatch({ type: "PAUSE" });
        });
      }
    };

    const handleEnded = () => {
      dispatch({ type: "PAUSE" });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [state.isPlaying]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentTrack) return;

    // Get the best available audio source using PocketBase helper
    const getAudioSource = (track: Track) => {
      if (track.streamingFile) {
        return pb.getFileUrl(track, track.streamingFile);
      }
      if (track.previewFile) {
        return pb.getFileUrl(track, track.previewFile);
      }
      if (track.trackFile) {
        return pb.getFileUrl(track, track.trackFile);
      }
      return null;
    };

    const audioSource = getAudioSource(state.currentTrack);
    if (audioSource) {
      audio.src = audioSource;
      audio.load();
    }
  }, [state.currentTrack]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle spacebar if there's a current track and not typing in an input
      if (event.code === 'Space' && state.currentTrack) {
        const target = event.target as HTMLElement;
        const isTyping = target.tagName === 'INPUT' || 
                        target.tagName === 'TEXTAREA' || 
                        target.contentEditable === 'true';
        
        if (!isTyping) {
          event.preventDefault();
          togglePlayPause();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.currentTrack, togglePlayPause]);

  return (
    <AudioContext.Provider
      value={{
        state,
        audioRef,
        playTrack,
        togglePlayPause,
        seek,
        setVolume,
      }}
    >
      {children}
      <audio ref={audioRef} preload="metadata" />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
