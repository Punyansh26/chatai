"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, BotIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";

export const AgentsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="relative py-6 px-4 md:px-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                                <BotIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                                    My Agents
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Create and manage your AI assistants
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            className="group relative overflow-hidden bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="relative flex items-center gap-2">
                                <PlusIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                                <span className="hidden sm:inline">New Agent</span>
                                <span className="sm:hidden">New</span>
                            </span>
                        </Button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
        </>
    );
};