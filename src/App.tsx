
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";

import { Hero } from "./components/Hero";
import { UploadBill } from "./components/UploadBill";
import { Experts } from "./components/Experts";

import { FAQ } from "./components/FAQ";
import RoadmapCTA from "./components/RoadmapCTA";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { Banner } from "./components/Banner";
import ProductFamily from "./components/ProductFamily/index";

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Banner />
      <UploadBill />
      <Experts />
      <RoadmapCTA />
      <Testimonials />
      <ProductFamily />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
