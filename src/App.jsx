import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './index.css';
import Glass from './components/Glass.jsx';
import Navbar from './components/navbar.jsx';
import Dotbg from './components/bg.jsx';
import Card from './components/card.jsx';
import BounceCards from './components/BounceCard.jsx';

const Projects = [
  {
    id: 1,
    name: 'web1',
    stack: 'Laravel, TailwindCSS, React',
    description: 'test description',
    // Perbaikan: Tambahkan https://
    github: 'https://github.com/Hammm22',
  },
  {
    id: 2,
    name: 'web2',
    stack: 'Express, TailwindCSS',
    description: 'test description',
    github: 'https://github.com/Hammm22',
  },
  {
    id: 3,
    name: 'web3',
    stack: 'Express, TailwindCSS',
    description: 'test description',
    github: 'https://github.com/Hammm22',
  },
  {
    id: 4,
    name: 'web4',
    stack: 'Express, TailwindCSS',
    description: 'test description',
    github: 'https://github.com/Hammm22',
  },
];

const pdfUrls = [
  'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/58f9d943-8d44-4e97-abae-841cc569a483.pdf',
  'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/b706fe14-ff9b-4860-9580-d8942d7ffb60.pdf',
  'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/b706fe14-ff9b-4860-9580-d8942d7ffb60.pdf',
  'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/d95d5183-8ffe-4dea-8b43-c64fb897e4f2.pdf',
];

const transformStyles = [
  'rotate(0deg) translate(-70px)',
  'rotate(-5deg)',
  'rotate(5deg) translate(70px)',
  'rotate(-5deg) translate(150px)',
];
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      gsap.from('.hero-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      const aboutTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
        },
      });

      aboutTL.from('.about-card', {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: -15,
        transformOrigin: 'top center',
        duration: 1,
        stagger: {
          amount: 0.6,
          ease: 'power2.out',
        },
        ease: 'back.out',
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      });

      gsap.from('.achievement-title', {
        scrollTrigger: {
          trigger: '#achievements',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className=" bg-primary min-h-screen">
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
        className="min-h-screen w-full flex justify-center items-center py-16 px-4"
      >
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

      {/* Section 3: Achievements */}
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

      {/* Section 4: Projects */}
      <section
        id="projects"
        className="min-h-screen w-full flex flex-col justify-center py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-white text-4xl font-bold mb-10 text-center">
          My Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 place-items-center w-full">
          {Projects.map((data) => (
            <Card
              key={data.id}
              className="project-card w-full max-w-sm h-80 flex flex-col items-center justify-center p-6 text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="text-white text-2xl font-semibold mb-2">
                Project {data.id}
              </h3>
              <h4 className="text-secondary text-lg mb-2">{data.name}</h4>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {data.description}
              </p>

              <div className="mt-auto">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  View GitHub
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
