import { useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { HospitalComparison } from "./../hospitals/HospitalComparison";
import "leaflet/dist/leaflet.css";
import {
  setHospitals,
  setSelectedHospitals,
  setSortOption,
  setSidebarOpen,
  setSelectedLocation,
} from "@/features/hospitalMapSlice";
import hospital from "../assets/hospital.png";
import location from "../assets/location-pin.svg";
import { setSelectedHospital } from "@/features/hospitalMapSlice";
import { fetchHospitalMetadata } from "@/api/Hospital/api";

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
    if (location && location[0] !== null && location[1] !== null) {
      map.flyTo(location, 15, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
};

const FitBounds = ({ hospitals }: { hospitals: any[] }) => {
  const map = useMap();

  useEffect(() => {
    if (hospitals.length === 0) return;

    const bounds: LatLngBoundsExpression = hospitals.map((h) => [
      h.latitude,
      h.longitude,
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [hospitals, map]);

  return null;
};

// Main Component
export const HospitalMap = () => {
  const dispatch = useAppDispatch();
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

  const sortedHospitals = useMemo(() => {
    return [...hospitals].sort((a, b) => {
      if (sortOption === "lowestPrice") {
        return a.price - b.price;
      } else if (sortOption === "shortestDistance") {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      }
      return 0;
    });
  }, [sortOption, hospitals]);

  const mapCenter = useMemo<LatLngExpression>(() => {
    if (sortedHospitals.length > 0) {
      return [sortedHospitals[0].latitude, sortedHospitals[0].longitude];
    }
    return [40.8106, -73.955]; // Default to New York coordinates
  }, [sortedHospitals]);

  useEffect(() => {
    if (!searchResults || !searchResults.hospital_names?.length) return;
  
    fetchHospitalMetadata(searchResults.hospital_names)
      .then((responses) => {
        const formattedData = responses.map((data, index) => ({
          ...data,
          name: searchResults.hospital_names[index],
          price: searchResults.prices?.[index] || 0,
          title: searchResults.generic_service_name || "Unknown Service",
          description: searchResults.service_description || "No description available",
          zipcode: searchResults.cpt_hcpcs_code || "N/A",
        }));
  
        dispatch(setHospitals(formattedData));
      })
      .catch((error) => console.error("Error fetching hospital metadata:", error));
  }, [searchResults, dispatch]);

  const handleCompare = (hospital: any) => {
    if (selectedHospitals.length < 2 && !selectedHospitals.includes(hospital)) {
      dispatch(setSelectedHospitals([...selectedHospitals, hospital]));
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

  useEffect(() => {
    dispatch(setSelectedHospitals([]));
  }, [searchResults, dispatch]);

  if (!searchResults) return null;

  const handleSelectHospital = (hospital: any) => {
    dispatch(
      setSelectedHospital({
        ...hospital,
        selectedState: searchResults.selectedState,
        selectedServiceCategory: searchResults.selectedServiceCategory,
        selectedSubcategory: searchResults.selectedSubcategory,
        selectedCptCode: searchResults.selectedCptCode,
        selectedServiceName: searchResults.selectedServiceName,
      })
    );

    setTimeout(() => {
      window.open("/hospital_details", "_blank");
    }, 100);
  };

  return (
    <>
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

      <div
  className={`${sidebarOpen 
    ? `lg:w-[30%] ${hospitals.length <= 1 ? 'h-auto' : 'h-[40vh]'} lg:h-full`
    : "h-0 lg:h-full lg:w-0"} 
    transition-all duration-500 ease-in-out overflow-auto bg-white`}
>


        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {hospitals.length} Results
            </h2>
            <select
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
            </select>
          </div>
        </div>
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {hospitals.length === 0 ? (
            <div className="px-4 pb-4 text-center text-gray-500">
              No hospitals found matching your criteria
            </div>
          ) : (
            <div className="px-4 pb-4 space-y-4">
              {sortedHospitals.map((hospital, idx) => (
                <div
                  key={idx}
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
                      className="ml-2 px-3 py-1 text-xs font-medium text-[#8770BC] bg-[#EEEBF4] rounded hover:bg-[#e0d9f0] transition"
                    >
                      Compare
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span>⭐ {hospital.rating || 0}</span>
                    <span className="flex items-center mx-2">
                      <img
                        src={location}
                        alt="Location Icon"
                        className="w-4 h-4"
                      />
                      {hospital.distance || "10 mi"}
                    </span>
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
          <FitBounds hospitals={sortedHospitals} />
          <TileLayer
            url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
            attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sortedHospitals.map((h, i) => (
            <Marker
              key={i}
              position={[h.latitude, h.longitude]}
              icon={hospitalIcon}
            >
              <Popup>{h.name}</Popup>
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
  </>
  );
};
