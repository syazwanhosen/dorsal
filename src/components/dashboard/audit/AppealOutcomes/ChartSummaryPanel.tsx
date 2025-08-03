import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const chartOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
    },
    scales: {
        x: { display: false },
        y: { display: false },
    },
    elements: {
        line: {
            tension: 0.4,
            borderWidth: 2,
        },
        point: {
            radius: 0,
        },
    },
};

const createChartData = (data: number[], borderColor: string) => ({
    labels: data.map((_, i) => i.toString()),
    datasets: [
        {
            data,
            borderColor,
            fill: false,
        },
    ],
});

export default function ChartSummaryPanel() {
    return (
        <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex flex-col md:flex-row justify-between gap-6 light-shadow">
            {/* Total Saving So Far */}
            <div className="flex-1 flex items-center gap-4">
                <div className="w-20">
                    <Line
                        data={createChartData([5, 10, 6, 14, 8, 4, 10], '#6CA724')}
                        options={chartOptions}
                    />
                </div>
                <div>
                    <div className="text-sm text-gray-700">Total Saving So Far</div>
                    <div className="text-xl font-semibold text-[#6E39CB]">$255.32</div>
                    <div className="text-[#6CA724] font-medium">Approved</div>
                </div>
            </div>

            {/* Potential Remaining Appeal */}
            <div className="flex-1 flex items-center gap-4 md:border-l md:border-gray-200 md:pl-6">
                <div className="w-20">
                    <Line
                        data={createChartData([2, 6, 12, 4, 9, 6, 8], '#FCAC12')}
                        options={chartOptions}
                    />
                </div>
                <div>
                    <div className="text-sm text-gray-700">Potential Remaining Appeal</div>
                    <div className="text-xl font-semibold text-[#6E39CB]">$201.83</div>
                    <div className="text-yellow font-medium">Pending</div>
                </div>
            </div>

            {/* Rewards */}
            <div className="flex-1 flex items-center gap-4 md:border-l md:border-gray-200 md:pl-6">
                <div className="w-20">
                    <Line
                        data={createChartData([3, 7, 13, 6, 11, 8, 6], '#6E39CB')}
                        options={chartOptions}
                    />
                </div>
                <div>
                    <div className="text-sm text-gray-700">Rewards</div>
                    <div className="text-xl font-semibold text-[#6E39CB]">84 pts</div>
                    <div className="text-[#4361EE] font-medium">Points Collection</div>
                </div>
            </div>
        </div>
    );
};

