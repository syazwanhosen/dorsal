import { useEffect, useState } from "react";
import { MapPinned, Hospital, Package, Boxes } from "lucide-react";
import { fetchStatistics } from "../../api/Hospital/api";

export const TotalStats = () => {
  const [apiStats, setApiStats] = useState({
    total_states: 0,
    total_hospitals: 0,
    total_services: 0,
    total_categories: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatistics();
        setApiStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: <MapPinned size={32} className="text-purple" />, label: "Total States", value: apiStats.total_states, bgColor: "bg-light-purple" },
    { icon: <Hospital size={32} className="text-green" />, label: "Total Hospitals", value: apiStats.total_hospitals, bgColor: "bg-light-green" },
    { icon: <Package size={32} className="text-red" />, label: "Total Services", value: apiStats.total_services, bgColor: "bg-light-red" },
    { icon: <Boxes size={32} className="text-yellow" />, label: "Service Categories", value: apiStats.total_categories, bgColor: "bg-light-yellow" },
  ];

  return (
    <section id="TotalStats" className="container py-6">
      <h2 className="text-xl font-bold pb-4 text-left">Overview</h2>

      <div className="border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative flex items-center p-4 rounded-lg bg-white"
          >
            {/* Dashed line divider - only visible on large screens */}
            {index > 0 && (
              <div
                className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-16 border-l border-dashed border-gray-300"
                style={{ left: '-15px' }} // Correct camelCase style key
              ></div>
            )}

            <div className={`rounded p-3 ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div className="ml-6">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-left">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
