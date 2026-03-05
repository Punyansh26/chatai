"use client"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DashboardUserButton } from "./dashboard-user-button"

const firstSection = [
    { icon: VideoIcon, label: "Meetings", href: "/meetings" },
    { icon: BotIcon, label: "Agents", href: "/agents" },
]

const secondSection = [
    { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
]

export const DashboardSidebar = () => {
    const pathname = usePathname()

    return (
        <Sidebar
            style={{ "--sidebar": "transparent" } as React.CSSProperties}
            className="border-r border-purple-500/20"
        >
            {/* Purple gradient background */}
            <div
                className="relative flex h-full flex-col overflow-hidden"
                style={{ background: "linear-gradient(180deg, #0a0015 0%, #12002a 55%, #0d001f 100%)" }}
            >
                {/* Ambient orbs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20"
                        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
                    />
                    <div
                        className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-15"
                        style={{ background: "radial-gradient(circle, #9333ea, transparent 70%)" }}
                    />
                </div>

                {/* Subtle dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(rgba(168,85,247,0.9) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Header */}
                <SidebarHeader className="relative z-10 px-4 py-5">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl p-1 transition-opacity duration-200 hover:opacity-80"
                    >
                        <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl"
                            style={{
                                boxShadow: "0 0 20px rgba(124,58,237,0.55), 0 0 0 1px rgba(168,85,247,0.2)",
                            }}
                        >
                            <Image
                                src="/images/logoipsum-338.svg"
                                alt="Chat AI"
                                width={36}
                                height={36}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span
                            className="text-base font-bold tracking-tight"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 30%, #c4b5fd)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Chat AI
                        </span>
                    </Link>
                </SidebarHeader>

                {/* Divider */}
                <div className="relative z-10 mx-4 h-px bg-purple-500/20" />

                {/* Main content */}
                <SidebarContent className="relative z-10">
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-widest text-white">
                            Navigation
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {firstSection.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className={cn(
                                                    "mx-1 w-[calc(100%-8px)] rounded-xl px-3 text-sm font-medium transition-all duration-200",
                                                    isActive
                                                        ? "border border-purple-500/30 bg-purple-600/30 text-purple-100 shadow-[0_0_14px_rgba(124,58,237,0.28)]"
                                                        : "border border-transparent text-purple-200/60 hover:border-purple-700/30 hover:bg-purple-800/20 hover:text-purple-100"
                                                )}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="h-4 w-4 shrink-0" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Upgrade — pinned to bottom */}
                    <SidebarGroup className="">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {secondSection.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            className="mx-1 w-[calc(100%-8px)] rounded-xl border border-purple-500/25 bg-purple-600/15 px-3 text-sm font-semibold text-purple-300/80 shadow-[0_2px_14px_rgba(109,40,217,0.2)] transition-all duration-200 hover:scale-[1.02] hover:border-purple-500/40 hover:bg-purple-600/25 hover:text-purple-100"
                                        >
                                            <Link href={item.href}>
                                                <item.icon className="h-4 w-4 shrink-0" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/* Footer */}
                <SidebarFooter className="relative z-10 gap-2 border-t border-purple-500/20 px-3 py-3">
                    <DashboardUserButton />
                    <p className="text-center text-xs text-purple-300/40">
                        &copy; 2025 Chat AI. All rights reserved.
                    </p>
                </SidebarFooter>
            </div>
        </Sidebar>
    )
}
