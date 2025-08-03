import { FC } from "react";
import PriceChartServiceSearch from "./PriceChartServiceSearch";

interface ServiceSearchProcedureCardProps {
  serviceName: string;
  serviceDescription: string;
  cptCode: string;
  hasSearchResult: boolean;
  prices: number[];
  hospitalNames: string[];
}

export const ServiceSearchProcedureCard: FC<ServiceSearchProcedureCardProps> = ({
  serviceName,
  serviceDescription,
  cptCode,
  prices,
  hospitalNames,
}) => {
  // Check if we have valid price data to display
  const hasPriceData = prices && prices.length > 0 && prices.some(price => price > 0);
  
  return (
    <section id="ProcedureCard" className="mt-2 container">
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-6">
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

        {/* Right Box (Chart) - Always show even if no data */}
        <div className="w-full lg:w-[40%] rounded-lg border">
          {hasPriceData ? (
            <PriceChartServiceSearch prices={prices} hospitalNames={hospitalNames} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="text-gray-500 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No Price Data Available</h3>
                <p className="mt-1 text-sm text-gray-500">
                  We couldn't find any price information for this procedure.
                </p>
              </div>
              {/* Optional: Show a placeholder chart with zero values */}
              <div className="w-full h-48 bg-gray-50 mt-4 flex items-end">
                {[1, 2, 3].map((_, index) => (
                  <div 
                    key={index}
                    className="flex-1  mx-1" 
                    style={{ height: '10%' }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};