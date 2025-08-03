import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Calendar } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow">
      <Navbar />
      <div className="container text-center lg:pt-16 pt-4 pb-4 md:pb-8 lg:pb-6 xl:pb-8 2xl:pb-12 bg-white">
        <h1 className="md:text-7xl text-2xl font-bold">
          Coming <span className="text-pink">Soon!</span>
        </h1>
        <h2 className="md:text-xl md:my-6 my-3 text-gray-600">
          Fixing American healthcare, one bill at a time :)
        </h2>
        <a
          href="https://cal.com/abrar/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center md:text-md text-sm gap-2 text-white bg-purple hover:bg-pink font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
        >
          <Calendar className="w-5 h-5" />
          Have a story or seeking a demo for your org?
        </a>
      </div>
      <Newsletter />
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
