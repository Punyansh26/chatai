
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button"
import { on } from "events";
import { init } from "next/dist/compiled/webpack/webpack";
import { toast } from "sonner";



interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
};

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const createAgent = useMutation(
        trpc.agent.create.mutationOptions({
            onSuccess: async() => { 
                queryClient.invalidateQueries(trpc.agent.getMany.queryOptions());
                if(initialValues?.id) {
                    await queryClient.invalidateQueries(trpc.agent.getOne.queryOptions({ id: initialValues.id }));
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong while creating the agent. Please try again.");
                //Todo forbidden then upgrade plan message
            },
        }),
    );
    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name || '',
            instructions: initialValues?.instructions || '',
        },
    });
    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;
    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log('TODO:Update agent procedure and logic')   //Todo implement update agent procedure and logic
        } else {
            createAgent.mutate(values);
        }
    };
    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <GeneratedAvatar seed={form.watch("name")} className="w-24 h-24 rounded-full mx-auto" />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Agent Name" {...field} />
                            </FormControl>
                            <FormMessage /> {/* Display validation error message for name field */}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent Instructions</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Agent Instructions" {...field} />
                            </FormControl>
                            <FormMessage /> {/* Display validation error message for instructions field */}
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isPending}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} className="ml-2" type="submit">
                        {isEdit ? 'Update' : 'Create'} Agent
                    </Button>
                </div>
            </form>
        </Form>
    );
}