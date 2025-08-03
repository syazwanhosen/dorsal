import axios from "axios";

export interface Statistics {
  total_states: number;
  total_hospitals: number;
  total_services: number;
  total_categories: number;
}

export interface PriceValue {
  avg?: number;
}

export type PricingValue = number | PriceValue;

export interface PricingData {
  prices: Record<string, number | { avg: number }>;
  distributed_prices?: Record<string, number>;
  error?: string;
}

// base URL of the API
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Total States , Hospitals, Services, Categories API 

export const fetchStatistics = async (): Promise<Statistics> => {
  try {
    const response = await fetch(`${baseUrl}/get_statistics`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// 📌 Fetch service name suggestions For Search service Name
export const getServiceNameSuggestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/service_search/get_service_names`);
    return response.data.service_names || [];
  } catch (error) {
    console.error("❌ Failed to fetch service names:", error);
    return [];
  }
};

// 📌 Fetch location suggestions For Search service Location
export const getLocationSuggestions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/service_search/get_locations`);
    return response.data.locations || [];
  } catch (error) {
    console.error("❌ Failed to fetch locations:", error);
    return [];
  }
};


// Statewide Healthcare Price Comparison

export const fetchCategories = async (): Promise<{ categories: string[] }> => {
  try {
    const response = await fetch(`${baseUrl}/statewise_pricing/get_categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchPricingData = async (category: string): Promise<PricingData> => {
  try {
    const response = await fetch(`${baseUrl}/statewise_pricing/get_pricing/${category}`);    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    throw error;
  }
};


// Cost Comparison for Hospitals

export async function fetchStates() {
  const response = await fetch(`${baseUrl}/common/get_states`);
  return response.json();
}

export async function fetchHospitals(state: string) {
  if (!state) return [];
  const response = await fetch(`${baseUrl}/cost_comparison/get_hospitals?state=${state}`);
    return response.json();
}

export async function fetchPriceComparison(hospital1: string, hospital2: string) {
  if (!hospital1 || !hospital2) throw new Error("Both hospitals must be selected.");
  const response = await fetch(`${baseUrl}/cost_comparison/compare_costs?hospital1=${hospital1}&hospital2=${hospital2}`);
    return response.json();
}



// *************** Hospitals Page ***************

// Get States 
export const getStates = async () => {
  const response = await fetch(`${baseUrl}/common/get_states`);
  return response.json();
};

// Get categories 
export const getCategories = async (state?: string) => {
  const url = state
    ? `${baseUrl}/hospital_finder/get_categories?state=${encodeURIComponent(state)}`
    : `${baseUrl}/hospital_finder/get_categories`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

// Get subcategories
export const getSubCategories = async (selectedCategory: string, state?: string) => {
  const url = new URL(`${baseUrl}/hospital_finder/get_sub_categories`);
  url.searchParams.append("service_category", selectedCategory);
  if (state) url.searchParams.append("state", state);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch sub-categories");
  return response.json();
};

  // Fetch CPT codes and service names when subcategory changes
export const updateDropdowns = async (selectedSubCategory: string, state?: string) => {
  const url = new URL(`${baseUrl}/hospital_finder/update_dropdowns`);
  url.searchParams.append("sub_category", selectedSubCategory);
  if (state) url.searchParams.append("state", state);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch CPT and Service data");
  return response.json();
};

// Search Hospitals 
export const searchHospitals = async (params: URLSearchParams) => {
  const response = await fetch(`${baseUrl}/hospital_finder/search?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch search results");
  return response.json(); };


 // ******************  Hospital Service Search Page  ********************  


// In api.ts
export const searchHospitalServices = async (params: {
  service_name: string;
  location?: string;
  search_range?: number;
  min_price?: number;
  max_price?: number;
}) => {
  try {
    const url = new URL(`${baseUrl}/service_search/controlled_search`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 404) {
        // Return empty results structure for 404
        return {
          hospital_count: 0,
          hospital_names: [],
          prices: [],
          distances: [],
        };
      }
      throw new Error(`Failed to fetch hospital search results: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching hospital search data:", error);
    // Return empty results structure on error
    return {
      hospital_count: 0,
      hospital_names: [],
      prices: [],
      distances: [],
    };
  }
};


// ******************  Hospital Map  ******************** 

// fetchHospitalMetadata in Hospital Map
export const fetchHospitalMetadata = async (hospitalNames: string[]) => {
  try {
    const responses = await Promise.all(
      hospitalNames.map(async (name) => {
        const encodedName = encodeURIComponent(name);
        const res = await fetch(`${baseUrl}/common/hospital_metadata/${encodedName}`);

        if (!res.ok) throw new Error(`Failed to fetch data for ${name}`);

        return res.json();
      })
    );
    return responses;
  } catch (error) {
    console.error("Error fetching hospital metadata:", error);
    throw error;
  }
};

// ******************* Hospital Details Page ********************

// Fetch Categories Based on Hospital
export const getCategoriesByHospital = async (hospitalName: string) => {
  const response = await fetch(`${baseUrl}/service_viewer/get_categories/${encodeURIComponent(hospitalName)}`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

 // Fetch Service Category
export const getSubCategoriesByHospital = async (hospitalName: string, serviceCategory: string) => {
  const response = await fetch(`${baseUrl}/service_viewer/get_sub_categories/${encodeURIComponent(hospitalName)}/${encodeURIComponent(serviceCategory)}`);
  if (!response.ok) throw new Error("Failed to fetch subcategories");
  return response.json();
};

// Fetch Service subcategory
export const getServices = async (hospitalName: string, serviceCategory: string, subcategory: string) => {
  const response = await fetch(`${baseUrl}/service_viewer/get_services/${encodeURIComponent(hospitalName)}/${encodeURIComponent(serviceCategory)}/${encodeURIComponent(subcategory)}`);
  if (!response.ok) throw new Error("Failed to fetch services");
  return response.json();
};


