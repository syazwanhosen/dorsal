

// Components
import { Navbar } from "../../components/Navbar";

import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import Footer from "@/components/Footer";
import { SearchDetailsCard } from "@/components/hospital_service_search_details/search_details_card";
import { ServiceSearchCard } from "@/components/hospital_service_search_details/service_search_card";



export default function Data() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar />
        <Header title="Hospital Details" />
        <SearchDetailsCard />
        <ServiceSearchCard />
      </div>
     <Footer />
      <ScrollToTop />
    </div>
  );
}
