export type SearchResults = {
    cpt_hcpcs_code: string;
    cpt_code: string;
    hospital_count: number;
    service_description: string;
    generic_service_name: string;
    hospital_names: string[];
    prices: number[];
    selectedState?: string;           
  selectedServiceCategory?: string;  
  selectedSubcategory?: string;     
  selectedCptCode?: string;         
  selectedServiceName?: string;     
};

export type HospitalMapProps = {
    searchResults: SearchResults;
};


export type Hospital = {
    name: string;
    rating: number;
    ratingValue: number; // Ensure this exists
    phone: string; // Add phone number
    distance: string;
    price: number;
    negotiation_status: "Fixed" | "Negotiated";
    latitude: number;
    longitude: number;
    address: string;
};


export type ResizeHandlerProps = {
    sidebarOpen: boolean;
};

export type FlyToLocationProps = {
    location: [number, number] | null;
};



// types/HospitalMap.ts
export interface HospitalDetails {
    zip_code: any;
    id: string;
    name: string;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
    rating: number;
    price: number;
    negotiation_status: "Fixed" | "Negotiated";
    procedureName: string;
    procedureDescription: string;
    cptCode?: string;
    distance?: string;
  }

export type PopularSearchTabType = 'Procedures' | 'Condition' | 'Specialty';

export type TopSearchHospital = {
    name: string;
    state: string;
};

export type TopSearchServices = {
    name: string;
    hospital_count: string;
    url: string;
};

