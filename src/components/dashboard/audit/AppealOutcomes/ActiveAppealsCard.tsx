export default function ActiveAppealsCard() {
    return (
        <div className="bg-white rounded-lg overflow-hidden col-span-1 light-shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-700 flex items-center">
                    Active Appeals
                </h2>
                <span className="bg-[#EDE9FE] text-[#5B21B6] text-xs font-medium px-2.5 py-0.5 rounded">3 active</span>
            </div>
            <div className="px-6 py-4">
                <ul className="divide-y divide-gray-200">
                    <li className="py-3">
                        <div className="flex justify-between">
                            <p className="font-medium">ICU Room Overcharge</p>
                            <span className="text-[#6CA724] font-medium flex items-center">
                                Approved
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-500">Appeal ID: AP-20250510-01</p>
                            <p className="text-sm font-medium text-[#6CA724]">$255.32</p>
                        </div>
                        <div className="mt-2 bg-gray-100 p-2 rounded">
                            <p className="text-xs text-gray-700"> Credit note issued on May 10, 2025</p>
                        </div>
                    </li>
                    <li className="py-3">
                        <div className="flex justify-between">
                            <p className="font-medium">Cardiologist Day 5 Absence</p>
                            <span className="text-[#FCAC12] font-medium flex items-center">
                                In Progress
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-500">Appeal ID: AP-20250510-02</p>
                            <p className="text-sm font-medium text-[#FCAC12]">$123.40</p>
                        </div>
                        <div className="mt-2">
                            <div className="w-[250px] bg-gray-200 rounded-full h-1.5 mb-1">
                                <div className="bg-[#F3CC5C] h-1.5 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500">Step 2 of 4 - Awaiting consultant review</p>
                        </div>
                    </li>
                    <li className="py-3">
                        <div className="flex justify-between">
                            <p className="font-medium">Unused Medication Charged</p>
                            <span className="text-red-500 font-medium flex items-center">
                                Action Needed
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-500">Appeal ID: AP-20250510-03</p>
                            <p className="text-sm font-medium text-red-500">$0</p>
                        </div>
                        <button className="mt-5 flex justify-center items-center w-full bg-purple border border-purple-200 px-4 py-3 rounded-lg">
                        <span className="flex items-center text-white font-medium">
                            Upload supporting document
                        </span>
                    </button>
                    </li>
                </ul>
                <button className="mt-2 text-purple text-sm font-medium flex items-center justify-center w-full">
                    View all appeals
                </button>
            </div>
        </div>
    )
}