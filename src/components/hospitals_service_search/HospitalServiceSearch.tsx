import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setServiceSearchLoading,
  setServiceSearchResults,
  setFilters,
} from "../../features/hospitalServiceSearchSlice";
import {
  searchHospitalServices,
  getServiceNameSuggestions,
  getLocationSuggestions,
} from "@/api/Hospital/api";
import { useNavigate, useLocation } from "react-router-dom";

const buildQueryString = (params: Record<string, string>) =>
  Object.entries(params)
    .filter(([_, value]) => value?.trim())
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

export const HospitalServiceSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useAppSelector(
    (state) => state.hospitalServiceSearch
  );

  const [filters, setLocalFilters] = useState({
    search: "",
    location: "",
    min_price: "",
    max_price: "",
  });

  const [serviceSuggestions, setServiceSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();
  const searchTriggeredRef = useRef(false);
  const [, setHydrationCompleted] = useState(false);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Hydrate from URL and perform initial search if needed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const locationParam = params.get("location");
    const min_price = params.get("min_price");
    const max_price = params.get("max_price");

    if (search) {
      const newFilters = {
        search: search || "",
        location: locationParam || "",
        min_price: min_price || "",
        max_price: max_price || "",
      };

      // Update both local and redux state
      setLocalFilters(newFilters);
      dispatch(setFilters(newFilters));

      // Only perform search if we have required parameters
      if (search && !searchTriggeredRef.current) {
        searchTriggeredRef.current = true;
        performSearch(newFilters);
      }
    }

    setHydrationCompleted(true);
  }, [location.search, dispatch]);

  const validatePrices = (min: string, max: string): boolean => {
    if (min && max && Number(min) > Number(max)) {
      alert("Minimum price cannot be greater than maximum price");
      return false;
    }
    return true;
  };

  const fetchServiceSuggestions = async (query: string) => {
    try {
      const suggestions = await getServiceNameSuggestions();
      const filtered = suggestions.filter((suggestion: string) =>
        suggestion.toLowerCase().startsWith(query.toLowerCase())
      );
      setServiceSuggestions(filtered);
      setShowServiceSuggestions(query.length >= 1);
    } catch (error) {
      console.error("Failed to fetch service suggestions:", error);
      setServiceSuggestions([]);
      setShowServiceSuggestions(false);
    }
  };

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const suggestions = await getLocationSuggestions();
      const filtered = suggestions.filter((location: string) =>
        location.toLowerCase().startsWith(query.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(query.length >= 1);
    } catch (error) {
      console.error("Failed to fetch location suggestions:", error);
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setLocalFilters(newFilters);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (field === "search") {
        fetchServiceSuggestions(value);
      } else if (field === "location") {
        fetchLocationSuggestions(value);
      }
    }, 300);
  };

  const handleSuggestionSelect = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));

    if (field === "search") {
      setShowServiceSuggestions(false);
    } else if (field === "location") {
      setShowLocationSuggestions(false);
    }
  };

  const performSearch = (searchFilters: typeof filters) => {
    const { search, location, min_price, max_price } = searchFilters;
    
    if (!search) {
      alert("Please enter a service name.");
      return;
    }

    if (!validatePrices(min_price, max_price)) {
      return;
    }

    // Update URL
    const queryParams: Record<string, string> = { search };
    if (location) queryParams.location = location;
    if (min_price) queryParams.min_price = min_price;
    if (max_price) queryParams.max_price = max_price;

    const queryString = buildQueryString(queryParams);
    navigate(`/hospital_search?${queryString}`, { replace: true });

    // Perform search
    const params = {
      service_name: search,
      location: location || undefined,
      min_price: min_price ? Number(min_price) : undefined,
      max_price: max_price ? Number(max_price) : undefined,
    };

    dispatch(setServiceSearchLoading(true));
    searchHospitalServices(params)
      .then((data) => {
        dispatch(
          setServiceSearchResults({
            code: data.code || "",
            service_description: data.service_description || "",
            hospital_count: data.hospital_count || 0,
            hospital_names: data.hospital_names || [],
            prices: data.prices || [],
            distances: data.distances || [],
            generic_service_name: data.generic_service_name || search,
            location: location || "",
            min_price: min_price ? Number(min_price) : undefined,
            max_price: max_price ? Number(max_price) : undefined,
          })
        );
      })
      .catch((error) => {
        console.error("❌ Error performing search:", error);
        dispatch(
          setServiceSearchResults({
            code: "",
            service_description: "",
            hospital_count: 0,
            hospital_names: [],
            prices: [],
            distances: [],
            generic_service_name: search,
            location: location || "",
            min_price: min_price ? Number(min_price) : undefined,
            max_price: max_price ? Number(max_price) : undefined,
          })
        );
      })
      .finally(() => dispatch(setServiceSearchLoading(false)));
  };

  const handleSearch = () => {
    searchTriggeredRef.current = true;
    performSearch(filters);
  };

  return (
    <section id="SearchHospital" className="container relative z-0 py-6">
      <div className="flex flex-wrap lg:flex-nowrap items-center border border-purple-400 rounded bg-white text-sm relative z-[1]">
        <div className="flex flex-wrap flex-grow">
          {[
            {
              key: "search",
              label: "Search",
              placeholder: "Enter service name",
              suggestions: serviceSuggestions,
              showSuggestions: showServiceSuggestions && filters.search.length >= 1,
            },
            {
              key: "location",
              label: "Location",
              placeholder: "Enter location",
              suggestions: locationSuggestions,
              showSuggestions: showLocationSuggestions && filters.location.length >= 1,
            },
            {
              key: "min_price",
              label: "Min Price",
              placeholder: "Enter min price",
              type: "number",
            },
            {
              key: "max_price",
              label: "Max Price",
              placeholder: "Enter max price",
              type: "number",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 lg:border-r md:border-r p-2"
            >
              <label className="block text-xs text-black font-semibold">
                {item.label}
              </label>
              <input
                type={item.type || "text"}
                className="w-full focus:outline-none text-sm bg-white"
                value={filters[item.key as keyof typeof filters]}
                onChange={(e) => handleInputChange(item.key, e.target.value)}
                placeholder={item.placeholder}
                onFocus={() => {
                  if (item.key === "search" && filters.search.length >= 1) {
                    setShowServiceSuggestions(true);
                  } else if (item.key === "location" && filters.location.length >= 1) {
                    setShowLocationSuggestions(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => {
                    if (item.key === "search") setShowServiceSuggestions(false);
                    if (item.key === "location") setShowLocationSuggestions(false);
                  }, 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                min={item.key === "min_price" || item.key === "max_price" ? "0" : undefined}
              />
              {item.showSuggestions && (
                <div className="absolute top-full left-0 w-full overflow-x-hidden bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-[999]">
                  {item.suggestions.length > 0 ? (
                    item.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSuggestionSelect(item.key, suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No matching suggestions found
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-purple hover:bg-purple-700 text-white px-10 lg:py-4 py-2 sm:px-10 text-sm font-semibold border lg:w-auto w-full disabled:opacity-50"
        >
          {loading ? "Searching..." : "SEARCH"}
        </button>
      </div>
    </section>
  );
};