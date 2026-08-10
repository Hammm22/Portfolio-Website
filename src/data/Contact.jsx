import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';


const ContactData = [
  {
    id: 1,
    name: 'Email Me',
    value: 'ilhamdwiarsandy61@gmail.com',
    link: 'mailto::ilhamdwiarsandy61@gmail.com',
    icon: (
      <FaEnvelope className="text-3xl mb-4 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
    ),
  },
  {
    id: 2,
    name: 'GitHub',
    value: 'Hammm22',
    link: 'github.com/Hammm22',
    icon: (
      <FaGithub className="text-3xl mb-4 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
    ),
  },
  {
    id: 3,
    name: 'Instagram',
    value: 'Ilham22008',
    link: 'instagram.com/Ilham22008',
    icon: (
      <FaInstagram className="text-3xl mb-4 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
    ),
  },
  {
    id: 4,
    name: 'LinkedIn',
    value: 'Ilham Dwi Arsandy',
    link: 'linkedin.com/in/ilham-dwi-arsandy',
    icon: (
      <FaLinkedin className="text-3xl mb-4 text-gray-300 group-hover:text-secondary transition-colors duration-300" />
    ),
  }
];

export default ContactData;
