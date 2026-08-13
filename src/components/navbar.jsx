import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Glass from '../components/Glass';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [active, setActive] = useState('home');
  const navRef = useRef(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'projects', label: 'Projects' },
    // Typo diperbaiki dari 'contacts' jadi 'contact' agar linknya nyambung
    { id: 'contacts', label: 'Contact' }, 
  ];

  // 1. Animasi Navbar jatuh dari atas (Tetap pakai GSAP)
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, { scope: navRef });

  // 2. Logika ScrollSpy Anti-Meleset untuk Lazy Load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Jika section memotong area tengah layar, set jadi active
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Margin ini memastikan state baru berubah saat section masuk agak ke tengah
      { rootMargin: '-40% 0px -60% 0px' } 
    );

    // Dikasih delay 1 detik (1000ms) buat nunggu komponen Suspense beres nge-load
    const timeout = setTimeout(() => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.observe(el);
      });
      // Refresh GSAP buat nyamain kalkulasi ulang
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 w-full flex justify-center z-50">
      <Glass
        displace={0.5}
        distortionScale={20}
        brightness={27}
        width={750}
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
                className={`text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold transition-all duration-300 ${
                  active === link.id ? 'text-secondary' : 'text-third hover:text-secondary'
                }`}
              >
                {link.label}
              </a>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-secondary transition-all duration-300 ${
                  active === link.id ? 'w-full' : 'w-0'
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </Glass>
    </nav>
  );
}