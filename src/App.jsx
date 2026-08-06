import './index.css';
import gsap from 'gsap';
import Lenis from 'lenis';
import { useGSAP } from '@gsap/react';
import Dotbg from './components/bg.jsx';
import Card from './components/card.jsx';
import { useRef, useEffect } from 'react';
import Glass from './components/Glass.jsx';
import Navbar from './components/navbar.jsx';
import pdfUrls from './data/Certificates.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BounceCards from './components/BounceCard.jsx';
import Projects from './data/Projects.js'
const transformStyles = [
  'rotate(0deg) translate(-70px)',
  'rotate(-5deg)',
  'rotate(5deg) translate(70px)',
  'rotate(-5deg) translate(150px)',
];

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
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
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

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
        },
      );

      const aboutTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
        },
      });

      aboutTL.fromTo(
        '.about-card',
        { y: 100, opacity: 0, scale: 0.8, rotationX: -15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          transformOrigin: 'top center',
          duration: 1,
          stagger: { amount: 0.6, ease: 'power2.out' },
          ease: 'back.out',
        },
      );

      gsap.fromTo(
        '.project-card',
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        },
      );

      gsap.fromTo(
        '.achievement-title',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#achievements',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        '.projects-title',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        '.about-title',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#about',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        },
      );

      const refreshScroll = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => clearTimeout(refreshScroll);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="bg-primary min-h-screen">
      <Navbar />
      <main
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden"
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

        <div className="relative z-10 text-left text-white max-w-4xl w-full mt-20">
          <h1 className="hero-anim text-4xl md:text-5xl font-lg leading-tight">
            Hello, My name is{' '}
            <span className="font-bold text-secondary block md:inline">
              Ilham Dwi Arsandy.
            </span>
          </h1>

          <p className="hero-anim text-xl md:text-3xl font-normal mt-4 max-w-2xl text-gray-200">
            A high school student with a deep passion for technology. Constantly
            learning, experimenting with code.
          </p>

          <div className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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
      </main>

      <section
        id="about"
        className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4"
      >
        <h1 className="about-title text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
          About Me
        </h1>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 auto-rows-[200px] gap-4">
          <Card className="about-card col-span-1 sm:col-span-2 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex items-center justify-center text-center">
            <h2 className="text-white text-2xl font-semibold">
              The Introduction & Background
            </h2>
          </Card>

          <Card className="about-card col-span-1 sm:col-span-1 md:col-start-5 md:row-start-1 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex items-center justify-center text-center">
            <h2 className="text-white text-2xl font-semibold">Current Focus</h2>
          </Card>

          <Card className="about-card col-span-1 sm:col-span-1 md:col-start-1 md:row-start-3 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex items-center justify-center text-center">
            <h2 className="text-white text-2xl font-semibold">
              My Tech Stack & Tools
            </h2>
          </Card>

          <Card className="about-card col-span-1 sm:col-span-2 md:col-start-4 md:row-start-3 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex items-center justify-center text-center">
            <h2 className="text-white text-2xl font-semibold">
              Interest / Hobby
            </h2>
          </Card>
        </div>
      </section>

      <section
        id="achievements"
        className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4 overflow-hidden"
      >
        <h2 className="achievement-title text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
          My Achievements
        </h2>
        <BounceCards
          className="custom-bounceCards max-w-full"
          pdfUrls={pdfUrls}
          containerWidth={500}
          containerHeight={400}
          animationDelay={0.3}
          animationStagger={0.13}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover={true}
        />
      </section>

      <section
        id="projects"
        className="min-h-screen w-full flex flex-col justify-center py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <h2 className="projects-title text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
          My Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center w-full">
          {Projects.map((data) => (
            <Card
              key={data.id}
              className="project-card group relative w-full max-w-sm h-[340px] flex flex-col p-7 text-left rounded-2xl bg-white/[0.03] border border-white/10 hover:border-secondary/50 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-gray-500 font-mono font-medium tracking-widest">
                  Project 0{data.id}
                </span>
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-link inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <h4>Link to GitHub</h4>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
              <div className="mb-5">
                <h3 className="text-white text-3xl font-bold tracking-tight mb-4 group-hover:text-secondary transition-colors duration-300">
                  {data.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.stack.split(',').map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mt-auto">
                {data.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
