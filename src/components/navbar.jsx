import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Glass from './Glass.jsx';
export default function Navbar() {
  const navRef = useRef(null);

  useGSAP(()=>{
    gsap.from(navRef.current,{
      y:-100,
      opacity:0,
      duration:1,
      ease:"power3.out",
      delay:0.2
    });
  });



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
          <li>
            <a
              href="#home" // 3. Ganti href sesuai ID section di App.jsx
              className="text-third text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold hover:text-secondary transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about" // Pastikan kamu menambahkan id="about" di section 2
              className="text-third text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold hover:text-secondary transition"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#achievements" // Pastikan kamu menambahkan id="achievements" di section 3
              className="text-third text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold hover:text-secondary transition"
            >
              Achievements
            </a>
          </li>
          <li>
            <a
              href="#projects" // Mengarah ke id="projects" di section 4
              className="text-third text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold hover:text-secondary transition"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-third text-xs sm:text-sm md:text-xl lg:text-2xl font-bold md:font-extrabold hover:text-secondary transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </Glass>
    </nav>
  );
}
