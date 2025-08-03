

import Footer from "@/components/Footer";
import { Navbar } from "../../components/Navbar";

import { ScrollToTop } from "../../components/ScrollToTop";

import "./legal.css"

export default function security() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 security-container">
        <h1 className="text-3xl font-bold text-[#D247BF] mb-2">Security</h1>
        <p className="mb-4">
          <strong>Last Updated:</strong> July 14th, 2025
        </p>

        <p className="mb-4">
          Protecting your financial and medical information is our top priority at Dorsal Health. We are dedicated to maintaining stringent guidelines for the availability, confidentiality, and integrity of data. Our extensive security measures, which guarantee privacy and compliance at every stage, are especially designed to address healthcare billing transparency and dispute resolution.
        </p>

        <h2 className="text-xl text-[#D247BF] font-bold mt-8">Our Security Procedures</h2>

        <h3 className="text-lg font-semibold mt-2 mb-1">Encryption and Data Protection</h3>
        <p className="mb-4">
          We use cutting-edge encryption techniques to safeguard your data while it’s in transit and at rest. When stored in our system or sent over networks, all private patient and billing data is securely encrypted.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-1">Strong Authentication and Access Control</h3>
        <p className="mb-4">
          Dorsal employs strict, role-based access control measures to ensure that only authorized individuals can access sensitive data. Multi-factor authentication protocols further reinforce our defenses against unauthorized access.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-1">Constant Threat Observation and Quick Reaction</h3>
        <p className="mb-4">
          Our security team actively monitors for unusual patterns or potential breaches using real-time threat detection tools and advanced analytics. If an incident occurs, our incident response team acts swiftly to contain and mitigate the threat.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-1">Regular Security Evaluations and Audits</h3>
        <p className="mb-4">
          We conduct regular risk assessments, penetration testing, vulnerability scans, and internal audits. These proactive practices help us continuously enhance our security posture and address emerging risks.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-1">Commitment to HIPAA and Compliance</h3>
        <p className="mb-4">
          Dorsal adheres to all relevant legal and regulatory requirements, including HIPAA. Our compliance framework ensures the highest standards of data protection, privacy, and patient confidentiality are upheld throughout our operations.
        </p>

        <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">Our Commitment to Security Excellence</h2>
        <p className="mb-4">
          Dorsal continuously invests in system security improvements. We proactively update users on changes to our security measures and service terms in response to evolving threats and industry best practices.
        </p>

        <p>
          If you have any questions regarding our security practices, please contact us at abrar [at] dorsal [dot] fyi
        </p>
      </div>

      <Footer />
      <ScrollToTop />
    </>
  );
}
