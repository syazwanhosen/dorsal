import Footer from "@/components/Footer";
import { Navbar } from "../../components/Navbar";
import { ScrollToTop } from "../../components/ScrollToTop";

export default function Team() {
  return (
    <>
    <Navbar />
    <div className="w-full h-[800px]">
      <iframe
        src="https://diligent-ox-b9e.notion.site/ebd/22b158a37a34809b9532f9790c96bcd4"
        width="100%"
        height="100%"
        allowFullScreen
        className="w-full h-full border-0"
        title="Team Page"
      ></iframe>
    </div>
    <Footer />
    <ScrollToTop />
     </>
  );
};
