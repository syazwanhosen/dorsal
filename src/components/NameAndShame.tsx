const hospitalData = [
  {
    rank: 1,
    name: "Overcharge General Hospital",
    location: "New York, NY",
    rate: "15.2%",
    score: "$$$$",
    amount: "$12,500",
  },
  {
    rank: 2,
    name: "Costly Care Medical Center",
    location: "Los Angeles, CA",
    rate: "13.8%",
    score: "$$$",
    amount: "$9,800",
  },
  {
    rank: 3,
    name: "High Price Health System",
    location: "Chicago, IL",
    rate: "12.5%",
    score: "$$$",
    amount: "$11,200",
  },
  {
    rank: 4,
    name: "Expensive Emergency Network",
    location: "Houston, TX",
    rate: "11.9%",
    score: "$$",
    amount: "$7,500",
  },
];

export const NameAndShame = () => {
  return (
    <div className="bg-white lg:py-16 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#9F70FD1A] text-purple-700">
            <span className="bg-gradient-to-r from-[#E770C1] to-[#9F70FD] bg-clip-text text-transparent">
              NAME AND SHAME
            </span>
          </span>

          <h2 className="mt-3 text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px] font-bold text-gray-900 sm:text-4xl">
            Top Overbilling Hospitals
          </h2>

          <p className="mt-4  text-gray-600 mx-auto">
            We're tracking hospitals with the highest patient complaint rates
            about overbilling. Updated daily to help you avoid excessive medical
            bills.
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-thin ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-purple text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-base font-bold"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-base font-bold"
                >
                  Hospital / Network
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-base font-bold"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-base font-bold"
                >
                  Incident Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-base font-bold"
                >
                  Overbilling Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-base font-bold"
                >
                  Avg Bill Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hospitalData.map((item) => (
                <tr key={item.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D2B41]">
                    {item.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D2B41]">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D2B41]">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D2B41]">
                    {item.rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D2B41] font-bold">
                    {item.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D2B41]">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
