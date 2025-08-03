import { useState, useEffect } from "react";
import USMap from "./USMap";
import SearchBar from "./SearchBar";
import DataDisplay from "./DataDisplay";
import { stateNames } from "../../utils/stateUtils";
import { fetchCategories, fetchPricingData } from "../../api/Hospital/api";
import { getColor } from "../../utils/colorUtils";

interface PriceItem {
  state: string;
  value: number | null;
  color: string;
}

export const StatewisePricing = () => {
  const [stateName, setStateName] = useState("");
  const [pricingData, setPricingData] = useState<Record<string, number>>({});
  const [distributedPrices, setDistributedPrices] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState("Overall");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    setStateName("");
    setPricingData({});
    setDistributedPrices({});
  }, [selectedCategory]);

  useEffect(() => _onFetchPricingData() ,[])

  const handleReset = () => {
    setSelectedCategory("");
    setStateName("");
    setPricingData({});
  };

  const _onFetchPricingData = () => {
    fetchPricingData(selectedCategory)
      .then((data) => {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
          alert("No pricing data available for this category.");
          return;
        }
  
        const processedData: Record<string, number> = {};
        const rawPrices = data.prices;
        const distributed = data.distributed_prices || {};
  
        for (const state in rawPrices) {
          const priceValue = rawPrices[state];
          let value: number | null | undefined;
          
          if (typeof priceValue === 'number') {
            value = priceValue;
          } else if (priceValue && 'avg' in priceValue) {
            value = priceValue.avg;
          }
  
          if (value !== null && value !== undefined) {
            let abbr = state.length === 2 ? state.toUpperCase() : "";
            if (!abbr) {
              for (const fips in stateNames) {
                if (stateNames[fips].name.toLowerCase() === state.toLowerCase()) {
                  abbr = stateNames[fips].abbr;
                  break;
                }
              }
            }
            if (abbr) processedData[abbr] = parseFloat(value.toString());
          }
        }
  
        setPricingData(processedData);
        setDistributedPrices(distributed);
      })
      .catch((err) => {
        console.error("Error fetching pricing data:", err);
        alert(`Failed to load pricing data: ${err.message || "Unknown error"}. Please try again.`);
      });
  }

  const loadPricingData = () => {
    if (!selectedCategory) return alert("Please select a category first");
  
    else _onFetchPricingData()
  };

  const prices = Object.values(pricingData).filter((p) => !isNaN(p));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const getAbbr = (name: string) => Object.values(stateNames).find(s => s.name === name)?.abbr || "";
  const selectedAbbr = getAbbr(stateName);
  const selectedPrice = pricingData[selectedAbbr] ?? 0;
  const selectedColor = getColor(selectedPrice, minPrice, maxPrice);

  const distributedPriceItems: PriceItem[] = Object.entries(distributedPrices).map(([abbr, value]) => {
    const state = Object.values(stateNames).find((s) => s.abbr === abbr)?.name || abbr;
    return {
      state,
      value: value !== null && value !== undefined ? parseFloat(value.toFixed(2)) : null,
      color: getColor(value, minPrice, maxPrice)
    };
  });
  
  
  return (
    <section id="StatewisePricing" className="container py-4">
  <div className="grid gap-6">
    <h2 className="text-xl font-bold text-left">
      Statewide{" "}
      <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
      Healthcare{" "}Price{" "}
      </span>
      Comparison
    </h2>

    <div className="flex flex-col lg:flex-row gap-6">
      {/* US Map Card */}
      <div className="border rounded-lg p-4 shadow-sm w-full lg:w-2/3">
        <h2 className="text-lg font-bold text-center lg:text-left mb-2">
          {selectedCategory || ""}
        </h2>
        <div className="w-full h-96 sm:h-[28rem] md:h-[32rem] flex items-center justify-center rounded">
          <div id="us-map" className="w-full max-w-[900px] mx-auto">
            <USMap
              onStateHover={(state) => setStateName(state)}
              pricingData={pricingData}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <SearchBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleReset={handleReset}
          onGenerateHeatmap={loadPricingData}
        />

        {selectedCategory && (
          <>
            {distributedPriceItems.length > 0 && (
              <DataDisplay label="Distributed Prices" items={distributedPriceItems} />
            )}

            {stateName && (
              <DataDisplay
                label="Selected State"
                items={[
                  {
                    state: stateName || "No State selected",
                    value:
                      isNaN(selectedPrice) || selectedPrice === 0
                        ? null
                        : selectedPrice,
                    color: selectedColor,
                  },
                ]}
              />
            )}
          </>
        )}
      </div>
    </div>
  </div>
</section>

  );
};