export default function RewardsCard() {
    return (
        <div className="bg-white rounded-lg overflow-hidden col-span-1 light-shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-700 flex items-center">
                    Rewards & Achievements
                </h2>
                <div className="text-xs font-medium text-[#8770BC] bg-[#EDE9FE] rounded-full px-2 py-1">
                    Level 3
                </div>
            </div>
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            <p className="font-bold">Dorsal Points</p>
                            <div className="flex items-center">
                                <p className="text-sm text-purple">Redeem for rewards</p>

                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-extrabold text-[#6E39CB]">84</p>
                        <div className="ml-2 bg-[#EDE9FE] text-[#5B21B6] text-xs px-2 py-0.5 rounded-full">
                            Daily streak: 7
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-700">Level progress</p>
                        <p className="text-xs text-purple-600">84/100</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                </div>

                <div className="mt-5">
                    <p className="text-sm font-bold text-gray-700 mb-2">Recent achievements</p>
                    <div className="space-y-2">
                        <div className="flex items-center p-2 px-4 bg-green-legend rounded-lg border border-green-100">
                            <p className="text-sm font-medium text-white">First appeal submitted</p>
                            <span className="ml-auto text-xs font-medium text-white">+15 pts</span>
                        </div>
                        <div className="flex items-center p-2 px-4 bg-green-legend rounded-lg border border-green-100">
                            <p className="text-sm font-medium text-white">$500 savings milestone</p>
                            <span className="ml-auto text-xs font-medium text-white">+25 pts</span>
                        </div>
                        <div className="flex items-center p-2 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500">Help 3 community members</p>
                            <span className="ml-auto text-xs font-medium text-gray-500">+30 pts</span>
                        </div>
                    </div>
                </div>

                <div className="mt-5 space-y-2">
                    <button className="flex justify-between items-center w-full bg-purple border border-purple-200 px-4 py-3 rounded-lg">
                        <span className="flex items-center text-white font-medium">
                            Apply to next bill
                        </span>
                        <span className="text-sm bg-[#EDE9FE] text-[#5B21B6] px-2 py-0.5 rounded-full font-medium">50 pts</span>
                    </button>
                    <button className="flex justify-between items-center w-full bg-white border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="flex items-center text-gray-700 font-medium">
                            Transfer to HSA
                        </span>
                        <span className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full font-medium">75 pts</span>
                    </button>
                </div>
            </div>
        </div>
    )
}