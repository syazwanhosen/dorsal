import clsx from "clsx";
import { Menu } from "lucide-react";

import { ToggleButton } from "@/types";

export const Topbar = ({ open, setOpen, mobileOpen, setMobileOpen }: ToggleButton & {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}) => {
    return (
        <header className={clsx("h-16 z-50 block items-center absolute")}>
            {/* Mobile toggle */}
            <div className="md:hidden fixed">
                <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Mobile Sidebar">
                    <Menu className="h-6 w-6 text-gray-800" />
                </button>
            </div>

            {/* Desktop toggle */}
            <div className="hidden md:block">
                <button onClick={() => setOpen && setOpen(!open)} aria-label="Toggle Sidebar">
                    <Menu className="h-6 w-6 text-gray-800" />
                </button>
            </div>
        </header>
    );
};
