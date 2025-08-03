import { useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import { HospitalComparison } from "./HospitalComparison";
import "leaflet/dist/leaflet.css";
import {
  setHospitals,
  setSelectedHospitals,
  setSidebarOpen,
  setSelectedLocation,
} from "@/features/hospitalMapSlice";
import hospital from "@/assets/hospital.png";
import { fetchHospitalMetadata } from "@/api/Hospital/api";
import { toast } from "sonner";

const accessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;

const hospitalIcon = new Icon({
  iconUrl: hospital,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Helper Components
const ResizeHandler = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
  const map = useMap();
  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize({ animate: true });
    }, 500);
    return () => clearTimeout(timeout);
  }, [sidebarOpen, map]);
  return null;
};

const FlyToLocation = ({ location }: { location: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (
      location?.every((coord) => typeof coord === "number" && !isNaN(coord))
    ) {
      map.flyTo(location, 15, { duration: 1.5 });
    }
  }, [location, map]);
  return null;
};

const FitBounds = ({ hospitals }: { hospitals: any[] }) => {
  const map = useMap();
  useEffect(() => {
    const validCoords = hospitals
      .filter((h) =>
        [h.latitude, h.longitude].every(
          (coord) => typeof coord === "number" && !isNaN(coord)
        )
      )
      .map((h) => [h.latitude, h.longitude] as [number, number]);

    if (validCoords.length > 0) {
      map.fitBounds(validCoords, { padding: [50, 50] });
    }
  }, [hospitals, map]);
  return null;
};

