import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Card from '../components/card.jsx';
import techIcons from '../data/TechIcons.jsx';
import GithubStats from '../components/GithubStats.jsx';

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.about-card',
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.2)' }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="w-full flex flex-col items-center pt-24 pb-24 px-4">
      <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
        About Me
      </h2>
      
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 auto-rows-[200px] gap-4">
        {/* Card 1: Introduction */}
        <Card className="about-card col-span-1 sm:col-span-2 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center  border border-white/10">
          <h2 className="text-secondary text-3xl font-semibold">The Introduction & Background</h2>
        </Card>

        {/* Card 2: Current Focus */}
        <Card className="about-card col-span-1 sm:col-span-1 md:col-start-5 md:row-start-1 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex flex-col justify-evenly items-center text-center  border border-white/10">
          <h2 className="text-secondary text-3xl font-semibold mb-2">Current Focus</h2>
          <p className="text-white text-base md:text-lg font-normal leading-relaxed">
            Currently, I am heavily focused on crafting immersive web
            experiences. I spend my time mastering modern front-end tools to
            build fluid, animated, and highly responsive user interfaces. <br />
            <br />
            Alongside that, I'm continuously expanding my back-end knowledge to
            build robust full-stack applications. I am always eager to learn new
            programming paradigms and application lifecycles.
          </p>
        </Card>

        {/* Card 3: Tech Stack */}
        <Card className="about-card col-span-1 sm:col-span-1 md:col-start-1 md:row-start-3 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center  border border-white/10">
          <h2 className="text-secondary text-3xl font-semibold mb-4">My Tech Stack & Tools</h2>
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {techIcons.map((tech, index) => (
              <div key={index} className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all cursor-default">
                <span className={`text-xl text-gray-500 transition-colors ${tech.color}`}>{tech.icon}</span>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 4: Hobby & Games */}
        <Card className="about-card col-span-1 sm:col-span-2 md:col-start-4 md:row-start-3 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center  border border-white/10">
          <h2 className="text-secondary text-3xl font-semibold mb-4">Interest / Hobby</h2>
          <div className="text-white text-base md:text-lg font-normal">
            When I'm not writing code, usually i'm doing some hobbies like
            playing games and do something with Linux, playing badminton or
            hangout with my friends.
            <br />
            <br />
            The games i usually playing with is:
            <ul className="list-disc text-left ml-8 mt-2 space-y-1">
              <li>Roblox Player</li>
              <li>CarX Street</li>
              <li>PUBG Mobile</li>
              <li>Clash Royale</li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="about-card w-full max-w-6xl mt-4">
        <GithubStats />
      </div>
    </section>
  );
}