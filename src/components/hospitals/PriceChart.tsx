import { useRef, useEffect, useState, FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProcedureChartProps {
  prices?: number[];
  hospitalNames?: string[];
}

const PriceChart: FC<ProcedureChartProps> = ({
  prices = [],
  hospitalNames = [],
}) => {
  const chartRef = useRef<any>(null);
  const [gradient, setGradient] = useState<CanvasGradient | string>(
    "rgba(93, 64, 255, 1)"
  );

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
    gradient.addColorStop(0, "rgba(93, 64, 255, 1)"); // Blue
    gradient.addColorStop(1, "rgba(255, 64, 129, 1)"); // Pink
    setGradient(gradient);
  }, []);

  const sortedData = prices
    .map((price, index) => ({
      price,
      name: hospitalNames[index] || `Hospital ${index + 1}`,
    }))
    .sort((a, b) => a.price - b.price);

  const sortedPrices = sortedData.map((item) => item.price);
  const sortedHospitalNames = sortedData.map((item) => item.name);

  const chartData = {
    labels: sortedHospitalNames,
    datasets: [
      {
        label: "Price ($)",
        data: sortedPrices,
        borderColor: gradient,
        backgroundColor: gradient,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: gradient, // Gradient fill for dots
        pointBorderColor: "#ffffff", // Optional white border
        pointBorderWidth: 0,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const price = sortedPrices[context.dataIndex];
            const name =
              sortedHospitalNames[context.dataIndex] ||
              `Hospital ${context.dataIndex + 1}`;
            return `${name}: $${price?.toFixed(2) ?? "N/A"}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        display: true,
        grid: { color: "rgba(200, 200, 200, 0.2)" },
        title: {
          display: true,
          text: "Price ($)",
          font: { size: 14, weight: "bold" },
          color: "#333",
        },
        ticks: {
          callback: (value: string | number) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] flex flex-col">
      <div className="flex justify-between mb-2 px-2 mt-2">
        <h3 className="font-bold text-black pb-4">Distributed Prices</h3>
       {/*  <a href="#" className="text-purple text-sm font-semibold hover:underline">
          Prices
        </a> */}
      </div>
      <div className="flex-1 pb-4">
     
        <Line ref={chartRef} data={chartData} options={chartOptions} style={{paddingRight: '1rem', paddingLeft: '0.5rem'}}/>
      
      </div>
    </div>
  );
};

export default PriceChart;
