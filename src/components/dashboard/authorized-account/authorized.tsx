import CardSavings from "./card_savings";
import JourneyProgress from "./journey_progress";
import RecentTransactions from "./recent_transactions";


export default function AuthorizedAccount() {
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3 lg:mb-5 mb-5">
        <h2 className="text-lg font-medium text-[#8770BC] mb-3 ml-10">John Doe</h2>
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3">
          <button className="bg-gradient-to-r bg-purple text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-shadow w-auto md:w-[140px]">
            Pay Provider
          </button>
          <button className="bg-gradient-to-r bg-purple text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-shadow w-auto md:w-[140px]">
            Reimburse
          </button>
          <button className="bg-gradient-to-r bg-purple text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-shadow w-auto md:w-[140px]">
            Claim
          </button>
        </div>
      </div>







      {/* Progress Journey Bar */}
      <JourneyProgress />

      {/* Hero Card - Savings */}
      <CardSavings />

      {/* Recent Transactions - Filter */}
      <RecentTransactions />
    </>
  );
}
