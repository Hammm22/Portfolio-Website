import { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(timeString);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative w-full border-t border-white/10 bg-neutral-900 backdrop-blur-lg py-6 px-4 md:px-8 mt-10 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm font-mono text-gray-500">
        
        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 cursor-default group hover:border-white/20 transition-all duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="group-hover:text-gray-300 transition-colors">
            SYS.STATUS : <span className="text-green-500 font-bold">ONLINE</span>
          </span>
        </div>

        <div className="text-center cursor-default group">
          <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
            &copy; {new Date().getFullYear()} Ilham Dwi Arsandy
          </span>
          <span className="hidden md:inline mx-2 text-gray-600">|</span>
          <br className="md:hidden" />
          <span className="group-hover:text-secondary transition-colors duration-300">
            Built on Arch Linux, fueled by curiosity.
          </span>
        </div>

        <div className="flex flex-col items-center md:items-end bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 cursor-default group hover:bg-white/10 transition-all">
          <span className="text-gray-400 group-hover:text-white transition-colors">
            LOC : Jakarta, ID
          </span>
          <span className="text-secondary font-bold tracking-widest mt-0.5">
            {time} <span className="text-[10px] text-gray-500">WIB</span>
          </span>
        </div>

      </div>
    </footer>
  );
}