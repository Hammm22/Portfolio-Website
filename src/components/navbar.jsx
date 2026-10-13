import { useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Glass from '../components/Glass';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ activeSection, onNavigate }) {
  const reducedMotion = useReducedMotion();
  const navRef = useRef(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me', shortLabel: 'About' },
    { id: 'achievements', label: 'Achievements', shortLabel: 'Awards' },
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
        width="min(750px, calc(100% - 16px))"
        height={60}
        opacity={0.71}
        borderRadius={32}
        mixBlendMode="screen"
      >
        <ul className="w-full h-full grid grid-cols-5 items-center">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              <button
                type="button"
                onClick={() => onNavigate(link.id)}
                aria-label={link.label}
                aria-current={activeSection === link.id ? 'location' : undefined}
                className={`min-h-11 min-w-11 w-full whitespace-nowrap text-[11px] sm:text-sm md:text-lg font-bold transition-all duration-300 cursor-pointer ${
                  activeSection === link.id ? 'text-secondary' : 'text-third hover:text-secondary'
                }`}
              >
                <span className="sm:hidden">{link.shortLabel || link.label}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </button>

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