import { FC } from "react";
import PriceChart from "./PriceChart";

interface ProcedureCardProps {
  serviceName: string;
  serviceDescription: string;
  cptCode: string;
  hasSearchResult: boolean;
  prices: number[];
  labels: string[];
  hospitalNames: string[];
}

export const ProcedureCard: FC<ProcedureCardProps> = ({
  serviceName,
  serviceDescription,
  cptCode,
  hasSearchResult,
  prices,
  hospitalNames,
}) => {
  return (
    <section id="ProcedureCard" className="mt-2 container">
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Left Content */}
        <div className="w-full lg:w-[60%]">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800">{serviceName}</h2>
            {cptCode && (
              <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded w-fit sm:w-auto">
                CPT Code {cptCode}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 mt-2">{serviceDescription}</p>
        </div>

        {/* Right Box (Chart) */}
        {hasSearchResult && (
          <div className="w-full lg:w-[40%] rounded-lg border">
            {/* Passing hospitalNames correctly */}
            <PriceChart prices={prices} hospitalNames={hospitalNames} />
          </div>
        )}
      </div>


      {/* Table displaying hospital names and prices */}
      {/*
       {hasSearchResult && hospitalNames.length > 0 && prices.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">Price Comparison</h3>
          <table className="w-full mt-2 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Hospital Name</th>
                <th className="border border-gray-300 p-2">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {hospitalNames.map((name, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">{name}</td>
                  <td className="border border-gray-300 p-2">${prices[index].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
*/}
    </section>
  );
};
