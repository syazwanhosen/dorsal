import { Footer } from "../../components/old_landingpage/Footer";
import { Hero } from "../../components/old_landingpage/Hero";
import { Navbar } from "../../components/old_landingpage/Navbar";
import { Newsletter } from "../../components/old_landingpage/Newsletter";
import { ScrollToTop } from "../../components/old_landingpage/ScrollToTop";
import { FAQ } from "../../components/old_landingpage/FAQ";

import { Services } from "../../components/old_landingpage/Services";
import { Sponsors } from "../../components/old_landingpage/Sponsors";

function OldLandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      {/*<About />*/}
      {/*<HowItWorks />*/}
      {/*<Features />*/}
      <Services />
      {/*<Cta />*/}
      {/*<Testimonials />
      <Pricing />*/}
      <Newsletter />
      <FAQ />
      {/*<Team />*/}
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default OldLandingPage;
