import "./Data.css";
import { Navbar } from "./components/Navbar";

import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { TotalStats } from "./components/dashboard/TotalStats";
import { StatewisePricing } from "./components/dashboard/StatewisePricing";
import { HospitalPrices } from "./components/dashboard/HospitalPrices";
import Footer from "./components/Footer";

export default function Data() {
  return (
    <>
      <Navbar />
      <Header title="Data" />
      <TotalStats />
      <StatewisePricing />
      <HospitalPrices />
      <Footer />
      <ScrollToTop />
    </>
  );
}
