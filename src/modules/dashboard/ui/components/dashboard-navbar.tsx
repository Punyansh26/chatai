"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const isCollapsed = state === "collapsed" || isMobile;
    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

            <nav className="sticky top-0 z-10 flex items-center gap-3 border-b border-purple-500/20 px-4 py-2.5 backdrop-blur-md"
                style={{ background: "linear-gradient(180deg, rgba(12,0,30,0.85) 0%, rgba(10,0,21,0.75) 100%)" }}
            >
                {/* Sidebar toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 border border-purple-500/20 bg-purple-900/20 text-purple-300 hover:border-purple-400/40 hover:bg-purple-800/30 hover:text-purple-100"
                    onClick={toggleSidebar}
                >
                    {isCollapsed
                        ? <PanelLeftIcon className="h-4 w-4" />
                        : <PanelLeftCloseIcon className="h-4 w-4" />
                    }
                    <span className="sr-only">Toggle sidebar</span>
                </Button>

                {/* Search bar */}
                <button
                    onClick={() => setCommandOpen(!commandOpen)}
                    className="flex h-8 w-full max-w-sm items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-900/20 px-3 text-sm text-purple-300/60 backdrop-blur-sm transition-all duration-200 hover:border-purple-400/40 hover:bg-purple-800/30 hover:text-purple-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
                >
                    <SearchIcon className="h-3.5 w-3.5 shrink-0 opacity-60" />
                    <span>Search...</span>

                </button>
            </nav>
        </>
    );
}


