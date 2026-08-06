import './index.css';
import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/navbar.jsx';
import Hero from './sections/Hero.jsx';

// PERBAIKAN: Gunakan `lazy` (huruf kecil), bukan `Lazy`
const About = lazy(() => import('./sections/About.jsx'));
const Achievements = lazy(() => import('./sections/Achievements.jsx'));
const Projects = lazy(() => import('./sections/Projects.jsx'));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <Hero />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-white text-xl font-medium">
            Loading Section...
          </div>
        }
      >
        <About />
        <Achievements />
        <Projects />
      </Suspense>
    </div>
  );
}