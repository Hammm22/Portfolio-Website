import './index.css';
import { useEffect, useRef, useState } from 'react';
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
  const lenisRef = useRef(null);
  const tlRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;

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

  const scrollToSection = (id) => {
    if (!tlRef.current || !tlRef.current.scrollTrigger) return;
    const st = tlRef.current.scrollTrigger;

    const targetScroll = st.labelToScroll(id);
    if (lenisRef.current && targetScroll !== undefined) {
      lenisRef.current.scrollTo(targetScroll, { duration: 1.5 });
    }
  };

  useGSAP(
    () => {
      if (!mainRef.current) return;

      gsap.set('.z-container', {
        perspective: 2000,
        transformStyle: 'preserve-3d',
      });

      gsap.set('.z-hero', { x: 0, y: 0, z: 0, autoAlpha: 1 });
      gsap.set('.z-about', {
        x: '100vw',
        z: -500,
        rotationY: -30,
        autoAlpha: 0,
      });
      gsap.set('.z-achievements', {
        y: '100vh',
        z: -500,
        rotationX: -30,
        autoAlpha: 0,
      });
      gsap.set('.z-projects', { z: -4000, scale: 0.5, autoAlpha: 0 });
      gsap.set('.z-contact', {
        z: -2000,
        scale: 0.6,
        rotationX: 20,
        filter: 'blur(20px)',
        autoAlpha: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: '+=22000',
          scrub: 1.2,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.12) setActiveSection('home');
            else if (p >= 0.12 && p < 0.45) setActiveSection('about');
            else if (p >= 0.45 && p < 0.65) setActiveSection('achievements');
            else if (p >= 0.65 && p < 0.85) setActiveSection('projects');
            else setActiveSection('contact');
          },
        },
      });

      tlRef.current = tl;

      tl.addLabel('home', 0)
        .to('.z-hero', {
          z: 1500,
          autoAlpha: 0,
          filter: 'blur(20px)',
          duration: 2,
          ease: 'sine.inOut',
        })
        .to(
          '.z-about',
          {
            x: 0,
            z: 0,
            rotationY: 0,
            autoAlpha: 1,
            duration: 2,
            ease: 'sine.inOut',
          },
          '<',
        )
        .addLabel('about');

      tl.to('.z-about > section', {
        yPercent: -65,
        duration: 5,
        ease: 'none',
      });
      tl.to({}, { duration: 1 });

      tl.to('.z-about', {
        x: '-100vw',
        z: 500,
        autoAlpha: 0,
        filter: 'blur(20px)',
        duration: 2,
        ease: 'sine.inOut',
      })
        .to(
          '.z-achievements',
          {
            y: 0,
            z: 0,
            rotationX: 0,
            autoAlpha: 1,
            duration: 2,
            ease: 'sine.inOut',
          },
          '<',
        )
        .addLabel('achievements');
      tl.to({}, { duration: 1 });

      tl.to('.z-achievements', {
        y: '-100vh',
        z: 500,
        autoAlpha: 0,
        filter: 'blur(20px)',
        duration: 2,
        ease: 'sine.inOut',
      })
        .to(
          '.z-projects',
          {
            z: 0,
            scale: 1,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 2,
            ease: 'sine.inOut',
          },
          '<',
        )
        .addLabel('projects');
      tl.to({}, { duration: 1 });

      tl.to('.z-projects', {
        y: '-40vh',
        z: 1200,
        rotationX: -15,
        scale: 1.5,
        autoAlpha: 0,
        filter: 'blur(25px)',
        duration: 2.2,
        ease: 'power2.inOut',
      })
        .to(
          '.z-contact',
          {
            z: 0,
            scale: 1,
            rotationX: 0,
            filter: 'blur(0px)',
            autoAlpha: 1,
            duration: 2.2,
            ease: 'power3.out',
          },
          '<0.3',
        )
        .addLabel('contact');

      tl.to({}, { duration: 1 });
    },
    { scope: mainRef },
  );

  return (
    <div
      ref={mainRef}
      className="relative h-screen w-full overflow-hidden bg-primary text-white"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
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
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <div className="z-container absolute inset-0 z-10">
        <div className="z-hero absolute inset-0 flex items-center justify-center w-full h-full will-change-transform">
          <Hero />
        </div>

        <div className="z-about absolute inset-0 flex justify-center w-full h-full will-change-transform invisible">
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
