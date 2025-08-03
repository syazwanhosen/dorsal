import { Hospital, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center px-6 lg:pt-16 pt-10 text-center">
        {/* Badge */}
        <span className="hidden lg:inline-block bg-[#F6F1FF] px-3 py-1 rounded-full mb-4">
          <span className="text-sm bg-gradient-to-r from-[#E771C1] to-[#9F71FD] text-transparent bg-clip-text font-semibold">
            WE GOT YOUR BACK
          </span>
        </span>

        {/* Title */}
        <h1 className="text-5xl font-semibold text-gray-900 leading-tight mb-4">
          Fight <span className="text-pink">smarter</span>, not harder.
        </h1>
        <p className="text-gray-600 text-xl lg:text-3xl mb-8">
          Insights on pricing, procedures, providers and more!
        </p>
        {/* CTA Button */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/hospitals" className="min-w-[200px]">
            <button className="whitespace-nowrap shadow-lg uppercase flex items-center gap-2 bg-purple text-white text-sm lg:text-lg font-semibold px-4 py-3 rounded-lg transition hover:bg-purple-700">
              <Hospital size={20} />
              Find your hospital
            </button>
          </Link>
          <Link to="/coming-soon" className="min-w-[200px]">
            <button className="whitespace-nowrap uppercase flex items-center gap-2 bg-pink text-white text-sm lg:text-lg font-semibold px-4 py-3 rounded-lg shadow-lg transition hover:bg-fuchsia-700">
              <FileText size={20} />
              Negotiate your bill
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
