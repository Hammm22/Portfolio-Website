import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Dotbg from '../components/bg.jsx';
import Glass from '../components/Glass.jsx';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
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
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Dotbg
          dotRadius={3.5}
          dotSpacing={12}
          bulgeStrength={67}
          glowRadius={80}
          sparkle
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.21}
          bulgeOnly
          gradientFrom="#043132"
          gradientTo="#aaddf1"
          glowColor="#3ccbfff"
        />
      </div>

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 text-left text-white max-w-6xl w-full mt-20">
        <div className="flex-1 w-full text-center md:text-left">
          <h1 className="hero-anim text-4xl md:text-5xl font-lg leading-tight">
            Hello, My name is{' '}
            <span className="font-bold text-secondary block md:inline">
              Ilham Dwi Arsandy.
            </span>
          </h1>

          <p className="hero-anim text-xl md:text-3xl font-normal mt-4 max-w-2xl text-gray-200 mx-auto md:mx-0">
            A high school student with a deep passion for technology. Constantly
            learning, experimenting with code.
          </p>

          <div className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
            <a href="#projects">
              <Glass width={200} height={60}>
                <span className="text-xl md:text-2xl font-medium hover:text-secondary transition">
                  My Projects
                </span>
              </Glass>
            </a>

            <a href="#contact">
              <Glass width={200} height={60}>
                <span className="text-xl md:text-2xl font-medium hover:text-secondary transition">
                  Contact Me
                </span>
              </Glass>
            </a>
          </div>
        </div>

        <div className="hero-anim flex-1 w-full flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(4,49,50,0.5)]">
            <img
              src="/Photo.webp" 
              alt="Ilham Dwi Arsandy"
              className="w-full h-full object-cover object-center"
              fetchPriority='high'
            />
          </div>
        </div>

      </div>
    </main>
  );
}