

export default function JourneyProgress() {
  return (
    <>
       {/* Progress Journey Bar */}
       <div className="mb-6 bg-white p-4 rounded-lg shadow-md border border-purple-100">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">Your Savings Journey</h2>
            <div className="flex items-center">
              <span className="text-sm font-medium">Savings Champion</span>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-between mb-1 text-xs font-medium">
              <span>Beginner</span>
              <span>Saver</span>
              <span>Pro</span>
              <span>Champion</span>
              <span>Legend</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
  className="h-full bg-gradient-to-r bg-gradient-light-purple rounded-full"
  style={{
    width: "63%",
    background: "linear-gradient(90deg, #D5D3F3 0%, #817DDC 100%)"
  }}
></div>

            </div>
            <div className="flex justify-between mt-1">
              <div className="w-6 h-6 rounded-full bg-[#D5D3F3] flex items-center justify-center shadow-sm">
              <span className="text-xs text-white"></span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#AAA8E7] flex items-center justify-center shadow-sm">
              <span className="text-xs text-white"></span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#817DDC] flex items-center justify-center shadow-sm border-2 border-white">
              <span className="text-xs text-white"></span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-white">4</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-white">5</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-[#8770BC] mt-4 font-medium">Next milestone: Save $1,000 to reach Champion status!</p>
        </div>

   
    </>
  );
}
