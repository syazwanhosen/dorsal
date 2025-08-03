import { useEffect, useRef, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/buttons/button";
import { Menu, ChevronDown } from "lucide-react";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
  disabled?: boolean;
  group?: "about" | "terms" | "data";
}

const routeList: RouteProps[] = [
  { href: "/data", label: "Explore Data", group: "data" },
  { href: "/hospitals", label: "Search Hospitals", group: "data" },
  { href: "/#UploadBill", label: "Upload" },
  { href: "/coming-soon", label: "Community"},
  { href: "https://www.linkedin.com/company/dorsal-fyi/", label: "Company", group: "about" },
  { href: "/team", label: "Team", group: "about" },
  { href: "https://dorsalfyi.substack.com", label: "Blog", group: "about" },
  { href: "/privacy-policy", label: "Privacy Policy", group: "terms" },
  { href: "/terms-and-conditions", label: "Terms & Conditions", group: "terms" },
  { href: "/security", label: "Security", group: "terms" },
];

export const NavbarSecondary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataOpenMobile, setDataOpenMobile] = useState(false);
  const [aboutOpenMobile, setAboutOpenMobile] = useState(false);
  const [termsOpenMobile, setTermsOpenMobile] = useState(false);
  const [dataOpenDesktop, setDataOpenDesktop] = useState(false);
  const [aboutOpenDesktop, setAboutOpenDesktop] = useState(false);
  const [termsOpenDesktop, setTermsOpenDesktop] = useState(false);

  const dataRefMobile = useRef<HTMLDivElement>(null);
  const aboutRefMobile = useRef<HTMLDivElement>(null);
  const termsRefMobile = useRef<HTMLDivElement>(null);
  const dataRefDesktop = useRef<HTMLDivElement>(null);
  const aboutRefDesktop = useRef<HTMLDivElement>(null);
  const termsRefDesktop = useRef<HTMLDivElement>(null);

  const mainNav = routeList.filter((r) => !r.group);
  const dataLinks = routeList.filter((r) => r.group === "data");
  const aboutLinks = routeList.filter((r) => r.group === "about");
  const termsLinks = routeList.filter((r) => r.group === "terms");

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    const clickedOutsideMobile =
      dataRefMobile.current &&
      aboutRefMobile.current &&
      termsRefMobile.current &&
      !dataRefMobile.current.contains(target) &&
      !aboutRefMobile.current.contains(target) &&
      !termsRefMobile.current.contains(target);

    const clickedOutsideDesktop =
      dataRefDesktop.current &&
      aboutRefDesktop.current &&
      termsRefDesktop.current &&
      !dataRefDesktop.current.contains(target) &&
      !aboutRefDesktop.current.contains(target) &&
      !termsRefDesktop.current.contains(target);

    if (clickedOutsideMobile) {
      setDataOpenMobile(false);
      setAboutOpenMobile(false);
      setTermsOpenMobile(false);
    }

    if (clickedOutsideDesktop) {
      setDataOpenDesktop(false);
      setAboutOpenDesktop(false);
      setTermsOpenDesktop(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b" style={{ borderBottomColor: '#e5e7eb' }}>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="ml-2 font-bold text-xl flex" style={{ fontFamily: 'the-seasons, sans-serif' }}>
              <LogoIcon />
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <span className="flex md:hidden justify-end">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">dorsal.fyi</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col items-center gap-2 mt-4">
                  {/* Data dropdown */}
                  <div className="w-full flex flex-col items-center">
                    <button
                      onClick={() => {
                        setDataOpenMobile(!dataOpenMobile);
                        setAboutOpenMobile(false);
                        setTermsOpenMobile(false);
                      }}
                      className="flex items-center justify-center w-11/12 px-4 py-2 text-sm font-medium text-center rounded"
                    >
                      Data
                      <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${dataOpenMobile ? "rotate-180" : ""}`} />
                    </button>
                    {dataOpenMobile && (
                      <div className="flex flex-col items-center w-full text-sm">
                        {dataLinks.map(({ href, label }) => (
                          <a
                            key={label}
                            href={href}
                            className="block w-full text-center px-4 py-2 hover:bg-gray-100 rounded"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            onClick={() => {
                              if (!href.startsWith("http")) {
                                setIsOpen(false); // only close if it's internal
                              }
                            }}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {mainNav.map(({ href, label, disabled }) => (
                    <a
                      key={label}
                      href={disabled ? undefined : href}
                      onClick={(e) => disabled ? e.preventDefault() : setIsOpen(false)}
                      className={`${buttonVariants({ variant: "ghost" })} ${disabled ? "text-gray-400 cursor-not-allowed" : "text-center"}`}
                    >
                      {label} {disabled && "(Coming Soon)"}
                    </a>
                  ))}

                  {/* About dropdown */}
                  <div className="w-full flex flex-col items-center">
                    <button
                      onClick={() => {
                        setAboutOpenMobile(!aboutOpenMobile);
                        setDataOpenMobile(false);
                        setTermsOpenMobile(false);
                      }}
                      className="flex items-center justify-center w-11/12 px-4 py-2 text-sm font-medium text-center rounded"
                    >
                      About
                      <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${aboutOpenMobile ? "rotate-180" : ""}`} />
                    </button>
                    {aboutOpenMobile && (
                      <div className="flex flex-col items-center w-full text-sm">
                        {aboutLinks.map(({ href, label }) => (
                          <a
                            key={label}
                            href={href}
                            className="block w-full text-center px-4 py-2 hover:bg-gray-100 rounded"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            onClick={() => {
                              if (!href.startsWith("http")) {
                                setIsOpen(false); // only close if it's internal
                              }
                            }}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Terms dropdown */}
                  <div className="w-full flex flex-col items-center">
                    <button
                      onClick={() => {
                        setTermsOpenMobile(!termsOpenMobile);
                        setDataOpenMobile(false);
                        setAboutOpenMobile(false);
                      }}
                      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-center rounded"
                    >
                      Terms
                      <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${termsOpenMobile ? "rotate-180" : ""}`} />
                    </button>
                    {termsOpenMobile && (
                      <div className="w-full px-8 text-sm">
                        {termsLinks.map(({ href, label }) => (
                          <a
                            key={label}
                            href={href}
                            className="block w-full text-center px-4 py-2 hover:bg-gray-100 rounded"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            onClick={() => {
                              if (!href.startsWith("http")) {
                                setIsOpen(false);
                              }
                            }}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-full mt-4 flex flex-col gap-2 px-4">
                  <a
                    href="/login"
                    className="w-full text-sm text-center py-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="w-full text-sm text-center py-2 rounded-md bg-purple text-white hover:bg-purple-700"
                  >
                    Sign Up
                  </a>
                </div>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop */}
          <nav className="hidden md:flex justify-center gap-2 items-center relative">
            {/* Data Dropdown */}
            <div ref={dataRefDesktop} className="relative">
              <button
                onClick={() => {
                  setDataOpenDesktop(!dataOpenDesktop);
                  setAboutOpenDesktop(false);
                  setTermsOpenDesktop(false);
                }}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${dataOpenDesktop ? "text-black" : "text-gray-700"}`}
              >
                Data <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${dataOpenDesktop ? 'rotate-180' : ''}`} />
              </button>
              {dataOpenDesktop && (
                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md w-48 z-50 animate-fade-in">
                  {dataLinks.map(({ href, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {mainNav.map(({ label, href, disabled }) => (
              <a
                key={label}
                href={disabled ? undefined : href}
                onClick={disabled ? (e) => e.preventDefault() : undefined}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-700 ${disabled ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
              >
                {label}
              </a>
            ))}

            {/* About Dropdown */}
            <div ref={aboutRefDesktop} className="relative">
              <button
                onClick={() => {
                  setAboutOpenDesktop(!aboutOpenDesktop);
                  setDataOpenDesktop(false);
                  setTermsOpenDesktop(false);
                }}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${aboutOpenDesktop ? "text-black" : "text-gray-700"}`}
              >
                About <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${aboutOpenDesktop ? 'rotate-180' : ''}`} />
              </button>
              {aboutOpenDesktop && (
                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md w-44 z-50 animate-fade-in">
                  {aboutLinks.map(({ href, label }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Terms Dropdown */}
            <div ref={termsRefDesktop} className="relative">
              <button
                onClick={() => {
                  setTermsOpenDesktop(!termsOpenDesktop);
                  setDataOpenDesktop(false);
                  setAboutOpenDesktop(false);
                }}
                className={`flex items-center text-sm font-medium rounded-md hover:hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${termsOpenDesktop ? "text-black" : "text-gray-700"}`}
              >
                Terms <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${termsOpenDesktop ? 'rotate-180' : ''}`} />
              </button>
              {termsOpenDesktop && (
                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-md w-56 z-50 animate-fade-in">
                  {termsLinks.map(({ href, label }) => (
                    <li key={label}>
                      <a href={href} 
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center justify-end gap-2">
            <a href="/login" className="text-sm px-4 font-medium rounded-md py-2 text-gray-700 hover:text-black hover:bg-gray-100">
              Sign In
            </a>
            <a href="/signup" className="text-sm px-4 py-2 bg-purple text-white rounded-md hover:bg-purple-700">
              Sign Up
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};