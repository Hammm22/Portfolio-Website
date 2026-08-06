import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../components/card.jsx';
import techIcons from '../data/TechIcons.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-title',
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

      const aboutTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
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
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4"
    >
      <h1 className="about-title text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
        About Me
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 auto-rows-[200px] gap-4">
        <Card className="about-card col-span-1 sm:col-span-2 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center">
          <h2 className="text-secondary text-3xl font-semibold">
            The Introduction & Background
          </h2>
        </Card>

        <Card className="about-card col-span-1 sm:col-span-1 md:col-start-5 md:row-start-1 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex flex-col justify-evenly items-center text-center">
          <h2 className="text-secondary text-3xl font-semibold">
            Current Focus
          </h2>
          <p className="text-white text-xl font-normal">
            Currently, I am heavily focused on crafting immersive web
            experiences. I spend my time mastering modern front-end tools to
            build fluid, animated, and highly responsive user interfaces. <br />
            <br />
            Alongside that, I'm continuously expanding my back-end knowledge to
            build robust full-stack applications. I am always eager to learn
            new programming paradigms and application lifecycles.
          </p>
        </Card>

        <Card className="about-card col-span-1 sm:col-span-1 md:col-start-1 md:row-start-3 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center">
          <h2 className="text-secondary text-3xl font-semibold mb-4">
            My Tech Stack & Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {techIcons.map((tech, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-default"
              >
                <span
                  className={`text-xl text-gray-500 transition-colors duration-300 ${tech.color}`}
                >
                  {tech.icon}
                </span>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="about-card col-span-1 sm:col-span-2 md:col-start-4 md:row-start-3 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center">
          <h2 className="text-secondary text-3xl font-semibold mb-4">
            Interest / Hobby
          </h2>
          <div className="text-white text-xl font-normal">
            When I'm not writing code, usually i'm doing some hobbies like
            playing games and do something with Linux, playing badminton or
            hangout with my friends.
            <br />
            <br />
            The games i usually playing with is:
            <ul className="list-disc text-left ml-8 mt-2">
              <li>Roblox Player</li>
              <li>CarX Street</li>
              <li>PUBG Mobile</li>
              <li>Clash Royale</li>
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}