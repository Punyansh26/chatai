"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "../components/agent-form";

export const AgentsView = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions());

    return (
        <>
            <div className="flex-1 pb-4 md:px-8 flex flex-col gap-y-6">
                <DataTable
                    data={data}
                    columns={columns}
                    onCreateNew={() => setIsCreateOpen(true)}
                />
            </div>

            <ResponsiveDialog
                title="Create New Agent"
                description="Set up a new AI agent with custom instructions and personality."
                open={isCreateOpen}
                onOpenChange={setIsCreateOpen}
            >
                <AgentForm
                    onSuccess={() => setIsCreateOpen(false)}
                    onCancel={() => setIsCreateOpen(false)}
                />
            </ResponsiveDialog>
        </>
    );
};

export const AgentsViewLoading = () => {
    return (
        <div className="p-12">
            <LoadingState
                title="Loading Agents..."
                description="Fetching your agents from the server. This may take a moment."
            />
        </div>
    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Failed to Load Agents"
            description="There was an error fetching your agents. Please try again later."
        />
    );
};
