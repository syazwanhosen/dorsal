import {
  CircleDollarSign,
  Clock,
  Funnel,
  ShieldCheck,
  SquareCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

// Define a type for the tab keys
type TabKey = "Today" | "Week" | "Month" | "Year";

type Transaction = {
  title: string;
  date: string;
  hospital: string;
  billing: string;
  amount: string;
  issue: string;
  status: "approved" | "pending" | "";
};

const FILTERS = [
  {
    type: "select",
    title: "Filter By",
    options: [
      { label: "Specialty", value: "specialty" },
      { label: "Cost", value: "cost" },
      { label: "Best Rated", value: "best-rated" },
    ],
  },
  {
    type: "select",
    title: "Sort By",
    options: [
      { label: "Highest", value: "highest" },
      { label: "Lowest", value: "lowest" },
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
    ],
  },
  {
    type: "other",
    title: "Range Inclusive",
    element: () => (
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-gray-900">Choose Range</span>
        <div className="flex items-center cursor-pointer">
          <ChevronLeft size={16} />
          <span className="text-sm text-gray-500">10 miles from home</span>
          <ChevronRight size={16} />
        </div>
      </div>
    ),
  },
];

const TransactionList = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>("Today");
  const [showFilter, setShowFilter] = useState(false);
  const [tempFilterOption, setTempFilterOption] = useState<{
    [key: string]: string[];
  }>({});

  const transactions: Record<TabKey, Transaction[]> = {
    Today: [
      {
        title: "Heart Surgery",
        date: "2025-05-01",
        hospital: "City Hospital",
        billing: "Bill #12345",
        amount: "-$5,000",
        issue: "No Issues",
        status: "approved",
      },
      {
        title: "Dental Checkup",
        date: "2025-05-02",
        hospital: "Smile Dental",
        billing: "Bill #12346",
        amount: "-$150",
        issue: "Error",
        status: "pending",
      },
      {
        title: "ENT Consultation",
        date: "2025-05-04",
        hospital: "Ear Nose Throat Center",
        billing: "Bill #12348",
        amount: "-$300",
        issue: "2 Errors",
        status: "pending",
      },
      {
        title: "ENT Consultation",
        date: "2025-05-04",
        hospital: "Valley Medical Center, San Gabriel",
        billing: "",
        amount: "",
        issue: "",
        status: "",
      },
    ],
    Week: [
      {
        title: "Eye Surgery",
        date: "2025-05-03",
        hospital: "Vision Clinic",
        billing: "Bill #12347",
        amount: "-$2,000",
        issue: "Refunded",
        status: "approved",
      },
      {
        title: "ENT Consultation",
        date: "2025-05-04",
        hospital: "Ear Nose Throat Center",
        billing: "Bill #12348",
        amount: "-$300",
        issue: "Pending",
        status: "pending",
      },
      {
        title: "Dental Checkup",
        date: "2025-05-02",
        hospital: "Smile Dental",
        billing: "Bill #12346",
        amount: "-$150",
        issue: "Pending",
        status: "pending",
      },
    ],
    Month: [],
    Year: [],
  };

  return (
    <>
      <div className="relative bg-white rounded-xl p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 md:gap-0">
          <div className="flex items-center gap-2">
            <div className="bg-[#E7E7F4] p-2 rounded">
              <CircleDollarSign className="text-[#8770BC]" size={14} />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Recent Transactions
            </h2>
          </div>
          <button className="hidden lg:flex bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow justify-center">
            See All
          </button>
        </div>

        {/* Tabs and Filter - Same alignment across mobile and desktop */}
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          {/* Tabs */}
          <div className="flex gap-1 md:gap-3 rounded-full px-1 md:px-2 py-1 w-auto">
            {["Today", "Week", "Month", "Year"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as TabKey)}
                className={`px-2 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                  selectedTab === tab
                    ? "bg-[#E7E7F4] text-[#8770BC]"
                    : "text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter Button (Aligned correctly with tabs) */}
          <div
            className="flex items-center gap-1 md:gap-2 text-sm text-gray-500 cursor-pointer self-end md:self-auto"
            onClick={() => setShowFilter(!showFilter)}
          >
            <div className="bg-purple-100 p-2 rounded-full">
              <Funnel className="text-[#6E39CB]" size={12} />
            </div>
            <span>Filter</span>
          </div>
          {showFilter && (
            <div className="absolute right-0 top-0 z-50 w-80 bg-white border shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filter Transaction</h3>
                <button
                  className="text-sm text-[#8771BC] bg-[#EEE5FF] px-3 py-1 rounded-full"
                  onClick={() => {
                    setShowFilter(false);
                  }}
                >
                  Reset
                </button>
              </div>
              {FILTERS.map((filter) => (
                <div key={filter.title} className="mb-4">
                  <h4 className="text-sm font-medium mb-2">{filter.title}</h4>
                  <div className="flex gap-2 flex-wrap">
                    {filter.type === "select" && Array.isArray(filter.options)
                      ? filter.options.map((option) => {
                          const isSelected = tempFilterOption[
                            filter.title
                          ]?.includes(option.value);

                          return (
                            <button
                              key={option.value}
                              className={`rounded-full px-3 py-1 text-sm ${
                                isSelected
                                  ? "bg-[#EEE5FF] text-[#8771BC]"
                                  : "border border-gray-200"
                              }`}
                              onClick={() => {
                                const selected =
                                  tempFilterOption[filter.title] || [];
                                const isSelected = selected.includes(
                                  option.value
                                );

                                setTempFilterOption({
                                  ...tempFilterOption,
                                  [filter.title]: isSelected
                                    ? selected.filter((v) => v !== option.value)
                                    : [...selected, option.value],
                                });
                              }}
                            >
                              {option.label}
                            </button>
                          );
                        })
                      : typeof filter.element === "function"
                      ? filter.element()
                      : null}
                  </div>
                </div>
              ))}

              <button
                className="w-full mt-2 bg-[#8771BC] text-white py-2 rounded-xl"
                onClick={() => {
                  setShowFilter(false);
                }}
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Transactions */}
        <div className="overflow-x-auto">
          <div className=" md:min-w-0 space-y-4 mt-4">
            {/* Transaction Items */}
            {transactions[selectedTab].map((tx, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row lg:items-center justify-between border-t pt-4 border-gray-300 gap-2 lg:gap-0"
              >
                {/* Mobile View */}
                <div className="lg:hidden flex justify-between w-full">
                  <div className="font-medium text-gray-800">{tx.title}</div>
                  <div className="text-sm text-gray-600">{tx.date}</div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block lg:w-1/6 text-sm text-gray-800">
                  {tx.title}
                </div>
                <div className="hidden lg:block lg:w-1/6 text-sm text-gray-600">
                  {tx.date}
                </div>

                <div className="w-full lg:w-1/6 text-sm text-gray-800">
                  <span className="lg:hidden text-gray-500 mr-2">
                    Hospital:
                  </span>
                  {tx.hospital}
                </div>

                <div className="w-full lg:w-1/6 flex items-center gap-2 text-sm text-gray-600">
                  {tx.billing && (
                    <>
                      <span className="lg:hidden text-gray-500 mr-2">
                        Billing:
                      </span>
                      <FaFilePdf className="text-gray-800" size={24} />
                      {tx.billing}
                    </>
                  )}
                </div>

                <div className="w-full lg:w-1/6 text-sm font-semibold text-red-500">
                  <span className="lg:hidden text-gray-500 mr-2">Amount:</span>
                  {tx.amount}
                </div>

                <div
                  className={`w-full lg:w-1/6 text-sm ${
                    tx.issue.includes("Error")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  <span className="lg:hidden text-gray-500 mr-2">Issue:</span>
                  {tx.issue}
                </div>

                <div className="w-full lg:w-[40px] flex justify-start  mt-2 md:mt-0">
                  {tx.status === "approved" && (
                    <div className="lg:p-2 rounded-full flex items-center gap-2">
                      <span className="text-[#6CA724] lg:hidden">
                        Completed
                      </span>
                      <SquareCheck className="text-[#6CA724]" />
                    </div>
                  )}
                  {tx.status === "pending" && (
                    <div className="lg:p-2 rounded-full flex items-center gap-2">
                      <span className="text-[#F3CC5C] lg:hidden">Pending</span>
                      <Clock className="text-[#F3CC5C]" />
                    </div>
                  )}

                  {!tx.status && (
                    <div className="lg:p-2 rounded-full flex items-center gap-2">
                      <span className="text-[#8770BC] lg:hidden">
                        Run Audit
                      </span>
                      <ShieldCheck className="text-[#8770BC]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="block lg:hidden w-full mt-5 bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow justify-center">
          See All
        </button>
      </div>
    </>
  );
};

export default TransactionList;
