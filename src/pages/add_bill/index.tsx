import { useNavigate } from 'react-router-dom';
import { FileText } from "lucide-react";

// Components
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/card";

interface Bill {
    id: number;
    date: string;
}

const bills: Bill[] = [
    { id: 782, date: "Feb 2025" },
    { id: 780, date: "Dec 2024" },
    { id: 781, date: "Jan 2025" },
];

export default function AddBill() {
    const navigate = useNavigate();

    const handleUploadClick = () => navigate('/account/add-bill/upload-document');
    const handleEnterDataClick = () => navigate('/account/add-bill/manual-entry');

    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-3 lg:mb-5 mb-5">
                <h2 className="text-lg font-medium text-[#8770BC] mb-3 ml-10">Add Bill</h2>
                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3">
                    <Button
                        className="bg-purple hover:bg-purple-700 text-white w-full sm:w-auto"
                        onClick={handleUploadClick}
                    >
                        Upload Document
                    </Button>
                    <Button
                        className="bg-purple hover:bg-purple-700 text-white w-full sm:w-auto"
                        onClick={handleEnterDataClick}
                    >
                        Enter Manual Data
                    </Button>
                </div>
            </div>
            <div className="p-4">
                <main className="w-full flex justify-center">
                    <div className="w-full max-w-3xl">
                        <Card className="bg-white w-full rounded border border-gray-300">
                            <CardContent className="p-0">
                                <div className="px-4 sm:px-6 py-4 font-semibold text-sm text-gray-700">
                                    Added Bills
                                </div>
                                <ul>
                                    {bills.map((bill) => (
                                        <li
                                            key={bill.id}
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-6 py-4 border-t border-gray-300"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <FileText className="w-5 h-5 text-gray-600" />
                                                <span className="text-sm">
                                                    Billing #{bill.id}: {bill.date}
                                                </span>
                                            </div>
                                            <Button className="bg-purple text-white hover:bg-purple-700 text-sm px-4 py-1 h-auto w-full sm:w-auto">
                                                View
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    );
}
