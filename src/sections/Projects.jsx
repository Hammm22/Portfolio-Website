import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../components/card.jsx';
import ProjectsData from '../data/Projects.js';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.projects-title',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.project-card',
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      className="min-h-screen w-full flex flex-col justify-center py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2 className="projects-title text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
        My Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center w-full">
        {ProjectsData.map((data) => (
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
  );
}