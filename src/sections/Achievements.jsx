import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BounceCards from '../components/BounceCard.jsx';
import pdfUrls from '../data/Certificates.js';

gsap.registerPlugin(ScrollTrigger);

const transformStyles = [
  'rotate(0deg) translate(-70px)',
  'rotate(-5deg)',
  'rotate(5deg) translate(70px)',
  'rotate(-5deg) translate(150px)',
];

export default function Achievements() {
  const containerRef = useRef(null);
  useEffect(() => {
    const refreshScroll = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(refreshScroll);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        '.achievement-title',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
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
  );
}
