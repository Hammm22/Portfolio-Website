import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Card from '../components/card';
import ContactData from '../data/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact-title',
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

      gsap.fromTo(
        '.contact-card',
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.5)',
        },
      );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      className="min-h-screen w-full flex flex-col justify-center py-16 px-4 md:px-8 max-w-5xl mx-auto bg-primary"
      ref={containerRef}
      id="contact"
    >
      <div className="text-center mb-16">
        <h2 className="contact-title text-white text-4xl md:text-6xl font-extrabold mb-6">
          Get In Touch
        </h2>
        <p className="contact-title text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Currently open for new opportunities or freelance projects. Whether
          you have a question or just want to say hi, I'll try my best to get
          back to you!
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center w-full">
        {ContactData.map((method) => (
          <a
            key={method.id}
            href={method.link}
            target="_blank"
            rel="noopener noreffer"
            className="w-full"
          >
            <Card className="contact-card group relative w-full h-[200px] flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-white/[0.03] border border-white/10 hover:border-secondary/50 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {method.icon}
              <h3 className="text-white text-lg font-bold mb-1">
                {method.name}
              </h3>
              <p className="text-gray-400 text-sm font-medium group-hover:text-gray-200 transition-colors duration-300">
                {method.value}
              </p>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
