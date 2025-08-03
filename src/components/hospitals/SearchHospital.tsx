import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilters,
  setOptions,
  setLoading,
  setSearchResults,
  setIsHydratingFromURL,
} from "../../features/hospitalSlice";
import {
  getStates,
  getCategories,
  getSubCategories,
  updateDropdowns,
  searchHospitals,
} from "@/api/Hospital/api";
import { useNavigate, useLocation } from "react-router-dom";

const buildQueryString = (params: Record<string, string>) =>
  Object.entries(params)
    .filter(([_, value]) => value?.trim())
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const validateFilters = (
  filters: any,
  options: any
): { isValid: boolean; message?: string } => {
  if (filters.state?.trim() && !options.state.includes(filters.state.trim())) {
    return { isValid: false, message: "Please select a valid State" };
  }

  if (!filters.category?.trim()) {
    return { isValid: false, message: "Please select a Service Category" };
  }
  if (
    !filters.subcategory?.trim() ||
    !options.subcategory.includes(filters.subcategory.trim())
  ) {
    return { isValid: false, message: "Please select a valid Subcategory" };
  }
  if (!filters.cpt?.trim() && !filters.service?.trim()) {
    return {
      isValid: false,
      message: "Please select either a CPT code or Service name",
    };
  }
  if (filters.cpt?.trim() && !options.cpt.includes(filters.cpt.trim())) {
    return { isValid: false, message: "Please select a valid CPT code" };
  }
  if (
    filters.service?.trim() &&
    !options.service.includes(filters.service.trim())
  ) {
    return { isValid: false, message: "Please select a valid Service name" };
  }
  return { isValid: true };
};

