import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { UploadBill } from "@/components/UploadBill";
import { Newsletter } from "@/components/Newsletter";
import "./UploadBill.css";

const UploadBill_page = () => {
  return (
    <div className="justify-center h-screen bg-white">
      <Navbar />
      <UploadBill />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default UploadBill_page;
