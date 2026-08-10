
import { FaReact, FaGithub, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript } from 'react-icons/si';

const techIcons = [
  { name: 'React.js', color: 'group-hover:text-[#61DAFB]', icon: <FaReact title="React.js Icon" /> },
  { name: 'TailwindCSS', color: 'group-hover:text-[#06B6D4]', icon: <SiTailwindcss title="TailwindCSS Icon" /> },
  { name: 'GitHub', color: 'group-hover:text-[#ffffff]', icon: <FaGithub title="GitHub Icon" /> },
  { name: 'JavaScript', color: 'group-hover:text-[#F7DF1E]', icon: <SiJavascript title="JavaScript Icon" /> },
  { name: 'Node.js', color: 'group-hover:text-[#339933]', icon: <FaNodeJs title="Node.js Icon" /> },
];

export default techIcons;