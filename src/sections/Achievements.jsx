<<<<<<< HEAD

import Carousel from '../components/PhotoCarousel.jsx';
import imageUrls from '../data/Certificates.js';

export default function Achievements({ reducedMotion = false }) {
=======
import Carousel from '../components/PhotoCarousel.jsx';
import imageUrls from '../data/Certificates.js';



export default function Achievements() {
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684

  return (
    <section
      id="achievements"
      className="h-full w-full flex flex-col justify-center items-center py-16 px-4 overflow-hidden"
    >
      <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
        My Achievements
      </h2>
      <Carousel key={String(reducedMotion)} items={imageUrls}
          cardWidth={600}
          cardHeight={400}
          autoplay={!reducedMotion}
          autoplayDelay={3000}
          tilt={22}/>
    </section>
  );
}
