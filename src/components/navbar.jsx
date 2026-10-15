import { useRef } from 'react';
<<<<<<< HEAD
=======
import useReducedMotion from '../hooks/useReducedMotion.js';
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Glass from '../components/Glass';

gsap.registerPlugin(ScrollTrigger);

<<<<<<< HEAD
export default function Navbar({ activeSection, reducedMotion = false }) {
=======
export default function Navbar({ activeSection, onNavigate }) {
  const reducedMotion = useReducedMotion();
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
  const navRef = useRef(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me', shortLabel: 'About' },
    { id: 'achievements', label: 'Achievements', shortLabel: 'Awards' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useGSAP(() => {
<<<<<<< HEAD
    if (reducedMotion) return;
=======
      if (reducedMotion) return;
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
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
<<<<<<< HEAD
        width="min(750px, calc(100vw - 24px))"
=======
        width="min(750px, calc(100% - 16px))"
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
        height={60}
        opacity={0.71}
        borderRadius={32}
        mixBlendMode="screen"
      >
        <ul className="w-full h-full grid grid-cols-5 items-center">
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
<<<<<<< HEAD
              <a
                href={`#${link.id}`}
                aria-current={activeSection === link.id ? 'location' : undefined}
                className={`text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold transition-all duration-300 cursor-pointer ${
                  activeSection === link.id ? 'text-secondary' : 'text-third hover:text-secondary'
                }`}
              >
                {link.label}
              </a>
=======
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
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684

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