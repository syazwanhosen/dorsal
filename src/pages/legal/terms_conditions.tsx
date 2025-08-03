import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "../../components/ScrollToTop";
import Footer from "@/components/Footer";

export default function TermsConditions() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8 gap-8">

        {/* Mobile Heading */}
        <div className="md:hidden mb-4">
          <h1 className="text-3xl font-bold">
            <span className="text-gray-900">Terms and</span>{" "}
            <span className="text-[#D247BF]">Conditions</span>
          </h1>
        </div>

        {/* Sidebar */}
        <aside className="md:w-1/4 sticky top-20">
          <nav className="space-y-2 text-md font-medium text-gray-700">
            
            <a href="#section1" className="block hover:text-pink-600">1. Concerning Dorsal.fyi</a>
            <a href="#section2" className="block hover:text-pink-600">2. Acceptance and Terms Modifications</a>
            <a href="#section3" className="block hover:text-pink-600">3. Services Offered</a>
            <a href="#section4" className="block hover:text-pink-600">4. Security, Privacy, and Data</a>
            <a href="#section5" className="block hover:text-pink-600">5. Account Security and Registration</a>
            <a href="#section6" className="block hover:text-pink-600">6. Billing and Payments</a>
            <a href="#section7" className="block hover:text-pink-600">7. Prohibited Use</a>
            <a href="#section8" className="block hover:text-pink-600">8. Property Rights</a>
            <a href="#section9" className="block hover:text-pink-600">9. Liability and Disclaimers</a>
            <a href="#section10" className="block hover:text-pink-600">10. Termination</a>
            <a href="#section11" className="block hover:text-pink-600">11. Governing Law and Disputes</a>
            <a href="#section12" className="block hover:text-pink-600">12. General Provisions</a>
            <a href="#section13" className="block hover:text-pink-600">13. Contact Us</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4 space-y-6 text-gray-800">
          
            {/* Desktop heading*/}
            <div className="hidden md:block">
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-gray-900">Terms and</span>{" "}
                <span className="text-[#D247BF]">Conditions</span>
              </h1>
            </div>
            <p className="mb-4"><strong>Last Updated:</strong> July 14th, 2025</p>

            <p>Your use of Dorsal Health Inc (“Dorsal”, “Dorsal.fyi”, “we,” “us,” or “our”) platform and associated services (“Services”) is governed by these Terms and Conditions (“Terms”). You accept these terms by using our services. You must not use our services if you disagree with any of the content.</p>
          

          <section id="section1">

            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">1. Concerning Dorsal.fyi</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">1.1 Company Overview</h3>
            <p className="mb-2">Dorsal.fyi, Inc. is a healthcare technology company that provides solutions to improve the fairness, accuracy, and transparency of medical billing. We leverage advanced technologies, including AI, to identify billing issues, ensure pricing transparency, and automate dispute resolution.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">1.2 Compliance and Data Protection</h3>
            <p>We comply with HIPAA and other relevant data privacy laws. Our staff is trained to handle Protected Health Information (PHI) securely and responsibly.</p>
          </section>

          <section id="section2">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">2. Acceptance and Terms Modifications</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">2.1 Acceptance of Terms</h3>
            <p className="mb-2">By using our Services, you confirm that you have read and accepted these Terms and our Privacy Policy. Discontinue use if you do not agree.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">2.2 Modifications</h3>
            <p>Dorsal.fyi may modify these Terms at any time. Significant changes will be communicated. Continued use signifies acceptance.</p>
          </section>

          <section id="section3">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">3. Services Offered</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">3.1 Scope</h3>
            <ul className="mb-2 list-disc">
                <li className="ml-12">Detection and correction of billing errors</li>
                <li className="ml-12">Automation of appeals and dispute resolution</li>
                <li className="ml-12">Insights into healthcare cost data</li>
            </ul>
            <h3 className="text-lg text-blank font-semibold mb-2">3.2 AI Integration</h3>
            <p className="mb-2">AI is used to improve billing accuracy, but all cases are reviewed by experts before resolution.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">3.3 Service Availability</h3>
            <p>We strive for continuous availability, but downtimes may occur due to maintenance or unforeseen issues.</p>
          </section>

          <section id="section4">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">4. Security, Privacy, and Data</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">4.1 You Own Your Data</h3>
            <p className="mb-2">Your data remains yours. You grant Dorsal a license to process it for service provision and improvement.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">4.2 Commitment to Privacy</h3>
            <p className="mb-2">We protect your information under HIPAA and our Privacy Policy. Ensure all submitted data is legally compliant.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">4.3 Security Procedures</h3>
            <p>We use encryption, access control, and real-time monitoring. Breaches involving PHI will be reported per regulations.</p>
          </section>

  
          <section id="section5">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">5. Account Security and Registration</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">5.1 Registration</h3>
            <p className="mb-2">Provide accurate details and keep them up to date.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">5.2 Responsibility</h3>
            <p>You are responsible for all activity under your account. Report unauthorized access immediately.</p>
          </section>

         <section id="section6">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">6. Billing and Payments</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">6.1 Terms of Payment</h3>
            <p className="mb-2">Some services require payment. Fees are non-refundable unless legally mandated.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">6.2 Billing Accuracy</h3>
            <p className="mb-2">Keep your billing details current. Services may be suspended for nonpayment.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">6.3 Authorization of Payment</h3>
            <ul className="list-disc">
                <li className="ml-12"><strong>Consent:</strong> Clicking "Pay" or similar means you agree to the charge.</li>
                <li className="ml-12"><strong>Schedule:</strong> One-time payments are processed immediately; subscriptions are recurring unless cancelled.</li>
                <li className="ml-12"><strong>Cancellation:</strong> Cancel at least 3 business days before the next payment via dashboard or email.</li>
            </ul>
          </section>

         <section id="section7">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">7. Prohibited Use</h2>
            <ul className="mb-2 list-disc">
                <li className="ml-12">Providing false data</li>
                <li className="ml-12">Unauthorized access or reverse engineering</li>
                <li className="ml-12">Spreading viruses or malware</li>
                <li className="ml-12">Disrupting the platform’s security or functionality</li>
            </ul>
            <p>Violations may result in termination or legal action.</p>
         </section>

        <section id="section8">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">8. Property Rights</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">8.1 Intellectual Property</h3>
            <p className="mb-2">Dorsal owns all rights to its software, interfaces, algorithms, and branding.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">8.2 User-Submitted Content</h3>
            <p>You retain ownership of your content but grant Dorsal rights to use it for service operations.</p>
        </section>

        <section id="section9">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">9. Liability and Disclaimers</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">9.1 Disclaimer</h3>
            <p className="mb-2">Services are provided "as-is" without warranties.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">9.2 Limitation of Liability</h3>
            <p>Dorsal is not liable for indirect damages. Liability is limited to the fees you paid in the last three months.</p>
        </section>

        <section id="section10">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">10. Termination</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">10.1 By User</h3>
            <p className="mb-2">You may cancel your account at any time using the proper channels.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">10.2 By Dorsal</h3>
            <p className="mb-2">Dorsal may suspend or terminate your account for violations without prior notice.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">10.3 Post-Termination</h3>
            <p>All licenses end, and Dorsal is not required to retain your data.</p>
        </section>

        <section id="section11">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">11. Governing Law and Disputes</h2>
            <h3 className="text-lg text-blank font-semibold mb-2">11.1 Arbitration</h3>
            <p className="mb-2">All disputes will be resolved via binding arbitration. Class actions are not allowed.</p>

            <h3 className="text-lg text-blank font-semibold mb-2">11.2 Governing Law</h3>
            <p>These terms are governed by the laws of the jurisdiction where Dorsal is headquartered.</p>
        </section>  

        <section id="section12">
        <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">12. General Provisions</h2>
        <ul className="list-disc">
            <li className="ml-12"><strong>Entire Agreement:</strong> These Terms and our Privacy Policy are the full agreement.</li>
            <li className="ml-12"><strong>Severability:</strong> If any part is invalid, the rest remains in effect.</li>
            <li className="ml-12"><strong>No Waiver:</strong> Not enforcing a provision doesn’t waive our right to do so later.</li>
            <li className="ml-12"><strong>Assignment:</strong> Dorsal may assign its rights; you may not without consent.</li>
        </ul>
        </section>

        <section id="section13">
            <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">13. Contact Us</h2>
            <p>By using our Services, you agree to these Terms. If you have questions, email us at abrar [at] dorsal [dot] fyi
        </p>
        </section>
          
        </main>
      </div>

      <Footer />
      <ScrollToTop />
    </>
  );
}
