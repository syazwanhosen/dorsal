

import Footer from "@/components/Footer";
import { Navbar } from "../../components/Navbar";

import { ScrollToTop } from "../../components/ScrollToTop";
import "./legal.css"

export default function privacy_policy() {
  return (
    <>
    <Navbar />
    <div className="container privacy-policy-container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-900">Privacy</span>{" "}
        <span className="text-[#D247BF]">Policy</span>
      </h1>
      <p className="mb-4">
        <strong>Last Updated:</strong> July 14th, 2025
      </p>

      <p className="mb-4">
        Dorsal,fyi, Inc. (“Dorsal,” “Dorsal.fyi”, “we,” “us,” or “our”) is committed to protecting your privacy and the confidentiality of your personal and health-related information. This Privacy Policy describes how we collect, use, disclose, store, and protect the information you provide when you access or use our websites, the Dorsal platform, or any of our services—including but not limited to our medical bill analysis, error detection, and negotiation offerings (collectively, the “Services”).
      </p>
      <p className="mb-4">
        By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described.
      </p>

      <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">1. Scope and Applicability</h2>
      <p className="mb-4">
        This Policy applies to all users of the Services, including patients, providers, and plan sponsors, and governs all data collected through your use of the Services, including Protected Health Information (PHI), personally identifiable information (PII), and any other data that may be associated with your account or healthcare transactions.
      </p>
      <p className="mb-4">
        Dorsal provides medical billing support and appeals services that may involve access to health-related information voluntarily submitted by users or shared through authorized integrations with healthcare entities. This includes information that qualifies as PHI under HIPAA. We are not a covered entity, but we may operate as a Business Associate and comply accordingly.
      </p>
      <p className="mb-4">
        We do not collect or retain full clinical records or diagnostic histories unless expressly requested. All sensitive information is encrypted in transit and at rest, with access limited to authorized personnel.
      </p>

      <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">2. Information We Receive</h2>
      <p className="mb-4">We collect the following types of information to deliver and improve our Services:</p>
      <ul className="list-disc list-inside mb-6">
        <li><strong>Account Information</strong> – Name, email, contact details, and login credentials.</li>
        <li><strong>Billing Information</strong> – Itemized medical bills, charges, and claim details.</li>
        <li><strong>Payment Information</strong> – Cardholder name, billing address, and secure payment data.</li>
        <li><strong>User Communications</strong> – Messages, emails, feedback, and support tickets.</li>
        <li><strong>Technical and Usage Data</strong> – Device metadata, IP, access logs, and diagnostics.</li>
      </ul>

      <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">3. How We Use Your Information</h2>
      <p className="mb-4">We use your information to:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Analyze and explain medical bill charges</li>
        <li>Communicate with you about your account and services</li>
        <li>Process payments securely</li>
        <li>Troubleshoot and improve platform performance</li>
        <li>Fulfill legal or HIPAA obligations where applicable</li>
      </ul>
      <p className="mb-4">
        We do not sell your information. We may share de-identified, aggregate insights for internal or academic purposes.
      </p>

      <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">4. Your Responsibility</h2>
      <p className="mb-4">To help protect your privacy and compliance:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Only submit documents relevant to billing or appeals</li>
        <li>Avoid uploading unrelated clinical records</li>
      </ul>

      <h2 className="text-xl text-[#D247BF] font-bold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4">You have the right to:</p>
      <ul className="list-disc list-inside mb-6">
        <li><strong>Access</strong>: Request a copy of your data</li>
        <li><strong>Deletion</strong>: Request deletion, subject to legal or contractual obligations</li>
        <li><strong>Communication Preferences</strong>: Opt out of promotional emails</li>
      </ul>
      <p className="mb-4">
        If you have any questions or concerns, please reach us at abrar [at] dorsal [dot] fyi
      </p>
    </div>

    <Footer />
    <ScrollToTop />
    </>
  );
}
