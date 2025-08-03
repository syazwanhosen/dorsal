import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="flex flex-col flex-1 relative">
        <main className="relative flex-1 p-4 pt-0 pl-6 md:pl-4 mt-4">
            <Topbar
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              mobileOpen={mobileSidebarOpen}
              setMobileOpen={setMobileSidebarOpen}
            />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
