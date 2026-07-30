import Glass from './Glass.jsx';
export default function navbar() {
  return (
    <nav className="fixed top-6 w-full flex justify-center z-50">
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
        <ul className="w-full h-full flex flex-row justify-evenly items-center px-4">
          <li>
            <a
              href="#"
              className="text-third text-2xl font-extrabold hover:text-secondary transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-third text-2xl font-extrabold hover:text-secondary transition"
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-third text-2xl font-extrabold hover:text-secondary transition"
            >
              Achievements
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-third text-2xl font-extrabold hover:text-secondary transition"
            >
              My Projects
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-third text-2xl font-extrabold hover:text-secondary transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </Glass>
    </nav>
  );
}
