import { NavLink } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="bg-purple w-full relative flex items-center justify-center mx-auto">
      <div className="text-white py-4 items-center space-x-1 container w-screen flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <NavLink to="/hospitals" className="font-semibold hover:underline">
            Find Hospitals
          </NavLink>
          {/*} <a href="#" className="font-semibold hover:underline">Find Services</a>
        <button className="font-semibold bg-light-purple text-black px-8 sm:px-16 py-2 rounded-lg hover:bg-purple-50">
          Login
        </button> */}
        </div>
      </div>
    </div>
  );
};
