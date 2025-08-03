import { useState, useEffect, FC } from "react";
import { Button } from "@/components/ui/buttons/button"
import { Filter, PlusCircle, ArrowRight } from "lucide-react"
import { features } from "@/lib/data"
import { Tabs, TabsList, TabsTrigger, } from "@/components/ui/tab"
import { FeatureCard } from "./feature-card";
import { FeatureHighlight } from "./feature-highlight";
import { VisualRoadmap } from "./visual-roadmap";
import { Navbar } from "@/components/Navbar";

import { ScrollToTop } from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

import { FeatureType } from "@/lib/data";
import ProductRoadmap from '../../assets/shape_icon.webp';
import { getVote } from "@/lib/voteStorage"

const FILTERS = [
  {
    title: "Product Initiatives",
    options: [
      { label: "Data.fyi", value: "Data.fyi" },
      { label: "Audit & Appeals", value: "Audit & Appeals" },
      { label: "Enterprise", value: "Enterprise" },
      { label: "Community", value: "Community" },
       { label: "Companion", value: "Companion" },
    ]
  }
]

const featuredCategories = [
  {
    id: "data-fyi",
    title: "Data.fyi",
    description: "Raw healthcare pricing data, claims, and billing intelligence designed for transparency and analytics.",
    icon: "barChart",
    category: ["Data.fyi"],
    status: "Coming Soon",
    votes: 10,
    progress: 50
  },
  {
    id: "audit-appeals",
    title: "Audit & Appeals",
    description: "AI-powered tools to analyze medical bills, detect suspicious charges, and automate appeal filing processes.",
    icon: "badgeAlert",
    category: ["Audit & Appeals"],
    status: "In Progress",
    votes: 10,
    progress: 80
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "Scalable integrations and dashboards tailored for providers, payors, and health tech platforms.",
    icon: "building",
    category: ["Enterprise"],
    status: "Coming Soon",
    votes: 10,
    progress: 50
  },
  {
    id: "community",
    title: "Community",
    description: "Initiatives to build patient engagement and advocacy through gamified experiences and bill drives.",
    icon: "users",
    category: ["Community"],
    status: "Coming Soon",
    votes: 10,
    progress: 50
  },
  {
    id: "companion",
    title: "Companion",
    description: "Smart assistants and mobile tools that help patients navigate billing, insurance, and appeals in real time.",
    icon: "handshake",
    category: ["Companion"],
    status: "Coming Soon",
    votes: 10,
    progress: 50
  }
]