// Main Component
export const HospitalMap = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);

  const {
    searchResults,
    hospitals,
    selectedHospitals,
    sortOption,
    sidebarOpen,
    selectedLocation,
  } = useAppSelector((state) => ({
    searchResults: state.hospital.searchResults,
    ...state.hospitalMap,
  }));

  // Clear previous data when search changes
  useEffect(() => {
    dispatch(setHospitals([]));
    dispatch(setSelectedHospitals([]));
    setFilteredCount(0);
  }, [searchResults, dispatch]);

  const sortedHospitals = useMemo(() => {
    // Filter out hospitals with invalid coordinates
    const validHospitals = hospitals.filter((h) =>
      [h.latitude, h.longitude].every(
        (coord) => typeof coord === "number" && !isNaN(coord)
      )
    );

    // Track how many were filtered out
    setFilteredCount(hospitals.length - validHospitals.length);

    // Sort based on current option
    return validHospitals.sort((a, b) => {
      if (sortOption === "lowestPrice") return a.price - b.price;
      if (sortOption === "shortestDistance")
        return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });
  }, [sortOption, hospitals]);

  // Calculate map center - fallback to US center if no valid hospitals
  const mapCenter = useMemo<LatLngExpression>(() => {
    const firstValid = sortedHospitals.find((h) =>
      [h.latitude, h.longitude].every(
        (coord) => typeof coord === "number" && !isNaN(coord)
      )
    );
    return firstValid
      ? [firstValid.latitude, firstValid.longitude]
      : [39.8283, -98.5795];
  }, [sortedHospitals]);

  // Fetch hospital data when search results change
  useEffect(() => {
    if (!searchResults?.hospital_names?.length) return;

    setIsLoading(true);
    fetchHospitalMetadata(searchResults.hospital_names)
      .then((responses) => {
        console.log("Raw API Response:", responses);

        // Track missing data
        const missingDataHospitals: { name: string; index: number }[] = [];

        const formattedData = responses.map((data, index) => {
          const hospitalName = searchResults.hospital_names[index];
          const hasValidCoords =
            typeof data.latitude === "number" &&
            typeof data.longitude === "number" &&
            !isNaN(data.latitude) &&
            !isNaN(data.longitude);

          if (!hasValidCoords) {
            missingDataHospitals.push({
              name: hospitalName,
              index: index,
            });
            console.warn(
              `Hospital missing coordinates: ${hospitalName} at index ${index}`
            );
          }

          // Additional check for empty objects
          if (Object.keys(data).length === 0) {
            console.error(
              `Empty hospital data received for: ${hospitalName} at index ${index}`
            );
          }

          return {
            ...data,
            name: hospitalName,
            price: searchResults.prices?.[index] || 0,
            title: searchResults.generic_service_name || "Unknown Service",
            description:
              searchResults.service_description || "No description available",
            zipcode: searchResults.cpt_hcpcs_code || "N/A",
          };
        });

        // Log summary of missing data
        if (missingDataHospitals.length > 0) {
          console.group("Hospitals with missing location data");
          missingDataHospitals.forEach((h) => {
            console.log(`- ${h.name} (index ${h.index})`);
          });
          console.groupEnd();
        }

        dispatch(setHospitals(formattedData));
        setFilteredCount(missingDataHospitals.length);
      })
      .catch((error) => {
        console.error("Error fetching hospital metadata:", error);
        dispatch(setHospitals([]));
      })
      .finally(() => setIsLoading(false));
  }, [searchResults, dispatch]);

  const handleCompare = (hospital: any) => {
    if (selectedHospitals.length < 2 && !selectedHospitals.includes(hospital)) {
      dispatch(setSelectedHospitals([...selectedHospitals, hospital]));
    // Show toast only on first hospital add
    if (selectedHospitals.length === 0) {
      toast.info("Hospital added to comparison. Scroll down to view table.", {
        position: "top-center",       
      });
    }
    } else {
      alert("You can only compare up to 2 hospitals at a time.");
    }
  };

  const handleRemoveHospital = (hospitalName: string) => {
    dispatch(
      setSelectedHospitals(
        selectedHospitals.filter((h) => h.name !== hospitalName)
      )
    );
  };

  const handleSelectHospital = (hospital: any) => {
    if (!searchResults) return;
    //Build  query parameters
    const params = new URLSearchParams();
    params.set("name", encodeURIComponent(hospital.name));
    // Only include either 'service' or 'code', not both
    if (searchResults.selectedServiceName) {
      params.set(
        "service",
        encodeURIComponent(searchResults.selectedServiceName)
      );
    } else if (searchResults.cpt_hcpcs_code) {
      params.set("code", encodeURIComponent(searchResults.cpt_hcpcs_code));
    }
    const url = `/hospital_details?${params.toString()}`;
    setTimeout(() => {
      window.open(url, "_blank");
    }, 100);
  };

  return (
    <>
      <section
        id="MapResult"
        className="container pb-6 mt-2"
      >
        <div className="relative lg:mt-12 mt-8 flex flex-col lg:flex-row rounded-xl overflow-hidden border border-purple-200 shadow-md h-[90vh] w-full max-w-screen-2xl mx-auto">
          {/* Mobile Toggle Button */}
          <button
            onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
            className={`lg:hidden z-20 h-12 w-full flex items-center justify-center bg-white shadow-sm transition-all duration-300 ${
              sidebarOpen ? "border-b border-gray-200" : ""
            }`}
          >
            <span className="text-gray-600 mr-2">
              {sidebarOpen ? "Hide Results" : "Show Results"}
            </span>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                sidebarOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
            className={`absolute z-20 top-4 h-12 w-10 items-center justify-center bg-white shadow-sm transition-all duration-300 hidden lg:flex ${
              sidebarOpen ? "left-[calc(31%-16px)]" : "left-0"
            } rounded-tr-lg rounded-br-lg hidden lg:block`}
          >
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                !sidebarOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Sidebar Content */}
          <div
            className={`${
              sidebarOpen
                ? `lg:w-[30%] ${
                    hospitals.length <= 1 ? "h-auto" : "h-[40vh]"
                  } lg:h-full`
                : "h-0 lg:h-full lg:w-0"
            } 
            transition-all duration-500 ease-in-out overflow-auto bg-white`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {sortedHospitals.length} Results
                  {filteredCount > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({filteredCount} hidden due to missing locations)
                    </span>
                  )}
                </h2>
              {/*  <select
                  value={sortOption}
                  onChange={(e) =>
                    dispatch(
                      setSortOption(
                        e.target.value as "lowestPrice" | "shortestDistance"
                      )
                    )
                  }
                  className="border border-gray-300 lg:px-8 px-6 py-1 rounded-md text-sm"
                >
                  <option value="lowestPrice">Lowest Price</option>
                   <option value="shortestDistance">Shortest Distance</option> 
                </select>*/}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 pb-4 text-center">
                  Loading hospitals...
                </div>
              ) : hospitals.length === 0 ? (
                <div className="px-4 pb-4 text-center text-gray-500">
                  No hospitals found matching your criteria
                </div>
              ) : (
                <div className="px-4 pb-4 space-y-4">
                  {sortedHospitals.map((hospital) => {
                    const hasValidCoords = [
                      hospital.latitude,
                      hospital.longitude,
                    ].every(
                      (coord) => typeof coord === "number" && !isNaN(coord)
                    );

                    return (
                      <div
                        key={hospital.name}
                        onClick={() => {
                          if (hasValidCoords) {
                            dispatch(
                              setSelectedLocation([
                                hospital.latitude,
                                hospital.longitude,
                              ])
                            );
                          }
                        }}
                        className="border-b border-gray-200 pb-4 cursor-pointer hover:bg-purple-50 p-2 transition last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectHospital(hospital);
                              }}
                              className="text-black hover:underline hover:text-purple-700 text-left"
                            >
                              {hospital.name}
                            </button>
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompare(hospital);
                            }}
                            className={`ml-2 px-3 py-1 text-xs font-medium text-[#8770BC] bg-[#EEEBF4] rounded hover:bg-[#e0d9f0] transition ${
                              !hasValidCoords
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={!hasValidCoords}
                          >
                            Compare
                          </button>
                        </div>
                        {/* <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>⭐ {hospital.rating || 0}</span>
                          <span className="flex items-center mx-2">
                            <img
                              src={location}
                              alt="Location Icon"
                              className="w-4 h-4"
                            />
                            {hospital.distance || "10 mi"}
                          </span>
                        </div> */}
                        <p className="text-sm text-gray-500 mt-1">
                          {hospital.address}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                              hospital.negotiation_status === "Fixed"
                                ? "bg-[#6CA724] text-white"
                                : "bg-[#CE3C29] text-white"
                            }`}
                          >
                            {hospital.negotiation_status} Price
                          </span>
                          <span className="text-[#8770BC] text-xl font-bold">
                            ${hospital.price}
                          </span>
                        </div>
                        {!hasValidCoords && (
                          <div className="text-xs text-red-500 mt-2">
                            Location data unavailable for this hospital
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Map Container - Always visible */}
          <div
            className={`${
              sidebarOpen
                ? "lg:w-[70%] h-[60vh] lg:h-full"
                : "h-[100vh] lg:h-full"
            } transition-all duration-500 ease-in-out w-full`}
          >
            <MapContainer
              center={mapCenter}
              zoom={12}
              zoomControl={false}
              className="h-full w-full z-0"
            >
              <ResizeHandler sidebarOpen={sidebarOpen} />
              <FlyToLocation location={selectedLocation} />
              {sortedHospitals.length > 0 && (
                <FitBounds hospitals={sortedHospitals} />
              )}
              <TileLayer
                url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
                attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {sortedHospitals.map((h) => (
                <Marker
                  key={h.name}
                  position={[h.latitude, h.longitude]}
                  icon={hospitalIcon}
                >
                  <Popup><p className="cursor-pointer" onClick={() => handleSelectHospital({name: h.name})}>{h.name}</p></Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {selectedHospitals.length > 0 && (
          <HospitalComparison
            selectedHospitals={selectedHospitals}
            onRemoveHospital={handleRemoveHospital}
          />
        )}
      </section>
    </>
  );
};
