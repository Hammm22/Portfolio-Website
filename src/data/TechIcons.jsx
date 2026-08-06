
import { FaReact, FaGithub, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript } from 'react-icons/si';

const techIcons = [
  { name: 'React.js', color: 'group-hover:text-[#61DAFB]', icon: <FaReact /> },
  { name: 'TailwindCSS', color: 'group-hover:text-[#06B6D4]', icon: <SiTailwindcss /> },
  { name: 'GitHub', color: 'group-hover:text-[#ffffff]', icon: <FaGithub /> },
  { name: 'JavaScript', color: 'group-hover:text-[#F7DF1E]', icon: <SiJavascript /> },
  { name: 'Node.js', color: 'group-hover:text-[#339933]', icon: <FaNodeJs /> },
];

export default techIcons; // Langsung export array-nya