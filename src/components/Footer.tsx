import { Link } from "react-router-dom";
import logo from "@/assets/Footer-logo.png";

const Footer = () => {
  return (
    <section className="bg-white">
    <footer className="container footer bg-gradient-to-r from-[#864196] to-[#F33594] text-white lg:pt-14 lg:pb-8 pt-8 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="ml-2">
          <div className="flex items-center mb-2">
            <Link to="/">
              <img
                src={logo}
                alt="Dorsal Logo"
                className="lucide lucide-panels-top-left mr-2 w-50 h-10"
                loading="lazy"
              />
            </Link>
          </div>
          <p className="text-sm text-white lg:pr-24">
            Crowdsourcing medical bill transparency for everyone.
          </p>
          <details className="text-xs opacity-60 hover:opacity-100 w-64 mt-2">
            <summary className="cursor-pointer underline">
              Cookies Policy
            </summary>
            <div className="mt-1">
              When you visit or log in to our website, cookies and similar
              technologies may be used by our online data partners or vendors to
              associate these activities with other personal information they or
              others have about you, including by association with your email.
              We (or service providers on our behalf) may then send
              communications and marketing to these emails. You may opt out by
              visiting{" "}
              <a
                href="https://app.retention.com/optout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
              >
                this link
              </a>
              .
            </div>
          </details>
        </div>

        {/* Product */}
        <div className="ml-2">
          <h3 className="text-base text-white font-bold mb-3">Product</h3>
          <ul className="[&>li]:mb-[0.6rem] text-sm text-white">
            <li>
              <Link to="/hospitals">Search Bills</Link>
            </li>
            <li>
              <a href="/upload-bill">Upload Bills</a>
            </li>
            <li>
              <a href="/coming-soon">Negotiate </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="ml-2">
          <h3 className="text-base text-white font-bold mb-3">Company</h3>
          <ul className="[&>li]:mb-[0.6rem] text-sm text-white">
            <li>
              <a
                href="https://www.linkedin.com/company/dorsal-fyi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/security">Security</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="ml-2">
          <h3 className="text-base text-white font-bold mb-3">Support</h3>
          <ul className="[&>li]:mb-[0.6rem] text-sm text-white">
            <li>
              <a
                href="https://substack.com/@dorsalfyi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resources
              </a>
            </li>
            <li>
              <a href="https://cal.com/abrar/15min"  target="_blank">Demo</a>
            </li>
            <li>
            <a
              href="https://forms.gle/mEAD77cJjNadMtDQA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Waitlist
            </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="border-t border-white/70" />
      </div>

      {/* Copyright */}
      <div className="lg:mt-7 lg:mb-2 mt-4 text-center text-sm text-white">
        © 2025 Dorsal Health. Made with ❤️‍🩹 in CA. All rights reserved.
      </div>
    </footer>
    </section>
  );
};

export default Footer;
