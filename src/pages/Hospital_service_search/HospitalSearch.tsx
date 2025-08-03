import { ServiceSearchProcedureCard } from "@/components/hospitals_service_search/ServiceSearchProcedureCard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { HospitalServiceSearch } from "@/components/hospitals_service_search/HospitalServiceSearch";
import { SearchSection } from "@/components/hospitals/SearchSection";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Header } from "@/components/Header";
import { HospitalServiceSearchMap } from "@/components/hospitals_service_search/HospitalServiceSearchMap";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { setFilters } from "@/features/hospitalServiceSearchSlice";
import { useLocation } from "react-router-dom";
import Spinner from "@/components/Spinner";

export default function Hospitals() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { serviceSearchResults, loading } = useAppSelector(
    (state) => state.hospitalServiceSearch
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const locationParam = params.get("location");
    const min_price = params.get("min_price");
    const max_price = params.get("max_price");

    if (search) {
      dispatch(setFilters({
        search: search || "",
        location: locationParam || "",
        min_price: min_price || "",
        max_price: max_price || "",
      }));
    }
  }, [location.search, dispatch]);

  return (
    <>
      <div className="min-h-screen flex flex-col hospital_page">
        <div className="flex-grow">
          <Navbar />
          <Header title="Hospitals Service Search" link="/hospital_search" />
          <HospitalServiceSearch />
          {loading ? (
             <div className="text-center py-8"><Spinner open={true} /></div>
          ) : serviceSearchResults ? (
            <>
              <ServiceSearchProcedureCard
                serviceName={serviceSearchResults.generic_service_name || ""}
                serviceDescription={
                  serviceSearchResults.service_description || ""
                }
                cptCode={serviceSearchResults.code}
                hasSearchResult={serviceSearchResults.hospital_count > 0}
                prices={serviceSearchResults.prices}
                hospitalNames={serviceSearchResults.hospital_names}
              />
              <HospitalServiceSearchMap />
            </>
          ) : (
            <SearchSection />
          )}
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}