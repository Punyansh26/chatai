"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";



export const AgentsView = () => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions());


    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
};

export const AgentsViewLoading = () => {
    return (
        <div className="p-12">
            <LoadingState
                title="Loading Agents..."
                description="Fetching your agents from the server. This may take a moment."
            />
        </div>
    )
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Failed to Load Agents"
            description="There was an error fetching your agents. Please try again later."
        />
    )
};