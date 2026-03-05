"use client";
import { authClient } from "@/lib/auth-client";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { GeneratedAvatar } from "@/components/generated-avatar";


export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending || !data?.user) {
        return (
            <div className="flex items-center gap-2 px-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-purple-700/30" />
                <div className="hidden h-3 w-20 animate-pulse rounded bg-purple-700/20 sm:block" />
            </div>
        );
    }

    const firstName = data.user.name?.split(" ")[0] ?? "there";

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/sign-in");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group flex w-full items-center justify-between rounded-xl border border-purple-500/20 bg-purple-900/20 px-3 py-2 backdrop-blur-sm transition-all duration-200 hover:border-purple-400/40 hover:bg-purple-800/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50">
                    {/* Greeting + email stacked on the left */}
                    <div className="flex min-w-0 flex-col text-left">
                        <span
                            className="text-sm font-semibold leading-tight"
                            style={{
                                background: "linear-gradient(135deg, #e9d5ff, #c4b5fd)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Hi, {firstName}!
                        </span>
                        <span className="truncate text-[11px] text-purple-300/50">{data.user.email}</span>
                    </div>

                    {/* Avatar pinned to the right */}
                    <GeneratedAvatar
                        seed={data.user.email ?? "user"}
                        variant="initials"
                        className="ml-3 h-8 w-8 shrink-0 ring-2 ring-purple-500/30 transition-all duration-200 group-hover:ring-purple-400/60"
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-56 border border-purple-500/20 bg-[#0e001f]/95 p-1 text-purple-100 backdrop-blur-xl"
                style={{ boxShadow: "0 16px 40px rgba(109,40,217,0.35), 0 0 0 1px rgba(168,85,247,0.08)" }}
            >
                {/* User info header */}
                <DropdownMenuLabel className="flex items-center gap-3 px-2 py-2">
                    <GeneratedAvatar
                        seed={data.user.email ?? "user"}
                        variant="initials"
                        className="h-9 w-9 ring-2 ring-purple-500/30"
                    />
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-semibold text-purple-50">{data.user.name}</span>
                        <span className="truncate text-[11px] text-purple-300/60">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1 bg-purple-500/15" />

                <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-purple-200/80 transition-colors focus:bg-purple-700/25 focus:text-purple-100">
                    <UserIcon className="h-4 w-4 text-purple-400/70" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-purple-200/80 transition-colors focus:bg-purple-700/25 focus:text-purple-100">
                    <SettingsIcon className="h-4 w-4 text-purple-400/70" />
                    Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-purple-500/15" />

                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400/80 transition-colors focus:bg-red-500/10 focus:text-red-300"
                >
                    <LogOutIcon className="h-4 w-4" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
