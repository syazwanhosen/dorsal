// Components
import ActiveAppealsCard from "@/components/dashboard/audit/AppealOutcomes/ActiveAppealsCard";
import ChartSummaryPanel from "@/components/dashboard/audit/AppealOutcomes/ChartSummaryPanel";
import CommunityCard from "@/components/dashboard/audit/AppealOutcomes/CommunityCard";
import RecentActivityCard from "@/components/dashboard/audit/AppealOutcomes/RecentActivityCard";
import RewardsCard from "@/components/dashboard/audit/AppealOutcomes/RewardsCard";

export default function AppealOutcomesPage() {
    return (
        <>
            <h1 className="text-lg font-medium text-[#8770BC] ml-10">Appeal Outcomes</h1>
            <div className="bg-gradient-to-b from-gray-50 to-purple-50 min-h-screen">
                <main className="py-4">
                    <ChartSummaryPanel />
                    <div className="grid lg:grid-cols-2 gap-6 mt-6">
                        <ActiveAppealsCard />
                        <RewardsCard />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        <CommunityCard />
                        <RecentActivityCard />
                    </div>
                </main>
            </div>
        </>
    )
}