const Roadmap: FC = () => {
  const [activeTab, _setActiveTab] = useState("roadmap")
  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "visual">("list")
  const [showFilter, setShowFilter] = useState(false)
  const [filterOption, setFilterOption] = useState<{ [key: string]: string[] }>({});
  const [tempFilterOption, setTempFilterOption] = useState<{ [key: string]: string[] }>({});
  const [categoryVotes, setCategoryVotes] = useState<Record<string, number>>({});

  const featureMapping = async () => {
  const mapped = await Promise.all(
    features.map(async (feature) => {
      const stored = await getVote(feature.id);
      return { ...feature, votes: stored?.count ?? 0 };
    })
  );

  return mapped;
};

useEffect(() => {
  const loadVotes = async () => {
    const updatedFeatures = await featureMapping();
    const votes = updatedFeatures.reduce((acc, feature) => {
      feature.category.forEach((cat) => {
        const key = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        acc[key] = (acc[key] || 0) + feature.votes;
      });
      return acc;
    }, {} as Record<string, number>);
    setCategoryVotes(votes);
  };

  loadVotes();
}, [featureMapping]);


  const applyFilters = () => {
    return features.filter((feature) => {
      const matchesSearch =
        feature.title.toLowerCase() ||
        feature.description.toLowerCase();

      const productFilters = filterOption["Product Initiatives"] || [];

      const matchesProduct =
        productFilters.length === 0 ||
        feature.category.some((cat) => productFilters.includes(cat));
        
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategory === "Live" && feature.status === "Live") ||
        (activeCategory === "In Progress" && feature.status === "In Progress") ||
        (activeCategory === "Coming Soon" && feature.status === "Coming Soon") ||
        (activeCategory === "Proposal" && feature.status === "Proposal") ||
        (activeCategory === "Mothballed" && feature.status === "Mothballed") ||
        (activeCategory === "MVP" && feature.status === "MVP");

      return matchesSearch && matchesProduct && matchesCategory;
    });
  };

  // Filter features based on active tab and search query
  const filteredFeatures = applyFilters();

  // Get features for each tab
  const getTabFeatures = (tab: string) => {
  switch (tab) {
    case "all":
      return filteredFeatures;
    case "Live":
      return filteredFeatures.filter((f) => f.status === "Live");
    case "In Progress":
      return filteredFeatures.filter((f) => f.status === "In Progress");
    case "Coming Soon":
      return filteredFeatures.filter((f) => f.status === "Coming Soon");
    case "Proposal":
      return filteredFeatures.filter((f) => f.status === "Proposal");
    case "Mothballed":
      return filteredFeatures.filter((f) => f.status === "Mothballed");
    case "MVP":
      return filteredFeatures.filter((f) => f.status === "MVP");
    default:
      return filteredFeatures;
  }
};

  const tabFeatures = getTabFeatures(activeTab)

  // Get featured items for the highlight section
  const featuredItems: FeatureType[] = featuredCategories.map((cat: {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string | string[];
  status: string;
  votes: number | null;
  progress?: number | null;
}) => ({
  id: cat.id,
  title: cat.title,
  description: cat.description,
  icon: cat.icon,
  category: Array.isArray(cat.category)
    ? cat.category
    : (cat.category as string).split(",").map((c: string) => c.trim()),
  status: cat.status as FeatureType["status"],
  votes: categoryVotes[cat.id],
  progress: cat.progress ?? null,
}));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 pt-0">
        <main className="container mx-auto py-8">
          <div className="mx-auto">
            {/* Hero Section */}
            <div className="mb-12 bg-gradient-to-r from-[#864196] to-[#F33594] rounded-xl p-8 border border-purple-100">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left content */}
                <div className="w-full max-w-2xl">
                  <h1 className="text-3xl font-bold text-white mb-4">Dorsal.fyi Product Roadmap</h1>
                  <p className="text-white mb-6">
                    Help shape the future of medical bill transparency. Vote on features, provide feedback, and see what
                    we're building next.
                  </p>
                  <div className="flex flex-wrap gap-3">
                   <a href="#" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-white hover:bg-purple-700 group flex items-center">
                      <PlusCircle className="mr-2 h-4 w-4 stroke-purple-700 group-hover:stroke-white transition-colors" />
                      <span
                        className="
                          text-sm
                          bg-gradient-to-r from-[#E771C1] to-[#9F71FD]
                          text-transparent bg-clip-text font-semibold
                          group-hover:bg-none group-hover:text-white
                          transition-colors
                        "
                      >
                        Request a feature
                      </span>
                    </Button>
                  </a>

                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      Learn about our process
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  </div>
                </div>
                {/* Right image */}
                <div className="w-full lg:w-1/2 hidden lg:flex justify-center">
                  <img
                    src={ProductRoadmap}
                    alt="Product Roadmap"
                    className="max-w-xs w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="mb-12">
              <div className="flex items-center justify-between flex-wrap mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Project Initiatives</h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-purple text-white hover:text-white" : "bg-white text-gray-700 border border-gray-300 hover:text-white"}
                  >
                    List View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setViewMode("visual")}
                    className={viewMode === "visual" ? "bg-purple text-white hover:text-white" : "bg-white text-gray-700 border border-gray-300 hover:text-white"}
                  >
                    Visual Roadmap
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {featuredItems.map((feature) => (
                  <FeatureHighlight key={feature.id} feature={feature} />
                ))}
              </div>
            </div>

            {/* Visual Roadmap (conditionally rendered) */}
            {viewMode === "visual" && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Roadmap</h2>
                <VisualRoadmap features={features} />
              </div>
            )}

            {/* Tab and Filter */}
            <div className="mb-8 space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">All Features</h2>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:flex-1">
                  <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                    <TabsList
                        className="
                          grid grid-cols-2 gap-2 w-full bg-gray-50 rounded-xl py-2 justify-start
                          lg:flex lg:gap-2 lg:grid-cols-none
                        "
                      >
                      <TabsTrigger value="all" className="flex items-center justify-center gap-2 px-8 lg:px-4 xl:px-10">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="Live" className="flex items-center justify-center gap-2 px-8 lg:px-4 xl:px-10">
                        <span>Live</span>
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                      </TabsTrigger>
                      <TabsTrigger value="In Progress" className="flex items-center justify-center gap-2 px-8 lg:px-4 xl:px-8">
                        <span>In Progress</span>
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                      </TabsTrigger>
                      <TabsTrigger value="Coming Soon" className="flex items-center justify-center gap-2 px-8 lg:px-4 xl:px-8">
                        <span>Coming Soon</span>
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      </TabsTrigger>
                      <TabsTrigger value="Proposal" className="flex items-center justify-center gap-2 px-8 lg:px-4 xl:px-8">
                        <span>Proposal</span>
                        <span className="h-2 w-2 rounded-full bg-teal-500" />
                      </TabsTrigger>
                      <TabsTrigger value="Mothballed" className="flex items-center justify-center gap-2 px-8 lg:px-4 xl:px-8">
                        <span>Mothballed</span>
                        <span className="h-2 w-2 rounded-full bg-gray-500" />
                      </TabsTrigger>
                      <TabsTrigger value="MVP" className="flex items-center justify-center gap-2 px-8 xl:px-16 lg:px-4 xl:px-8 xl:px-10">
                        <span>MVP</span>
                        <span className="h-2 w-2 rounded-full bg-pink" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="w-full sm:w-auto sm:ml-4 flex flex-row justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 w-full sm:w-auto relative"
                      onClick={() => setShowFilter(!showFilter)}
                    >
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  {showFilter && (
                    <div className="absolute right-0 top-0 z-50 w-72 bg-white border shadow-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Filter Features</h3>
                        {/* Reset Button */}
                        <button
                          className="text-sm text-[#8771BC] bg-[#EEE5FF] px-3 py-1 ml-6 rounded-full"
                          onClick={() => {
                            setTempFilterOption({});
                            setFilterOption({});
                            setShowFilter(false);
                          }}
                        >
                          Reset
                        </button>
                        {/* X Icon button */}
                        <button
                          className="w-7 h-7 flex items-center justify-end hover:text-purple-700"
                          aria-label="Close"
                          onClick={() => setShowFilter(false)}
                          type="button"
                        >
                          {/* X SVG */}
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {
                        FILTERS.map((filter) => (
                          <div key={filter.title} className="mb-4">
                            <h4 className="text-sm font-medium mb-4">{filter.title}</h4>
                            <div className="flex gap-2 flex-wrap">
                              {filter.options.map((option) => {
                                const isSelected = tempFilterOption[filter.title]?.includes(option.value);

                                return (
                                  <button
                                    key={option.value}
                                    className={`rounded-full px-3 py-1 text-sm ${isSelected ? "bg-[#EEE5FF] text-[#8771BC]" : "border border-gray-200"
                                      }`}
                                    onClick={() => {
                                      const selected = tempFilterOption[filter.title] || [];
                                      const isSelected = selected.includes(option.value);

                                      setTempFilterOption({
                                        ...tempFilterOption,
                                        [filter.title]: isSelected
                                          ? selected.filter((v) => v !== option.value)
                                          : [...selected, option.value]
                                      });
                                    }}

                                  >
                                    {option.label}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                        )
                      }


                      <button
                        className="w-full mt-2 bg-[#8771BC] text-white py-2 rounded-xl"
                        onClick={() => {
                          setShowFilter(false);
                          setFilterOption(tempFilterOption);
                        }}
                      >
                        Apply
                      </button>

                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tabFeatures.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500">No features match your criteria.</p>
                </div>
              ) : (
                tabFeatures.map((feature) => <FeatureCard key={feature.id} feature={feature} featureMapping={featureMapping}/>)
              )}
            </div>

          </div>
        </main>

      </div>
     <Footer />
      <ScrollToTop />
    </>
  );
};

export default Roadmap;
