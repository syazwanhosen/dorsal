import { useMemo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import { HospitalComparison } from "../hospitals/HospitalComparison";
import "leaflet/dist/leaflet.css";
import {
  setHospitals,
  setSelectedHospitals,
  setSidebarOpen,
  setSelectedLocation
} from "@/features/hospitalServiceSearchSlice";
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
    if (location?.every(coord => typeof coord === 'number' && !isNaN(coord))) {
      map.flyTo(location, 15, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
};

const FitBounds = ({ hospitals }: { hospitals: any[] }) => {
  const map = useMap();

  useEffect(() => {
    const validCoords = hospitals
      .filter(h => [h.latitude, h.longitude].every(
        coord => typeof coord === 'number' && !isNaN(coord)
      ))
      .map(h => [h.latitude, h.longitude] as [number, number]);

    if (validCoords.length > 0) {
      map.fitBounds(validCoords, { padding: [50, 50] });
    }
  }, [hospitals, map]);

  return null;
};

export const HospitalServiceSearchMap = () => {
  const dispatch = useAppDispatch();
  const {
    hospitals,
    selectedHospitals,
    sortOption,
    sidebarOpen,
    selectedLocation,
    serviceSearchResults,
    loading: isSearchLoading
  } = useAppSelector((state) => state.hospitalServiceSearch);

  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);

  // Process and sort hospitals
  const sortedHospitals = useMemo(() => {
    const validHospitals = hospitals.filter(h =>
      [h.latitude, h.longitude].every(
        coord => typeof coord === 'number' && !isNaN(coord)
      ));
    
    setFilteredCount(hospitals.length - validHospitals.length);

    return validHospitals.sort((a, b) => {
      if (sortOption === "lowestPrice") return a.price - b.price;
      if (sortOption === "shortestDistance") return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });
  }, [sortOption, hospitals]);

  // Calculate map center
  const mapCenter = useMemo<LatLngExpression>(() => {
    const firstValid = sortedHospitals.find(h =>
      [h.latitude, h.longitude].every(
        coord => typeof coord === 'number' && !isNaN(coord))
    );
    return firstValid
      ? [firstValid.latitude, firstValid.longitude]
      : [39.8283, -98.5795]; // Default to US center
  }, [sortedHospitals]);

  // Fetch hospital metadata when search results change
  useEffect(() => {
    if (!serviceSearchResults?.hospital_names?.length) {
      dispatch(setHospitals([]));
      return;
    }

    setIsFetchingMetadata(true);
    fetchHospitalMetadata(serviceSearchResults.hospital_names)
      .then((responses) => {
        const formattedData = responses.map((data, index) => ({
          ...data,
          name: serviceSearchResults.hospital_names[index],
          price: serviceSearchResults.prices?.[index] || 0,
          distance: serviceSearchResults.distances?.[index] || "0",
          title: serviceSearchResults.generic_service_name || "Unknown Service",
          description: serviceSearchResults.service_description || "No description available",
          code: serviceSearchResults.code || "N/A",
          location: serviceSearchResults.location || "Not provided",
          min_price: serviceSearchResults.min_price || 0,
          max_price: serviceSearchResults.max_price || 0,
        }));
        dispatch(setHospitals(formattedData));
      })
      .catch((error) => {
        console.error("Error fetching hospital metadata:", error);
        dispatch(setHospitals([]));
      })
      .finally(() => setIsFetchingMetadata(false));
  }, [serviceSearchResults, dispatch]);

  // Clear selected hospitals when search changes
  useEffect(() => {
    dispatch(setSelectedHospitals([]));
  }, [serviceSearchResults, dispatch]);

  const handleCompare = (hospital: any) => {
    if (selectedHospitals.length < 2 && !selectedHospitals.includes(hospital)) {
      dispatch(setSelectedHospitals([...selectedHospitals, hospital]));
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
    if (!serviceSearchResults) return;
  
    const params = new URLSearchParams();
    params.set("name", encodeURIComponent(hospital.name));
    params.set("service", encodeURIComponent(serviceSearchResults.generic_service_name || ""));
    
    if (serviceSearchResults.location) {
      params.set("location", encodeURIComponent(serviceSearchResults.location));
    }
    
    const url = `/hospital_service_details?${params.toString()}`;
    window.open(url, "_blank");
  };

  const isLoading = isSearchLoading || isFetchingMetadata;

  return (
    <section className="container mb-4">
      <div className="relative lg:mt-6 mt-4 flex flex-col lg:flex-row rounded-xl overflow-hidden border border-purple-200 shadow-md h-[90vh] w-full max-w-screen-2xl mx-auto">
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

        {/* Sidebar Content */}
        <div
          className={`${
            sidebarOpen
              ? `lg:w-[30%] ${hospitals.length <= 1 ? 'h-auto' : 'h-[40vh]'} lg:h-full`
              : "h-0 lg:h-full lg:w-0"
          } transition-all duration-500 ease-in-out overflow-auto bg-white`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isLoading ? "Loading..." : `${hospitals.length} Results`}
                {filteredCount > 0 && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({filteredCount} hidden due to missing locations)
                  </span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 pb-4">
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-gray-200 pb-4 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : hospitals.length === 0 ? (
              <div className="px-4 pb-4 text-center text-gray-500">
                <p className="text-lg font-medium mb-2">No hospitals found matching your criteria</p>
                {serviceSearchResults?.generic_service_name && (
                  <p className="mt-2">Service: {serviceSearchResults.generic_service_name}</p>
                )}
                {serviceSearchResults?.location && (
                  <p>Location: {serviceSearchResults.location}</p>
                )}
                {(serviceSearchResults?.min_price || serviceSearchResults?.max_price) && (
                  <p>
                    Price range: 
                    {serviceSearchResults.min_price && ` $${serviceSearchResults.min_price}`}
                    {serviceSearchResults.max_price && ` - $${serviceSearchResults.max_price}`}
                  </p>
                )}
              </div>
            ) : (
              <div className="px-4 pb-4 space-y-4">
                {sortedHospitals.map((hospital) => (
                  <div
                    key={hospital.name}
                    onClick={() => {
                      if (hospital.latitude && hospital.longitude) {
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
                        disabled={!hospital.latitude || !hospital.longitude}
                        className={`ml-2 px-3 py-1 text-xs font-medium text-[#8770BC] bg-[#EEEBF4] rounded hover:bg-[#e0d9f0] transition ${
                          !hospital.latitude || !hospital.longitude ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Compare
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{hospital.address}</p>
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
                    {(!hospital.latitude || !hospital.longitude) && (
                      <div className="text-xs text-red-500 mt-2">
                        Location data unavailable for this hospital
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div
          className={`${
            sidebarOpen
              ? "lg:w-[70%] h-[60vh] lg:h-full"
              : "w-full h-[100vh] lg:h-full"
          } transition-all duration-500 ease-in-out`}
        >
          <MapContainer
            center={mapCenter}
            zoom={12}
            zoomControl={false}
            className="h-full w-full z-0"
          >
            <ResizeHandler sidebarOpen={sidebarOpen} />
            <FlyToLocation location={selectedLocation} />
            {sortedHospitals.length > 0 && <FitBounds hospitals={sortedHospitals} />}
            <TileLayer
              url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
              attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {sortedHospitals.map((hospital) => (
              <Marker
                key={hospital.name}
                position={[hospital.latitude, hospital.longitude]}
                icon={hospitalIcon}
              >
                <Popup>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectHospital(hospital);
                    }}
                    className="text-black hover:underline hover:text-purple-700 text-left"
                  >
                    {hospital.name}
                  </button>
                </Popup>
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
  );
};