import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Glass from '../components/Glass';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ activeSection, reducedMotion = false }) {
  const navRef = useRef(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, { scope: navRef, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <nav ref={navRef} className="fixed top-6 w-full flex justify-center z-50">
      <Glass
        displace={0.5}
        distortionScale={20}
        brightness={27}
        width="min(750px, calc(100vw - 24px))"
        height={60}
        opacity={0.71}
        borderRadius={32}
        mixBlendMode="screen"
      >
        <ul className="w-full h-full flex flex-row justify-evenly items-center px-2 md:px-4 gap-1 md:gap-4">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                aria-current={activeSection === link.id ? 'location' : undefined}
                className={`text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold transition-all duration-300 cursor-pointer ${
                  activeSection === link.id ? 'text-secondary' : 'text-third hover:text-secondary'
                }`}
              >
                {link.label}
              </a>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0'
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </Glass>
    </nav>
  );
}