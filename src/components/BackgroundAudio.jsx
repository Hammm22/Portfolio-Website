<<<<<<< HEAD
import { useRef, useState } from 'react';
=======
import { useCallback, useEffect, useState, useRef } from 'react';
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import useReducedMotion from '../hooks/useReducedMotion';

const preferenceKey = 'background-audio-enabled';

export default function BackgroundAudio() {
  const reducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [resumeOnMount] = useState(() => {
    try { return !reducedMotion && localStorage.getItem(preferenceKey) === 'true'; }
    catch { return false; }
  });
  const audioRef = useRef(null);
<<<<<<< HEAD
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
=======
  const playRequest = useRef(0);

  const play = useCallback(() => {
    const request = ++playRequest.current;
    const failed = () => {
      if (request === playRequest.current) setIsPlaying(false);
    };
    try { audioRef.current.play()?.catch(failed); }
    catch { failed(); }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const requests = playRequest;
    if (resumeOnMount) play();
    return () => {
      ++requests.current;
      audio.pause();
    };
  }, [resumeOnMount, play]);

  useEffect(() => {
    if (reducedMotion) {
      ++playRequest.current;
      audioRef.current.pause();
    }
  }, [reducedMotion]);

  const stopped = () => {
    ++playRequest.current;
    setIsPlaying(false);
  };

  const togglePlay = () => {
    try { localStorage.setItem(preferenceKey, String(!isPlaying)); }
    catch { /* Playback remains available when storage is blocked. */ }
    if (isPlaying) audioRef.current.pause();
    else play();
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
<<<<<<< HEAD
      <audio
        ref={audioRef}
        src="/bgaudio.mp3"
        loop
        preload="none"
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
=======
      <audio ref={audioRef} src="/bgaudio.mp3" loop preload="none"
        onPlay={() => setIsPlaying(true)} onPause={stopped} onError={stopped} onEnded={stopped} />
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
      <button
        type="button"
        onClick={togglePlay}
        disabled={isPending}
        aria-pressed={isPlaying}
        className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-white/[0.05] border backdrop-blur-md transition-all duration-500 shadow-lg cursor-pointer ${isPlaying ? 'border-secondary/50 bg-secondary/10 shadow-secondary/20' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.1]'}`}
        aria-label="Toggle Background Music"
        aria-pressed={isPlaying}
      >
        <span aria-hidden="true"
          className={`text-sm ${isPlaying ? `text-secondary ${reducedMotion ? '' : 'animate-bounce'}` : 'text-gray-400'}`}
        >
          {isPlaying ? <FaMusic /> : <FaVolumeMute />}
        </span>

        <span className="text-xs font-mono font-medium text-gray-300 tracking-wider">
          {isPlaying ? 'Playing Background Music' : 'Audio OFF'}
        </span>

        {isPlaying && !reducedMotion && (
          <span aria-hidden="true" className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-secondary animate-pulse h-full"></span>
            <span className="w-0.5 bg-secondary animate-pulse h-2 delay-100"></span>
            <span className="w-0.5 bg-secondary animate-pulse h-3.5 delay-200"></span>
          </span>
        )}
      </button>
    </div>
  );
}
