"use client";

import { useAudio } from "@/src/contexts/AudioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSpotify,
  faApple,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import pb from "@/src/lib/pocketbase";

export default function GlobalAudioPlayer() {
  const { state, togglePlayPause, seek, setVolume } = useAudio();
  const [imageUrl, setImageUrl] = useState<string>("/placeholder-cover.svg");
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);

  // Load track artwork
  useEffect(() => {
    if (state.currentTrack?.coverImage) {
      const pbImageUrl = pb.getFileUrl(
        state.currentTrack,
        state.currentTrack.coverImage
      );
      setImageUrl(pbImageUrl);
    } else {
      setImageUrl("/placeholder-cover.svg");
    }
  }, [state.currentTrack]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
    setIsMuted(volume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(state.volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  // Don't render if no track is selected
  if (!state.currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src={imageUrl}
                fill
                className="object-cover"
                alt={`${state.currentTrack.trackName} cover`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-black text-sm truncate">
                {state.currentTrack.trackName}
              </h4>
              <p className="text-gray-600 text-xs truncate">
                {state.currentTrack.artistName}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FontAwesomeIcon
                  icon={state.isPlaying ? faPause : faPlay}
                  className="text-sm"
                />
              )}
            </button>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs text-gray-500 w-10 text-right">
                {formatTime(state.currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={state.duration || 0}
                value={state.currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${
                    (state.currentTime / (state.duration || 1)) * 100
                  }%, #d1d5db ${
                    (state.currentTime / (state.duration || 1)) * 100
                  }%, #d1d5db 100%)`,
                }}
              />
              <span className="text-xs text-gray-500 w-10">
                {formatTime(state.duration)}
              </span>
            </div>
          </div>

          {/* Volume and Links */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Volume Control */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <FontAwesomeIcon
                  icon={
                    isMuted || state.volume === 0 ? faVolumeMute : faVolumeUp
                  }
                  className="text-sm"
                />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={state.volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Platform Links */}
            <div className="flex items-center gap-2">
              {state.currentTrack.spotifyLink && (
                <a
                  href={state.currentTrack.spotifyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-500 hover:text-green-600 transition-colors"
                  title="Listen on Spotify"
                >
                  <FontAwesomeIcon icon={faSpotify} className="text-sm" />
                </a>
              )}
              {state.currentTrack.appleMusicLink && (
                <a
                  href={state.currentTrack.appleMusicLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-800 hover:text-black transition-colors"
                  title="Listen on Apple Music"
                >
                  <FontAwesomeIcon icon={faApple} className="text-sm" />
                </a>
              )}
              {state.currentTrack.youtubeLink && (
                <a
                  href={state.currentTrack.youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-500 hover:text-red-600 transition-colors"
                  title="Watch on YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} className="text-sm" />
                </a>
              )}
              {state.currentTrack.soundCloudLink && (
                <a
                  href={state.currentTrack.soundCloudLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                  title="Listen on SoundCloud"
                >
                  <FontAwesomeIcon icon={faSoundcloud} className="text-sm" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
