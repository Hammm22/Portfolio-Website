import { useRef, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from './card';

gsap.registerPlugin(ScrollTrigger);

export default function GithubStats() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.github-anim',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
        },
      );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  });
  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto mt-16 px-4">
      <Card className="github-anim w-full rounded-2xl p-6 md:p-10 flex flex-col items-center text-center border-white/10 transition-all duration-500 overflow-hidden">
        <h2 className="text-white text-3xl font-bold mb-8">
          Days i <span className="text-secondary">Code</span>
        </h2>

        <div className="w-full flex justify-center overflow-x-auto pb-4 text-gray-300 [&_text]:fill-gray-300 [&_span]:text-gray-300">
          <div className="min-w-[800px] md:min-w-full flex justify-center">
            <GitHubCalendar
              username="Hammm22"
              colorScheme="dark"
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              theme={{
                dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
