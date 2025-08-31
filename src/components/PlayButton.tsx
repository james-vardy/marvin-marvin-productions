"use client";

import { useAudio } from "@/src/contexts/AudioContext";
import { Track } from "@/src/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

interface PlayButtonProps {
  track: Track;
  size?: "sm" | "md" | "lg";
}

export default function PlayButton({ track, size = "md" }: PlayButtonProps) {
  const { state, playTrack } = useAudio();

  const isCurrentTrack = state.currentTrack?.id === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;
  const isLoading = isCurrentTrack && state.isLoading;

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  const handleClick = () => {
    playTrack(track);
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className={
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg"
          }
        />
      )}
    </button>
  );
}
