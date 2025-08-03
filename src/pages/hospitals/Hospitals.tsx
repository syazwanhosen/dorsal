import { useAppSelector } from "@/store/hooks";
import { Navbar } from "../../components/Navbar";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { SearchHospital } from "../../components/hospitals/SearchHospital";
import { ProcedureCard } from "../../components/hospitals/ProcedureCard";
import { SearchSection } from "@/components/hospitals/SearchSection";
import Footer from "@/components/Footer";
import { HospitalMap } from "@/components/hospitals/HospitalMap";
import Spinner from "@/components/Spinner";

export default function Hospitals() {
  const { searchResults, isHydratingFromURL, loading } =
    useAppSelector((state) => state.hospital);

  const isLoading = isHydratingFromURL || loading;
  const hasResults = searchResults && searchResults.hospital_count > 0;

  return (
    <>
      <div className="min-h-screen flex flex-col hospital_page">
        <div className="flex-grow">
          <Navbar />
          <Header title="Search Hospitals" link="/hospitals" />
          <SearchHospital />

          {isLoading ? (
            <div className="text-center py-8"><Spinner open={true} /></div>
          ) : hasResults ? (
            <>
              <ProcedureCard
                serviceName={searchResults.generic_service_name || ""}
                serviceDescription={searchResults.service_description || ""}
                cptCode={searchResults.cpt_hcpcs_code}
                hasSearchResult={true}
                prices={searchResults.prices}
                hospitalNames={searchResults.hospital_names}
                labels={[]}
              />
              <HospitalMap />
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