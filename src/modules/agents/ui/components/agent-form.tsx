"use client";

import { useTRPC } from "@/trpc/client";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { AgentGetOne } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { agentInsertSchema } from "../../schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BotIcon, WandIcon, SparklesIcon, Loader2Icon } from "lucide-react";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const createAgent = useMutation(
        trpc.agent.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agent.getMany.queryOptions());
                if (initialValues?.id) {
                    await queryClient.invalidateQueries(trpc.agent.getOne.queryOptions({ id: initialValues.id }));
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong while creating the agent. Please try again.");
            },
        }),
    );

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name || "",
            instructions: initialValues?.instructions || "",
        },
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log("TODO:Update agent procedure and logic");
        } else {
            createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex justify-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        <GeneratedAvatar
                            seed={form.watch("name")}
                            className="relative size-20 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                                <BotIcon className="size-3.5 text-primary" />
                                Agent Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Research Assistant"
                                    className="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 input-glow"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium flex items-center gap-2">
                                <WandIcon className="size-3.5 text-primary" />
                                Instructions
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe how this agent should behave, what it specializes in, and its personality..."
                                    rows={4}
                                    className="resize-none bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 input-glow"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-xs text-muted-foreground/70">
                                Be specific about the agent&apos;s role and expertise
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={onCancel}
                            className="border-border/50 hover:bg-muted/50"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="group relative overflow-hidden bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="relative flex items-center gap-2">
                            {isPending ? (
                                <Loader2Icon className="size-4 animate-spin" />
                            ) : (
                                <SparklesIcon className="size-4" />
                            )}
                            {isPending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Agent" : "Create Agent")}
                        </span>
                    </Button>
                </div>
            </form>
        </Form>
    );
};