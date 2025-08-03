import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ServiceSearchResults {
  generic_service_name: string;
  code: string;
  service_description: string;
  hospital_count: number;
  hospital_names: string[];
  prices: number[];
  distances: number[];
  ratings?: number[];
  addresses?: string[];
  negotiation_statuses?: string[];
  location?: string; 
  min_price?: number; 
  max_price?: number;
  selectedState?: string;
  selectedServiceCategory?: string;
  selectedSubcategory?: string;
  selectedCptCode?: string;
  selectedServiceName?: string;
}

interface Filters {
  search: string;
  location?: string;
  min_price?: string;
  max_price?: string;
}

interface HospitalServiceSearchState {
  serviceSearchResults: ServiceSearchResults | null;
  loading: boolean;
  error: string | null;
  filters: Filters;
  hospitals: any[];
  selectedHospitals: any[];
  selectedLocation: [number, number] | null;
  sidebarOpen: boolean;
  sortOption: "lowestPrice" | "shortestDistance";
}

const initialState: HospitalServiceSearchState = {
  serviceSearchResults: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    location: "",
    min_price: "",
    max_price: "",
  },
  hospitals: [],
  selectedHospitals: [],
  selectedLocation: null,
  sidebarOpen: true,
  sortOption: "lowestPrice",
};


export const fetchServiceSearchResults = createAsyncThunk(
  'hospitalServiceSearch/fetchResults',
  async (filters: Filters, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const queryParams = new URLSearchParams();
      
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.min_price) queryParams.append('min_price', filters.min_price);
      if (filters.max_price) queryParams.append('max_price', filters.max_price);
      if (filters.search) queryParams.append('service_name', filters.search);

      const response = await fetch(`${baseUrl}/services/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch service search results');
      }
      
      const data = await response.json();
      return { ...data, location: filters.location, min_price: filters.min_price, max_price: filters.max_price };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const hospitalServiceSearchSlice = createSlice({
  name: "hospitalServiceSearch",
  initialState,
  reducers: {
    setServiceSearchResults(state, action: PayloadAction<ServiceSearchResults>) {
      state.serviceSearchResults = action.payload;
    },
    setServiceSearchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setHospitals(state, action: PayloadAction<any[]>) {
      state.hospitals = action.payload;
    },
    setSelectedHospitals(state, action: PayloadAction<any[]>) {
      state.selectedHospitals = action.payload;
    },
    setSelectedLocation(state, action: PayloadAction<[number, number] | null>) {
      state.selectedLocation = action.payload;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setSortOption(state, action: PayloadAction<"lowestPrice" | "shortestDistance">) {
      state.sortOption = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceSearchResults = action.payload;
      })
      .addCase(fetchServiceSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { 
  setServiceSearchResults,
  setServiceSearchLoading,
  setFilters,
  setHospitals,
  setSelectedHospitals,
  setSidebarOpen,
  setSortOption,
  setSelectedLocation,
} = hospitalServiceSearchSlice.actions;

export default hospitalServiceSearchSlice.reducer;
