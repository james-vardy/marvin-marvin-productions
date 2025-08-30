import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faBackward,
  faForward,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Track } from "@/types";
import pb from "@/lib/pocketbase";

interface StreamingAudioPlayerProps {
  track: Track;
}

type AudioQuality = "preview" | "streaming" | "master";

export default function StreamingAudioPlayer({
  track,
}: StreamingAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuality, setCurrentQuality] = useState<AudioQuality>("preview");
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get audio URL based on quality preference
  const getAudioUrl = (quality: AudioQuality): string | null => {
    switch (quality) {
      case "preview":
        return track.previewFile
          ? pb.getFileUrl(track, track.previewFile)
          : null;
      case "streaming":
        return track.streamingFile
          ? pb.getFileUrl(track, track.streamingFile)
          : null;
      case "master":
        return track.trackFile ? pb.getFileUrl(track, track.trackFile) : null;
      default:
        return null;
    }
  };

  // Get best available quality
  const getBestAvailableQuality = (): AudioQuality => {
    if (track.previewFile) return "preview";
    if (track.streamingFile) return "streaming";
    if (track.trackFile) return "master";
    return "preview";
  };

  const currentAudioUrl = getAudioUrl(currentQuality);

  // Switch audio quality
  const switchQuality = async (quality: AudioQuality) => {
    const url = getAudioUrl(quality);
    if (!url) return;

    const wasPlaying = isPlaying;
    const currentTimeBackup = currentTime;

    setIsLoading(true);
    setIsPlaying(false);
    setIsAudioLoaded(false);

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.currentTime = currentTimeBackup;

      if (wasPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error resuming playback:", error);
        }
      }
    }

    setCurrentQuality(quality);
  };

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsAudioLoaded(true);
      setIsLoading(false);
    }
  };

  const handleCanPlay = () => {
    if (audioRef.current) {
      setIsAudioLoaded(true);
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgress = () => {
    if (audioRef.current) {
      const buffered = audioRef.current.buffered;
      if (buffered.length > 0) {
        const loaded = buffered.end(buffered.length - 1);
        const total = audioRef.current.duration;
        if (total > 0) {
          setBufferProgress((loaded / total) * 100);
        }
      }
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current || !isAudioLoaded) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current && isAudioLoaded) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipBackward = () => {
    if (audioRef.current && isAudioLoaded) {
      const newTime = Math.max(0, audioRef.current.currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipForward = () => {
    if (audioRef.current && isAudioLoaded) {
      const newTime = Math.min(duration, audioRef.current.currentTime + 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getQualityLabel = (quality: AudioQuality) => {
    switch (quality) {
      case "preview":
        return "Preview (30s)";
      case "streaming":
        return "Full Track (MP3)";
      case "master":
        return "Master Quality (WAV)";
      default:
        return "Unknown";
    }
  };

  const getFileSizeEstimate = (quality: AudioQuality) => {
    const durationMins = duration / 60;
    switch (quality) {
      case "preview":
        return "~1MB";
      case "streaming":
        return `~${Math.round(durationMins * 1.2)}MB`;
      case "master":
        return `~${Math.round(durationMins * 10)}MB`;
      default:
        return "Unknown";
    }
  };

  // Initialize with best available quality
  useEffect(() => {
    const bestQuality = getBestAvailableQuality();
    setCurrentQuality(bestQuality);
  }, [track]);

  // Load audio when quality changes
  useEffect(() => {
    const url = getAudioUrl(currentQuality);
    if (url && audioRef.current) {
      setIsLoading(true);
      setIsAudioLoaded(false);
      audioRef.current.src = url;
    }
  }, [currentQuality, track]);

  if (!currentAudioUrl) {
    return (
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
        <div className="text-center text-gray-500 text-sm">
          No audio available for this track
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onProgress={handleProgress}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.error("Audio error:", e)}
        preload="metadata"
      />

      {/* Quality Selector */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {(["preview", "streaming", "master"] as AudioQuality[]).map(
            (quality) => {
              const url = getAudioUrl(quality);
              if (!url) return null;

              return (
                <button
                  key={quality}
                  onClick={() => switchQuality(quality)}
                  disabled={isLoading}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    currentQuality === quality
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } disabled:opacity-50`}
                >
                  {getQualityLabel(quality)}
                </button>
              );
            }
          )}
        </div>

        <div className="text-xs text-gray-500">
          {getFileSizeEstimate(currentQuality)}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-4 mb-3">
        <button
          onClick={skipBackward}
          disabled={!isAudioLoaded || isLoading}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Skip back 10 seconds"
        >
          <FontAwesomeIcon
            icon={faBackward}
            className="text-gray-600 text-sm"
          />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={!isAudioLoaded || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              className="text-lg"
            />
          )}
        </button>

        <button
          onClick={skipForward}
          disabled={!isAudioLoaded || isLoading}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Skip forward 10 seconds"
        >
          <FontAwesomeIcon icon={faForward} className="text-gray-600 text-sm" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xs text-gray-500 w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <div className="flex-1 relative h-2">
          {/* Buffer progress background (grey shadow) */}
          <div className="absolute inset-0 w-full h-2 bg-gray-200 rounded-lg">
            <div
              className="bg-gray-300 h-2 rounded-lg transition-all duration-300"
              style={{ width: `${bufferProgress}%` }}
            />
          </div>
          {/* Main progress bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            disabled={!isAudioLoaded || isLoading}
            className="absolute inset-0 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer slider disabled:cursor-not-allowed z-10"
            style={{
              margin: 0,
              padding: 0,
              background: isAudioLoaded
                ? `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    (currentTime / (duration || 1)) * 100
                  }%, transparent ${
                    (currentTime / (duration || 1)) * 100
                  }%, transparent 100%)`
                : "transparent",
            }}
          />
        </div>
        <span className="text-xs text-gray-500 w-10 text-left">
          {isAudioLoaded ? formatTime(duration) : "--:--"}
        </span>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faVolumeUp} className="text-gray-400 text-sm" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />

        {/* Download Master Quality */}
        {track.trackFile && currentQuality !== "master" && (
          <a
            href={pb.getFileUrl(track, track.trackFile)}
            download
            className="ml-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            title="Download master quality"
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="text-gray-600 text-sm"
            />
          </a>
        )}
      </div>
    </div>
  );
}