export const SearchHospital = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { filters, options, loading, isHydratingFromURL } = useAppSelector(
    (state: { hospital: any }) => state.hospital
  );
 
  const hydratedOnceRef = useRef(false); 
  const searchTriggeredRef = useRef(false); // New ref to track if search was triggered
  const [hydrationCompleted, setHydrationCompleted] = useState(false);

  const [, setDropdownVisible] = useState({
    state: false,
    category: false,
    subcategory: false,
    cpt: false,
    service: false,
  });

  const [disabledFields, setDisabledFields] = useState({
    cpt: false,
    service: false,
  });

  const [searchError, setSearchError] = useState<string | null>(null);

  const runSearch = (params: URLSearchParams, fromHydration = false) => {
    if (fromHydration && searchTriggeredRef.current) return; // Skip if already triggered by button
    
    dispatch(setLoading(true));
    setSearchError(null);

    const state = params.get("state") ?? "";
    const category = params.get("service_category") ?? "";
    const subcategory = params.get("sub_category") ?? "";
    const cpt = params.get("cpt_code") ?? "";
    const service = params.get("service_name") ?? "";

    searchHospitals(params)
      .then((data) => {
        dispatch(
          setSearchResults({
            ...data,
            selectedState: state,
            selectedServiceCategory: category,
            selectedSubcategory: subcategory,
            selectedCptCode: cpt,
            selectedServiceName: service,
          })
        );
      })
      .catch((error) => {
        console.error("Search error:", error);
        setSearchError("Failed to perform search. Please try again.");
      })
      .finally(() => dispatch(setLoading(false)));
  };

  // States
  useEffect(() => {
    getStates()
      .then((data: any) =>
        dispatch(setOptions({ field: "state", values: data }))
      )
      .catch((error: any) => console.error("Error loading states:", error));
  }, [dispatch]);

  // Categories
  useEffect(() => {
    if (filters.state?.trim()) {
      getCategories(filters.state)
        .then((data) => {
          let categories = Array.isArray(data)
            ? data
            : data.categories ?? data.service_categories ?? [];
          dispatch(setOptions({ field: "category", values: categories }));
        })
        .catch((error) => {
          console.error("Error loading categories by state:", error);
        });
    } else {
      getCategories()
        .then((data) => {
          let categories = Array.isArray(data)
            ? data
            : data.categories ?? data.service_categories ?? [];
          dispatch(setOptions({ field: "category", values: categories }));
        })
        .catch((error) => {
          console.error("Error loading nationwide categories:", error);
        });
    }
  }, [filters.state, dispatch]);

  // Sub-categories
  useEffect(() => {
    if (!filters.category) return;

    if (filters.state?.trim()) {
      getSubCategories(filters.category, filters.state)
        .then((data) => {
          const subcategories = Array.isArray(data.sub_categories) 
            ? data.sub_categories 
            : data.sub_categories?.sub_categories ?? [];
          dispatch(setOptions({ field: "subcategory", values: subcategories }));
        })
        .catch((error) => {
          console.error("Error loading subcategories by state:", error);
        });
    } else {
      getSubCategories(filters.category)
        .then((data) => {
          const subcategories = Array.isArray(data.sub_categories) 
            ? data.sub_categories 
            : data.sub_categories?.sub_categories ?? [];
          dispatch(setOptions({ field: "subcategory", values: subcategories }));
        })
        .catch((error) => {
          console.error("Error loading subcategories nationwide:", error);
        });
    }
  }, [filters.category, filters.state, dispatch]);

  // CPT codes and service names
  useEffect(() => {
    if (!filters.subcategory) return;

    const apiCall = filters.state 
      ? updateDropdowns(filters.subcategory, filters.state)
      : updateDropdowns(filters.subcategory);

    apiCall
      .then((data) => {
        const cptCodes = Array.isArray(data.selected_cpt_codes)
          ? data.selected_cpt_codes
          : data.selected_cpt_codes?.selected_cpt_codes ?? [];
        
        const serviceNames = Array.isArray(data.selected_service_names)
          ? data.selected_service_names
          : data.selected_service_names?.selected_service_names ?? [];

        dispatch(setOptions({ field: "cpt", values: cptCodes }));
        dispatch(setOptions({ field: "service", values: serviceNames }));
      })
      .catch((error) => {
        console.error("Error updating CPT and Service:", error);
      });
  }, [filters.subcategory, filters.state, dispatch]);

  // Enhanced URL hydration with proper loading sequence
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const state = params.get("state");
    const category = params.get("category");
    const subcategory = params.get("subcategory");
    const cpt = params.get("cpt");
    const service = params.get("service");

    // Skip hydration if required filters aren't present or we've already hydrated
    const hasValidFilters = category && subcategory && (cpt || service);
    if (!hasValidFilters || hydratedOnceRef.current) {
      setHydrationCompleted(true);
      return;
    }

    hydratedOnceRef.current = true;
    dispatch(setIsHydratingFromURL(true));

    const hydrateFromURL = async () => {
      try {
        // 1. Load States if needed
        if (!options.state.length) {
          const states = await getStates();
          dispatch(setOptions({ field: "state", values: states }));
        }

        // 2. Load Categories
        const rawCategories = state 
          ? await getCategories(state)
          : await getCategories();
        const categories = Array.isArray(rawCategories)
          ? rawCategories
          : rawCategories.categories ?? rawCategories.service_categories ?? [];
        dispatch(setOptions({ field: "category", values: categories }));

        // 3. Subcategories
        const rawSubcategories = state
          ? await getSubCategories(category!, state)
          : await getSubCategories(category!);
        const subcategories = Array.isArray(rawSubcategories.sub_categories)
          ? rawSubcategories.sub_categories
          : rawSubcategories.sub_categories?.sub_categories ?? [];
        dispatch(setOptions({ field: "subcategory", values: subcategories }));

        // 4. CPT + Service Names
        const rawOptions = state
          ? await updateDropdowns(subcategory!, state)
          : await updateDropdowns(subcategory!);
        const cptCodes = Array.isArray(rawOptions.selected_cpt_codes)
          ? rawOptions.selected_cpt_codes
          : rawOptions.selected_cpt_codes?.selected_cpt_codes ?? [];
        const serviceNames = Array.isArray(rawOptions.selected_service_names)
          ? rawOptions.selected_service_names
          : rawOptions.selected_service_names?.selected_service_names ?? [];

        dispatch(setOptions({ field: "cpt", values: cptCodes }));
        dispatch(setOptions({ field: "service", values: serviceNames }));

        // 5. Set Redux filters
        dispatch(setFilters({
          state: state ?? "",
          category: category ?? "",
          subcategory: subcategory ?? "",
          cpt: cpt ?? "",
          service: service ?? ""
        }));

        // 6. Trigger Search
        const searchParams = new URLSearchParams();
        if (state) searchParams.set("state", state);
        searchParams.set("service_category", category!);
        searchParams.set("sub_category", subcategory!);
        if (cpt) searchParams.set("cpt_code", cpt);
        else if (service) searchParams.set("service_name", service);

        runSearch(searchParams, true); // Mark as from hydration
      } catch (error) {
        console.error("Error hydrating from URL:", error);
      } finally {
        dispatch(setIsHydratingFromURL(false));
        setHydrationCompleted(true);
      }
    };

    hydrateFromURL();
  }, [location.search, dispatch, options.state]);

  const handleSelect = (field: string, value: string) => {
    let newFilters = { ...filters, [field]: value };
  
    if (field === "state") {
      newFilters = {
        ...newFilters,
        category: "",
        subcategory: "",
        cpt: "",
        service: "",
      };
      setDisabledFields({
        cpt: false,
        service: false,
      });
    } else if (field === "category") {
      newFilters = {
        ...newFilters,
        subcategory: "",
        cpt: "",
        service: "",
      };
      setDisabledFields({
        cpt: false,
        service: false,
      });
    } else if (field === "subcategory") {
      newFilters = {
        ...newFilters,
        cpt: "",
        service: "",
      };
      setDisabledFields({
        cpt: false,
        service: false,
      });
    }
  
    dispatch(setFilters(newFilters));
    setDropdownVisible((prev) => ({ ...prev, [field]: false }));
  
    if (field === "cpt") {
      if (value) {
        setDisabledFields({ cpt: false, service: true });
        dispatch(setFilters({ ...newFilters, service: "" }));
      } else if (!newFilters.service) {
        setDisabledFields({ cpt: false, service: false });
      }
    } else if (field === "service") {
      if (value) {
        setDisabledFields({ cpt: true, service: false });
        dispatch(setFilters({ ...newFilters, cpt: "" }));
      } else if (!newFilters.cpt) {
        setDisabledFields({ cpt: false, service: false });
      }
    }
  };

  const handleSearch = () => {
    if (isHydratingFromURL || !hydrationCompleted) return;

    const validation = validateFilters(filters, options);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    
    searchTriggeredRef.current = true; // Mark that search was triggered by button
    
    const { state, category, subcategory, cpt, service } = filters;
    const queryParams: Record<string, string> = {};
    if (state) queryParams.state = state;
    queryParams.category = category;
    queryParams.subcategory = subcategory;
    if (cpt) queryParams.cpt = cpt;
    else if (service) queryParams.service = service;

    const queryString = buildQueryString(queryParams);
    navigate(`/hospitals?${queryString}`, { replace: true });

    const searchParams = new URLSearchParams();
    if (state) searchParams.set("state", state);
    searchParams.set("service_category", category);
    searchParams.set("sub_category", subcategory);
    if (cpt) searchParams.set("cpt_code", cpt);
    else if (service) searchParams.set("service_name", service);
    runSearch(searchParams);
  };

  return (
    <>
      <section
        id="SearchHospital"
        className="container py-6"
      >
        <div className="flex flex-wrap lg:flex-nowrap items-center border border-purple-400 rounded overflow-hidden bg-white text-sm">
          <div className="flex flex-wrap flex-grow">
            {[
              { key: "state", label: "State", placeholder: "Select State" },
              {
                key: "category",
                label: "Service Category",
                placeholder: "Select Service Category",
              },
              {
                key: "subcategory",
                label: "Subcategory",
                placeholder: "Select Subcategory",
              },
              {
                key: "cpt",
                label: "CPT Code",
                placeholder: "Select CPT Code",
                disabled: disabledFields.cpt,
              },
              {
                key: "service",
                label: "Service Name",
                placeholder: "Select Service Name",
                disabled: disabledFields.service,
              },
            ].map((item) => (
              <div
                key={item.key}
                className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/5 lg:border-r md:border-r p-2"
              >
                <label className="block text-xs text-black font-semibold">
                  {item.label}
                </label>
                <select
                  className={`w-full focus:outline-none text-sm ${
                    item.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={filters[item.key as keyof typeof filters]}
                  onChange={(e) => handleSelect(item.key, e.target.value)}
                  disabled={
                    isHydratingFromURL ||
                    (item.key === "subcategory"
                      ? !filters.category
                      : item.key === "cpt"
                      ? disabledFields.cpt || !filters.subcategory
                      : item.key === "service"
                      ? disabledFields.service || !filters.subcategory
                      : false)
                  }
                >
                  <option value="">{item.placeholder}</option>
                  {Array.isArray(options[item.key as keyof typeof options]) &&
                    (options[item.key as keyof typeof options] as string[]).map(
                      (opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                </select>
              </div>
            ))}
          </div>

          <button
            onClick={handleSearch}
            disabled={isHydratingFromURL || loading}
            className={`bg-purple hover:bg-purple-700 text-white px-10 lg:py-4 py-2 sm:px-10 text-sm font-semibold border lg:w-auto w-full ${
              isHydratingFromURL || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Searching..." : "SEARCH"}
          </button>
        </div>

        {searchError && (
          <div className="mt-4 text-red-500 text-sm">{searchError}</div>
        )}
      </section>
    </>
  );
};