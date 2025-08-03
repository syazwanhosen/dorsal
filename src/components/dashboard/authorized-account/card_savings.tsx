import { Package, ShoppingBag, ShoppingBasket } from "lucide-react";

export default function CardSavings() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 border border-purple-100 transform hover:scale-[1.01] transition-transform">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h2 className="text-lg md:text-xl font-bold flex items-center text-transparent bg-clip-text bg-gradient-to-r text-[#8771BC]">
              Your Total Savings
            </h2>
            <div className="flex items-baseline mt-2">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                $842.17
              </p>
              <span className="ml-2 px-2 py-0.5 bg-[#DDD6FE] text-xs font-medium rounded-full animate-pulse">
                +$255.32 this week
              </span>
            </div>
            <p className="text-sm text-[#8771BC] mt-1">saved so far</p>
          </div>
          <div className="text-center mt-3 md:mt-0">
            <div className="bg-gradient-to-r bg-[#5752D0] text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              Top 20% saver
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              63% of potential savings recovered
            </p>
          </div>
        </div>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r bg-purple h-3 rounded-full relative"
            style={{ width: "63%" }}
          >
            <span className="absolute -right-1 -top-1 w-5 h-5 bg-white rounded-full border-2 shadow-md"></span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="border border-gray-200 rounded-lg p-3 bg-gradient-to-b shadow-sm flex items-stretch justify-start">
            <div className="bg-[#E2F6CB] p-4 rounded mr-2 flex items-center justify-center h-full">
              <ShoppingBasket className="text-[#6CA724]" size={42} />
            </div>
            <div className="flex flex-col justify-center h-full">
              <p className="text-sm text-[#6CA724] font-bold">Approved</p>
              <p className="text-2xl font-bold">$255.32</p>
              <p className="text-xs text-gray-500 mt-1">+50 points</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 bg-gradient-to-b shadow-sm flex items-center justify-start">
            <div className="bg-[#FEF3C7] p-4 rounded mr-2">
              <Package className="text-[#FBBF24]" size={42} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-[#FBBF24] font-bold">Approved</p>
              <p className="text-2xl font-bold">$255.32</p>
              <p className="text-xs text-gray-500 mt-1">0 points</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 bg-gradient-to-b shadow-sm flex items-center justify-start">
            <div className="bg-[#FECACA] p-4 rounded mr-2">
              <ShoppingBag className="text-[#CE3C29]" size={42} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-[#CE3C29] font-bold">Rewards</p>
              <p className="text-2xl font-bold">84</p>
              <p className="text-xs text-gray-500 mt-1">Next: 100 pts</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button className="bg-gradient-to-r bg-[#8771BC] text-white px-4 py-2 rounded-md flex items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow">
            Upload New Bill
          </button>

          <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition-colors">
            View All Savings
          </button>
        </div>
      </div>
    </div>
  );
}
