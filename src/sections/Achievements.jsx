import { useRef, useEffect } from 'react';
import BounceCards from '../components/BounceCard.jsx';
import imageUrls from '../data/Certificates.js';


const transformStyles = [
  'rotate(0deg) translate(-70px)',
  'rotate(-5deg)',
  'rotate(5deg) translate(70px)',
  'rotate(-5deg) translate(150px)',
];

export default function Achievements() {

  return (
    <section
      id="achievements"
      className="h-full w-full flex flex-col justify-center items-center py-16 px-4 overflow-hidden"
    >
      <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
        My Achievements
      </h2>
      <BounceCards
        className="max-w-full"
        imageUrls={imageUrls}
        containerWidth={500}
        containerHeight={400}
        animationDelay={0.3}
        animationStagger={0.13}
        easeType="elastic.out(1, 0.5)"
        transformStyles={transformStyles}
        enableHover={true}
      />
    </section>
  );
}
