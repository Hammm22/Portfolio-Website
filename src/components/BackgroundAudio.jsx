import { useRef, useState } from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [isPending, setIsPending] = useState(false);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isPending) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setIsPending(true);
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('audio playback failed:', error);
      setIsPlaying(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/bgaudio.mp3"
        loop
        preload="none"
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlay}
        disabled={isPending}
        aria-pressed={isPlaying}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-white/[0.05] border backdrop-blur-md transition-all duration-500 shadow-lg cursor-pointer ${isPlaying ? 'border-secondary/50 bg-secondary/10 shadow-secondary/20' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.1]'}`}
        aria-label="Toggle Background Music"
      >
        <span
          className={`text-sm ${isPlaying ? 'text-secondary animate-bounce' : 'text-gray-400'}`}
        >
          {isPlaying ? <FaMusic /> : <FaVolumeMute />}
        </span>

        <span className="text-xs font-mono font-medium text-gray-300 tracking-wider">
          {isPlaying ? 'Playing Background Music' : 'Audio OFF'}
        </span>

        {isPlaying && (
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-secondary animate-pulse h-full"></span>
            <span className="w-0.5 bg-secondary animate-pulse h-2 delay-100"></span>
            <span className="w-0.5 bg-secondary animate-pulse h-3.5 delay-200"></span>
          </span>
        )}
      </button>
    </div>
  );
}
