import "./Data.css";
import { Navbar } from "../../components/Navbar";

import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { TotalStats } from "../../components/data_page/TotalStats";
import { StatewisePricing } from "../../components/data_page/StatewisePricing";
import { HospitalPrices } from "../../components/data_page/HospitalPrices";
import { CostCompare } from "@/components/data_page/CostCompare";
import Footer from "@/components/Footer";

export default function Data() {
  return (
    <>
      <Navbar />
      <Header title="Explore Data" />
      <TotalStats />
      <StatewisePricing />
      <HospitalPrices />
      <CostCompare />
      <Footer />
      <ScrollToTop />
    </>
  );
}
