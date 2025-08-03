import { useEffect, useState } from "react";
import {
  fetchStates,
  fetchHospitals,
  fetchPriceComparison,
} from "../../api/Hospital/api";
import { CostMap } from "./Map";

const DEFAULT_STATE_1 = "FL - Florida";
const DEFAULT_HOSPITAL_1 = "Lakewood Ranch Medical Center";
const DEFAULT_STATE_2 = "CA - California";
const DEFAULT_HOSPITAL_2 = "Marian Regional Medical Center";

export const CostCompare = () => {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState1, setSelectedState1] = useState(DEFAULT_STATE_1);
  const [selectedState2, setSelectedState2] = useState(DEFAULT_STATE_2);
  const [hospitals1, setHospitals1] = useState<string[]>([]);
  const [hospitals2, setHospitals2] = useState<string[]>([]);
  const [selectedHospital1, setSelectedHospital1] =
    useState(DEFAULT_HOSPITAL_1);
  const [selectedHospital2, setSelectedHospital2] =
    useState(DEFAULT_HOSPITAL_2);
  const [priceType, setPriceType] = useState<"min" | "max">("min");
  const [loading, setLoading] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const statesData = await fetchStates();
        setStates(statesData);
      } catch (error) {
        console.error("Error loading states:", error);
      }
    };
    loadStates();
  }, []);

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const [hospitalsData1, hospitalsData2] = await Promise.all([
          fetchHospitals(DEFAULT_STATE_1),
          fetchHospitals(DEFAULT_STATE_2),
        ]);
        setHospitals1(hospitalsData1);
        setHospitals2(hospitalsData2);
      } catch (error) {
        console.error("Error loading hospitals:", error);
      }
    };
    loadHospitals();
  }, []);

  useEffect(() => {
    if (selectedState1 && selectedState1 !== DEFAULT_STATE_1) {
      const loadHospitals = async () => {
        try {
          const hospitalsData = await fetchHospitals(selectedState1);
          setHospitals1(hospitalsData);
          setSelectedHospital1("");
        } catch (error) {
          console.error(
            `Error loading hospitals for ${selectedState1}:`,
            error
          );
        }
      };
      loadHospitals();
    }
  }, [selectedState1]);

  useEffect(() => {
    if (selectedState2 && selectedState2 !== DEFAULT_STATE_2) {
      const loadHospitals = async () => {
        try {
          const hospitalsData = await fetchHospitals(selectedState2);
          setHospitals2(hospitalsData);
          setSelectedHospital2("");
        } catch (error) {
          console.error(
            `Error loading hospitals for ${selectedState2}:`,
            error
          );
        }
      };
      loadHospitals();
    }
  }, [selectedState2]);

  useEffect(() => {
    if (iframeLoaded && selectedHospital1 && selectedHospital2) {
      const timer = setTimeout(() => {
        handleCompare("min");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [iframeLoaded, selectedHospital1, selectedHospital2]);

  const handleCompare = async (type: "min" | "max") => {
    if (!selectedHospital1 || !selectedHospital2) return;

    setPriceType(type);
    setLoading(true);

    try {
      const data = await fetchPriceComparison(
        selectedHospital1,
        selectedHospital2
      );
      const chartData = Object.keys(data).reduce((acc, service) => {
        acc[service] = {
          [selectedHospital1]: data[service][selectedHospital1],
          [selectedHospital2]: data[service][selectedHospital2],
        };
        return acc;
      }, {} as Record<string, Record<string, { min: number; max: number }>>);

      sendDataToIframe(chartData, type);
    } catch (error) {
      console.error("Comparison error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendDataToIframe = (chartData: any, type: "min" | "max") => {
    const iframe = document.getElementById("chartFrame") as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: "compareHospitals",
          hospitals: [selectedHospital1, selectedHospital2],
          data: chartData,
          priceType: type,
        },
        "*"
      );
    } else {
      // Retry after a short delay if iframe isn't ready
      setTimeout(() => sendDataToIframe(chartData, type), 300);
    }
  };

  return (
    <section
      id="HospitalPrices"
      className="container pt-4 lg:pb-12 pb-8"
    >
      <div className="grid gap-4">
        <h2 className="text-xl font-bold text-left">
          <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
            Cost Comparison{" "}
          </span>
          Across Medical Services
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:py-5">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2 lg:pr-8">
            <div className="relative w-full">
              <select
                value={selectedState1}
                onChange={(e) => setSelectedState1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white pr-12 appearance-none"
                style={{
                  color: "#495057",
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1em",
                  transition: "var(--transition)",
                }}
                disabled={loading}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full">
              <select
                value={selectedHospital1}
                onChange={(e) => setSelectedHospital1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded bg-white pr-12"
                disabled={!selectedState1 || loading}
              >
                <option value="">Select Hospital</option>
                {hospitals1.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-2xl font-bold text-purple md:block">VS</div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2 lg:pl-8">
            <div className="relative w-full">
              <select
                value={selectedState2}
                onChange={(e) => setSelectedState2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black pr-12"
                disabled={loading}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-full">
              <select
                value={selectedHospital2}
                onChange={(e) => setSelectedHospital2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black pr-12"
                disabled={!selectedState2 || loading}
              >
                <option value="">Select Hospital</option>
                {hospitals2.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full h-48 sm:h-64 md:h-80 min-h-[600px] bg-white border items-center justify-center rounded px-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-center py-5">
            <div className="text-lg font-bold text-black pb-4">
              {priceType === "min"
                ? "Comparing Minimum Price"
                : "Comparing Maximum Price"}
            </div>

            <div className="relative">
              <select
                value={priceType}
                onChange={(e) => handleCompare(e.target.value as "min" | "max")}
                className="px-4 py-2 rounded bg-purple text-white cursor-pointer pr-8 appearance-none"
                style={{
                  color: "#FFFFFF",
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1em",
                  transition: "var(--transition)",
                }}
              >
                <option value="min">Show Minimum Prices</option>
                <option value="max">Show Maximum Prices</option>
              </select>
            </div>
          </div>

          {selectedHospital1 && selectedHospital2 ? (
            <CostMap onLoad={() => setIframeLoaded(true)} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center text-gray-600 text-base px-4">
              Choose hospitals from the dropdowns above to view pricing
              comparison
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
