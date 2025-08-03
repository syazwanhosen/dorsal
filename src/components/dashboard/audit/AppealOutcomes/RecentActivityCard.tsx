import { FileText, CheckCircle, AlertTriangle, } from 'lucide-react';

export default function RecentActivityCard() {
    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">Recent Activity</h2>
                <button className="text-[#6E39CB] text-sm font-medium flex items-center">
                    View all
                </button>
            </div>

            <div className="bg-white rounded-lg overflow-hidden col-span-1 light-shadow">
                <div className="divide-y divide-gray-200">
                    <div className="p-4 flex">
                        <div className="flex-shrink-0 h-10 w-10 bg-light-green rounded-lg flex items-center justify-center mr-4 self-center">
                            <CheckCircle className="h-6 w-6 text-[#6CA724]" />
                        </div>
                        <div>
                            <p className="font-medium">ICU Room Overcharge appeal approved!</p>
                            <p className="text-sm text-gray-500 mt-1">$255.32 will be credited to your account</p>
                            <p className="text-xs text-gray-400 mt-1">Today at 2:45 PM</p>
                        </div>
                    </div>

                    <div className="p-4 flex">
                        <div className="flex-shrink-0 h-10 w-10 bg-light-red rounded-lg flex items-center justify-center mr-4  self-center">
                            <AlertTriangle className="h-6 w-6 text-red" />
                        </div>
                        <div>
                            <p className="font-medium">Action needed: Authorization for Cardiologist appeal</p>
                            <p className="text-sm text-gray-500 mt-1">We need your permission to access records</p>
                            <div className="mt-2">
                                <button className="bg-purple text-white text-sm px-3 py-1 rounded mr-2">Complete</button>
                                <button className="bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1 rounded">Later</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 flex">
                        <div className="flex-shrink-0 h-10 w-10 bg-light-yellow rounded-lg flex items-center justify-center mr-4  self-center">
                            <FileText className="h-6 w-6 text-yellow" />
                        </div>
                        <div>
                            <p className="font-medium">Alaska Medical bill moved to Consultant Review stage</p>
                            <p className="text-sm text-gray-500 mt-1">Your bill is being reviewed for potential savings</p>
                            <p className="text-xs text-gray-400 mt-1">Yesterday at 10:23 AM</p>
                        </div>
                    </div>
                    <div className="p-4 flex">
                        <div className="flex-shrink-0 h-10 w-10 bg-light-yellow rounded-lg flex items-center justify-center mr-4  self-center">
                            <FileText className="h-6 w-6 text-yellow" />
                        </div>
                        <div>
                            <p className="font-medium">Alaska Medical bill uploaded</p>
                            <p className="text-sm text-gray-500 mt-1">Your bill is being analyzed for potential savings</p>
                            <p className="text-xs text-gray-400 mt-1">Wednesday at 15:46 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
