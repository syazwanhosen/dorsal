import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import {Root as CollapsibleRoot, Trigger, Content} from "@radix-ui/react-collapsible";
import {Root as AvatarRoot, Image,Fallback } from "@radix-ui/react-avatar";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Dock,
  ScanSearch,
} from "lucide-react";

import logo from "../assets/icon.png";
import user from "../assets/abrar-rahman.jpg";
import { ToggleButton } from "@/types";

const MENU = [
  {
    label: "Setup Profile",
    icon: <FileText className="h-4 w-4" />,
    defaultPath: "/account/about",
    submenus: [],
  },
  {
    label: "Authorized Account",
    icon: <FileText className="h-4 w-4" />,
    defaultPath: "/account/authorized-account",
    submenus: [
      { name: "John Doe", path: "/authorized-account/john" },
      { name: "Jane Doe", path: "/authorized-account/jane" },
      { name: "Jack Doe", path: "/authorized-account/jack" },
    ],
  },
  {
    label: "Add Bill",
    icon: <Dock className="h-4 w-4" />,
    defaultPath: "/account/add-bill",
    submenus: [
      { name: "Upload Document", path: "/account/add-bill/upload-document" },
      { name: "Enter Manual Data", path: "/account/add-bill/manual-entry" },
    ],
  },
  {
    label: "Audit Bill",
    icon: <ScanSearch className="h-4 w-4" />,
    defaultPath: "/account/run-audit",
    submenus: [
      { name: "Audit Findings", path: "/account/audit-findings" },
      { name: "Appeal Outcomes", path: "/account/audit/detailed" },
    ],
  },
];

export const Sidebar = ({
  open,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: ToggleButton & {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setOpenSections((prev) => {
      const isCurrentlyOpen = prev[label];
      const newState: Record<string, boolean> = {};
      MENU.forEach((item) => {
        newState[item.label] = false;
      });
      if (!isCurrentlyOpen) {
        newState[label] = true;
      }
      return newState;
    });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileSidebarOpen(false);
  };

  const isCollapsed = !open;

  return (
    <>
      <aside
        className={clsx(
          "bg-white shadow-md z-40 fixed top-0 left-0 flex flex-col justify-between py-4 md:h-auto h-screen",
          "transition-[width,transform] duration-300 ease-in-out",
          {
            "w-64": !isCollapsed,
            "w-16": isCollapsed,
            "translate-x-0": mobileSidebarOpen,
            "-translate-x-full": !mobileSidebarOpen,
            "md:translate-x-0 md:relative": true,
          }
        )}
      >
        <div>
          {/* Header with Logo */}
          <div className={clsx("flex flex-col items-center space-y-2 py-4", isCollapsed ? "justify-center" : "justify-between")}>
            <img src={logo} alt="Logo" className={clsx(isCollapsed ? "w-5 h-5" : "w-16 h-16")} />
            {!isCollapsed && <h1 className="text-[#8770BC] text-lg font-semibold">dorsal.fyi</h1>}
          </div>

          {/* Menu */}
          <div className="px-1">
            {MENU.map((item, index) => {
              const isSectionActive =
                location.pathname === item.defaultPath ||
                item.submenus.some((submenu) => location.pathname === submenu.path);

              return (
                <CollapsibleRoot
                  key={index}
                  open={openSections[item.label]}
                  onOpenChange={() => toggleSection(item.label)}
                >
                  <Trigger
                    onClick={() => handleNavigate(item.defaultPath)}
                    className={clsx(
                      "flex items-center w-full rounded-md cursor-pointer mt-2",
                      isSectionActive
                        ? "bg-[#EFEAFB] border-l-4 border-[#8770BC]"
                        : "hover:bg-gray-100",
                      "transition-colors duration-500",
                      isCollapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-2"
                    )}
                  >
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        isCollapsed ? "justify-center w-full" : "text-gray-800",
                        isSectionActive && !isCollapsed ? "text-[#8770BC]" : ""
                      )}
                    >
                      {item.icon}
                      {!isCollapsed && item.label}
                    </div>

                    {!isCollapsed &&
                      (openSections[item.label] ? (
                        <ChevronUp className="h-4 w-4 text-[#8770BC]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-800" />
                      ))}
                  </Trigger>

                  {!isCollapsed && item.submenus.length > 0 && (
                    <Content className="pl-10 mt-2">
                      <ul>
                        {item.submenus.map((submenu, subIndex) => {
                          const isActive = location.pathname === submenu.path;
                          return (
                            <li key={subIndex}>
                              <Link
                                to={submenu.path}
                                onClick={() => setMobileSidebarOpen(false)}
                                className={clsx(
                                  "block text-sm cursor-pointer hover:text-[#8770BC] py-2",
                                  isActive ? "text-[#8770BC]" : "text-gray-800 hover:text-[#8770BC]"
                                )}
                              >
                                {submenu.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </Content>
                  )}
                </CollapsibleRoot>
              );
            })}
          </div>
        </div>

        {/* User Profile */}
        <div
          className={clsx(
            "bg-purple text-white flex items-center gap-3 rounded-xl mx-2",
            isCollapsed ? "justify-center py-1" : "px-4 py-3"
          )}
        >
          <AvatarRoot className="w-8 h-8 rounded-full overflow-hidden bg-white">
            <Image src={user} alt="Abrar Rahman" className="w-full h-full object-cover" />
            <Fallback delayMs={600}>Abrar Rahman</Fallback>
          </AvatarRoot>

          {!isCollapsed && (
            <div className="flex flex-col text-sm">
              <span>Abrar Rahman</span>
              <span className="text-xs opacity-80">abrar@gmail.com</span>
            </div>
          )}

          {!isCollapsed && (
            <button className="ml-auto text-white opacity-70 hover:opacity-100">
              <svg width="16" height="16" fill="currentColor">
                <circle cx="8" cy="3" r="1" />
                <circle cx="8" cy="8" r="1" />
                <circle cx="8" cy="13" r="1" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* Overlay on mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
