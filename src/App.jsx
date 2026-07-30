import './index.css';
import Glass from './components/Glass.jsx';
import Navbar from './components/navbar.jsx';
import Dotbg from './components/bg.jsx';
import Card from './components/card.jsx';
import BounceCards from './components/BounceCard.jsx';

export default function App() {
  const Projects = [
    {
      id: 1,
      name: 'web1',
      stack: 'Laravel, TailwindCSS, React',
      description: 'test description',
      github: 'github.com/Hammm22',
    },
    {
      id: 2,
      name: 'web2',
      stack: 'Express, TailwindCSS',
      description: 'test description',
      github: 'github.com/Hammm22',
    },
    {
      id: 3,
      name: 'web3',
      stack: 'Express, TailwindCSS',
      description: 'test description',
      github: 'github.com/Hammm22',
    },
    {
      id: 4,
      name: 'web4',
      stack: 'Express, TailwindCSS',
      description: 'test description',
      github: 'github.com/Hammm22',
    },
  ];

  const pdfUrls = [
    'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/58f9d943-8d44-4e97-abae-841cc569a483.pdf',
    'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/b706fe14-ff9b-4860-9580-d8942d7ffb60.pdf',
    'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/b706fe14-ff9b-4860-9580-d8942d7ffb60.pdf',
    'https://s3-porto-web.s3.ap-southeast-1.amazonaws.com/d95d5183-8ffe-4dea-8b43-c64fb897e4f2.pdf',
  ];

  const transformStyles = [
    'rotate(0deg) translate(-70px)',
    'rotate(-5deg)',
    'rotate(5deg) translate(70px)',
    'rotate(-5deg) translate(150px)',
  ];

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="bg-primary relative w-full h-screen">
        <main
          id="home"
          className="relative flex flex-row items-center justify-evenly h-screen text-center px-4"
        >
          <div className="absolute inset-0 z-0">
            <Dotbg
              dotRadius={3.5}
              dotSpacing={12}
              bulgeStrength={67}
              glowRadius={80}
              sparkle
              waveAmplitude={0}
              cursorRadius={500}
              cursorForce={0.21}
              bulgeOnly
              gradientFrom="#043132"
              gradientTo="#aaddf1"
              glowColor="#3ccbfff"
            />
          </div>

          <div className="relative z-10 text-left text-white">
            <h1 className="text-5xl font-lg">
              Hello, My name is{' '}
              <span className="font-bold text-secondary">
                Ilham Dwi Arsandy.
              </span>
            </h1>
            <p className="text-3xl font-normal mt-4">
              A high school student with a deep passion for technology.<br></br>{' '}
              Constantly learning, experimenting with code.
            </p>
            <br></br>
            <div className="w-9/12 flex flex-row items-center justify-between">
              <button>
                <Glass width={200} height={60}>
                  <h1 className="text-2xl font-medium hover:text-secondary transition">
                    My Projects
                  </h1>
                </Glass>
              </button>

              <button>
                <Glass width={200} height={60}>
                  <h1 className="text-2xl font-medium hover:text-secondary transition">
                    Contact Me
                  </h1>
                </Glass>
              </button>
            </div>
          </div>
          <div className="relative z-10">
            <h1 className="text-white text-2xl">Photos</h1>
          </div>
        </main>

        {/* Section 2 */}
        <section className="h-screen w-full flex justify-center items-center bg-primary">
          <div className="h-2/3 w-2/3 grid grid-cols-3 md:grid-cols-7 grid-rows-3 md:grid-rows-6 gap-2 md:gap-4 m-4">
            <Card className="hidden md:block md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-3 rounded-2xl p-10 text-center">
              <h1 className="text-white text-2xl font-semibold">
                The Introduction & Background
              </h1>
            </Card>

            <Card className="hidden md:block md:col-start-5 md:row-start-1 md:col-span-3 md:row-span-3 rounded-2xl p-10 text-center">
              <h1 className="text-white text-2xl font-semibold">
                Current Focus
              </h1>
            </Card>

            <Card className="hidden md:block md:col-start-1 md:row-start-4 md:col-span-3 md:row-span-3 rounded-2xl p-10 text-center">
              <h1 className="text-white text-2xl font-semibold">
                My Tech Stack & Tools
              </h1>
            </Card>

            <Card className="hidden md:block md:col-start-4 md:row-start-4 md:col-span-4 md:row-span-3 rounded-2xl p-10 text-center">
              <h1 className="text-white text-2xl font-semibold">
                Interest / Hobby
              </h1>
            </Card>
          </div>
        </section>

        {/* Section 3 */}
        <section className="h-screen w-full bg-primary flex flex-col justify-center items-center">
          <h1 className="text-white text-6xl font-extrabold">
            My Achievements
          </h1>
          <BounceCards
            className="custom-bounceCards"
            pdfUrls={pdfUrls}
            containerWidth={500}
            containerHeight={400}
            animationDelay={0.3}
            animationStagger={0.13}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
          />
        </section>

        {/* Section 4 */}
        <section className="min-h-screen w-full grid grid-cols-3 place-content-center place-items-center bg-primary gap-7 p-8">
          {Projects.map((data) => (
            <Card
              key={data.id}
              className="w-96 h-80 flex flex-col items-center justify-center p-4"
            >
              <h1 className="text-white text-2xl font-semibold">
                Project {data.id}
              </h1>
              <h2 className="text-white">{data.name}</h2>
              <p className="text-gray-300 text-center">{data.description}</p>

              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Github Link
              </a>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
