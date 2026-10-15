<<<<<<< HEAD

=======
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
import Card from '../components/card.jsx';
import techIcons from '../data/TechIcons.jsx';
import GithubStats from '../components/GithubStats.jsx';

export default function About({ naturalScroll = false }) {
  return (
    <section id="about" className="w-full flex flex-col items-center pt-24 pb-24 px-4">
      <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-12 text-center">
        About Me
      </h2>
      
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 auto-rows-[200px] gap-4">
        <Card className="col-span-1 sm:col-span-2 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center  border border-white/10">
          <h3 className="text-secondary text-3xl font-semibold">Introduction & Background</h3>
        </Card>
        
        <Card className="col-span-1 sm:col-span-1 md:col-start-5 md:row-start-1 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex flex-col justify-evenly items-center text-center  border border-white/10">
          <h3 className="text-secondary text-3xl font-semibold mb-2">Current Focus</h3>
          <p className="text-white text-base md:text-lg font-normal leading-relaxed">
            I’m learning modern front-end tools to build responsive websites
            with smooth animations and clear, easy-to-use interfaces. <br />
            <br />
            I’m also developing my back-end skills to build full-stack
            applications and understand how they work from start to finish.
          </p>
        </Card>

        <Card className="col-span-1 sm:col-span-1 md:col-start-1 md:row-start-3 md:col-span-3 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center  border border-white/10">
          <h3 className="text-secondary text-3xl font-semibold mb-4">My Tech Stack & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {techIcons.map((tech, index) => (
              <div key={index} className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 transition-all cursor-default">
                <span className={`text-xl text-gray-500 transition-colors ${tech.color}`}>{tech.icon}</span>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 sm:col-span-2 md:col-start-4 md:row-start-3 md:col-span-4 md:row-span-2 rounded-2xl p-8 flex flex-col items-center justify-evenly text-center  border border-white/10">
          <h3 className="text-secondary text-3xl font-semibold mb-4">Interests & Hobbies</h3>
          <div className="text-white text-base md:text-lg font-normal">
            Outside of coding, I enjoy gaming, exploring Linux, playing
            badminton, and spending time with friends.
            <br />
            <br />
            Games I enjoy:
            <ul className="list-disc text-left ml-8 mt-2 space-y-1">
              <li>Roblox</li>
              <li>CarX Street</li>
              <li>PUBG Mobile</li>
              <li>Clash Royale</li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="w-full max-w-6xl mt-4">
        <GithubStats naturalScroll={naturalScroll} />
      </div>
    </section>
  );
}