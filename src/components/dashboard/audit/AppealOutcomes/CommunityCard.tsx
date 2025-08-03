export default function CommunityCard() {
    return (
        <div className='mt-6'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-700">Community Support</h2>
            </div>
            <div className="bg-white rounded-lg overflow-hidden col-span-1 light-shadow">
                <div className="px-6 py-4">
                    <div className="bg-[#F5F3FF] rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                            <div className="ml-3">
                                <h3 className="font-medium text-[#4C1D95]">Community Impact</h3>
                                <p className="text-sm mt-1">$1,243,587 saved by our community</p>
                                <p className="text-xs mt-0.5 text-[#8770BC]">4,328 successful appeals</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Similar to your bills</p>
                        <div className="space-y-2">
                            <div className="rounded border border-gray-200 p-3">
                                <div className="flex justify-between">
                                    <p className="font-medium">ICU Overcharges</p>
                                    <span className="bg-green-legend text-white text-xs px-2 py-1 rounded">85% success</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Average savings: $218</p>
                            </div>
                            <div className="rounded border border-gray-200 p-3">
                                <div className="flex justify-between">
                                    <p className="font-medium">Cardiologist Fees</p>
                                    <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded ">62% success</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Average savings: $142</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium">
                            Get Help
                        </button>
                        <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium">
                            Share Story
                        </button>
                    </div>
                    <button className="flex justify-between items-center w-full bg-purple border border-purple-200 px-4 py-3 rounded-lg mt-4">
                        <span className="flex items-center text-white font-medium">
                            Upload another bill
                        </span>
                        <span className="text-sm bg-[#EDE9FE] text-[#5B21B6] px-2 py-0.5 rounded-full font-medium">25 pts</span>
                    </button>
                </div>
            </div>
        </div>
    )
}