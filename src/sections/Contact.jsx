<<<<<<< HEAD

=======
>>>>>>> dd779fa2d1a1fa974fc34d89ba0b1d2139428684
import Card from '../components/card.jsx';
import ContactData from '../data/Contact.jsx';

export default function Contact() {

  return (
    <section
      id="contact"
      className="h-full w-full flex flex-col justify-between pt-16 px-4 md:px-8 max-w-5xl mx-auto"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-6">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            I’m open to new opportunities and freelance projects. Have a project
            in mind or a question? Feel free to get in touch.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center w-full mb-10">
          {ContactData.map((method) => (
            <a
              key={method.id}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Card className="group relative w-full h-[200px] flex flex-col items-center justify-center p-6 text-center rounded-2xl backdrop-blur-md border border-white/10 hover:border-secondary/50 transition-all duration-500 overflow-hidden cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {method.icon}
                <h3 className="text-white text-lg font-bold mb-1 mt-3">
                  {method.name}
                </h3>
                <p className="text-gray-400 text-sm font-medium group-hover:text-gray-200 transition-colors duration-300">
                  {method.value}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}