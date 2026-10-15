import { useRef } from 'react';
<<<<<<< HEAD
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Glass from '../components/Glass.jsx';
import DecryptedText from '../components/Decrypt.jsx';

export default function Hero({ reducedMotion = false }) {
=======
import useReducedMotion from '../hooks/useReducedMotion.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Glass from '../components/Glass.jsx';
import DecryptedText from '../components/Decrypt.jsx';

export default function Hero({ onNavigate }) {
  const reducedMotion = useReducedMotion();
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.hero-anim',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.5,
        },
      );
    },
    { scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <main
      ref={containerRef}
      id="home"
      className="relative flex flex-col items-center justify-center h-full w-full px-4 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 text-left text-white max-w-6xl w-full mt-20">
        <div className="flex-1 w-full text-center md:text-left">
          <h1 className="hero-anim text-4xl md:text-5xl font-lg leading-tight">
<<<<<<< HEAD
            Hello, My name is{' '}
            {reducedMotion ? <span className="font-bold text-secondary block md:inline">Ilham Dwi Arsandy.</span> : <DecryptedText
=======
            Hello, my name is{' '}
            <DecryptedText
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
              className="revealed font-bold text-secondary block md:inline"
              encryptedClassName="text-red-500/70 font-bold"
              text="Ilham Dwi Arsandy."
              speed={80}
              maxIterations={12}
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              animateOn="view"
            />}
          </h1>

          <p className="hero-anim text-xl md:text-3xl font-normal mt-4 max-w-2xl text-gray-200 mx-auto md:mx-0">
            I’m a high school student who enjoys building websites, learning new
            tools, and experimenting with code.
          </p>

          <div className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
            <button type="button" onClick={() => onNavigate('projects')}>
              <Glass width={200} height={60}>
                <span className="text-xl md:text-2xl font-medium hover:text-secondary transition">
                  My Projects
                </span>
              </Glass>
            </button>

            <button type="button" onClick={() => onNavigate('contact')}>
              <Glass width={200} height={60}>
                <span className="text-xl md:text-2xl font-medium hover:text-secondary transition">
                  Contact Me
                </span>
              </Glass>
            </button>
          </div>
        </div>

        <div className="hero-anim flex-1 w-full flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(4,49,50,0.5)]">
            <img
              src="/Photo-768.webp"
              srcSet="/Photo-480.webp 480w, /Photo-768.webp 768w, /Photo-1024.webp 1024w"
              sizes="(min-width: 768px) 384px, 256px"
              alt="Ilham Dwi Arsandy"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
              width="768"
              height="994"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
