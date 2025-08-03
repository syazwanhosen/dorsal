import { NavLink, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HeaderProps {
  title: string;
  link?: string;
}

export const Header = ({ title, link }: HeaderProps) => {
  const location = useLocation();

  const shouldPointToHospitals = location.pathname == "/data";
  const shouldPointToExplore = location.pathname == "/hospitals";

  return (
    <div className="header bg-purple w-full relative flex items-center justify-center !py-0">
      <div className="text-white py-4 items-center space-x-1 container w-screen flex justify-between">
      <h1 className="text-2xl font-bold">
  {link ? (
    <a href={link} className="hover:underline">
      {title}
    </a>
  ) : (
    title // 
  )}
</h1>

        {shouldPointToHospitals && (
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <NavLink
              to="/hospitals"
              className="inline-flex items-center font-semibold hover:underline"
            >
              Search Hospitals <ArrowRight className="ml-1" />
            </NavLink>
          </div>
        )}
        {shouldPointToExplore && (
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <NavLink
              to="/data"
              className="inline-flex items-center font-semibold hover:underline"
            >
              Explore Data <ArrowRight className="ml-1" />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
