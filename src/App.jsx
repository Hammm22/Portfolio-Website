import './index.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import Navbar from './components/navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Achievements from './sections/Achievements.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import BackgroundAudio from './components/BackgroundAudio.jsx';
import Dotbg from './components/bg.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);

  // 1. SETUP LENIS
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    const updateLenis = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // 2. THE 3D GALLERY CAMERA PAN TIMELINE
  useGSAP(() => {
    if (!mainRef.current) return;

    // Aktifkan ruang 3D
    gsap.set('.z-container', { perspective: 2000, transformStyle: 'preserve-3d' });

    // --- SETUP POSISI NGUMPET (Di luar layar) ---
    // Setiap section punya arah kedatangan yang beda-beda biar variatif
    gsap.set('.z-hero', { x: 0, y: 0, z: 0, autoAlpha: 1 });
    
    // About: Ngumpet di sebelah Kanan, agak miring ke dalam
    gsap.set('.z-about', { x: '100vw', z: -500, rotationY: -30, autoAlpha: 0 }); 
    
    // Achievements: Ngumpet di Bawah layar, agak terlipat ke belakang
    gsap.set('.z-achievements', { y: '100vh', z: -500, rotationX: -30, autoAlpha: 0 }); 
    
    // Projects: Ngumpet jauuuuh di dalam lorong gelap (Zoom)
    gsap.set('.z-projects', { z: -4000, scale: 0.5, autoAlpha: 0 }); 
    
    // Contact: Ngumpet di Atas langit-langit
    gsap.set('.z-contact', { y: '-100vh', rotationZ: 5, autoAlpha: 0 }); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: 'top top',
        end: '+=18000', // Durasi scroll
        scrub: 1.2,
        pin: true,
      },
    });

    // --- SCENE 1: CAMERA MAJU & BELOK KANAN ---
    // Hero nge-zoom nembus muka, berbarengan sama About masuk dari kanan kayak pintu berputar
    tl.to('.z-hero', { z: 1500, autoAlpha: 0, filter: 'blur(20px)', duration: 2, ease: 'sine.inOut' })
      .to('.z-about', { x: 0, z: 0, rotationY: 0, autoAlpha: 1, duration: 2, ease: 'sine.inOut' }, "<")
    tl.to({}, { duration: 1 }) // Jeda

    // --- SCENE 2: CAMERA GESER KIRI & NUNDUK BAWAH ---
    // About kebuang ke kiri, berbarengan sama Achievements naik dari bawah
    tl.to('.z-about', { x: '-100vw', z: 500, autoAlpha: 0, filter: 'blur(20px)', duration: 2, ease: 'sine.inOut' })
      .to('.z-achievements', { y: 0, z: 0, rotationX: 0, autoAlpha: 1, duration: 2, ease: 'sine.inOut' }, "<")
    tl.to({}, { duration: 1 }) // Jeda

    // --- SCENE 3: CAMERA TERBANG NAIK & HYPERDRIVE (ZOOM) ---
    // Achievements kebuang ke atas langit, berbarengan sama Projects melesat muncul dari ujung kegelapan
    tl.to('.z-achievements', { y: '-100vh', z: 500, autoAlpha: 0, filter: 'blur(20px)', duration: 2, ease: 'sine.inOut' })
      .to('.z-projects', { z: 0, scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 2, ease: 'sine.inOut' }, "<")
    tl.to({}, { duration: 1 }) // Jeda

    // --- SCENE 4: CAMERA JATUH BEBAS ---
    // Projects anjlok ke bawah lantai, berbarengan sama Contact turun mulus dari atas
    tl.to('.z-projects', { y: '100vh', z: 500, autoAlpha: 0, filter: 'blur(20px)', duration: 2, ease: 'sine.inOut' })
      .to('.z-contact', { y: 0, rotationZ: 0, autoAlpha: 1, duration: 2, ease: 'sine.inOut' }, "<")
    tl.to({}, { duration: 1 }); // Mentok di Contact

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative h-screen w-full overflow-hidden bg-primary text-white">
      
      {/* BACKGROUND (Statis) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Dotbg dotRadius={3.5} dotSpacing={12} bulgeStrength={67} glowRadius={80} sparkle waveAmplitude={0} cursorRadius={500} cursorForce={0.21} bulgeOnly gradientFrom="#043132" gradientTo="#aaddf1" glowColor="#3ccbfff" />
      </div>

      <Navbar />

      {/* Z-CONTAINER */}
      <div className="z-container absolute inset-0 z-10">
        
        <div className="z-hero absolute inset-0 flex items-center justify-center w-full h-full will-change-transform">
          <Hero />
        </div>

        <div className="z-about absolute inset-0 flex items-center justify-center w-full h-full will-change-transform invisible">
          <About />
        </div>

        <div className="z-achievements absolute inset-0 flex items-center justify-center w-full h-full will-change-transform invisible">
          <Achievements />
        </div>

        <div className="z-projects absolute inset-0 flex items-center justify-center w-full h-full will-change-transform invisible">
          <Projects />
        </div>

        <div className="z-contact absolute inset-0 flex flex-col items-center justify-center w-full h-full will-change-transform invisible overflow-y-auto pt-24 pb-10">
          <Contact />
          <Footer />
        </div>

      </div>

      <BackgroundAudio />
    </div>
  );
}