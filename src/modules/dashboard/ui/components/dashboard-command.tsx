"use client";
import { Dispatch } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { BotIcon, VideoIcon } from "lucide-react";

interface Props {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandDialog
            open={open}
            onOpenChange={setOpen}
            title="Search"
            description="Search for meetings and agents"
            className="border border-purple-500/25 bg-[#0e001f]/95 backdrop-blur-xl [box-shadow:0_24px_60px_rgba(109,40,217,0.4),0_0_0_1px_rgba(168,85,247,0.1)]"
        >
            <CommandInput
                placeholder="Search meetings, agents..."
                className="border-b border-purple-500/20 text-purple-100 placeholder:text-purple-400/40"
            />
            <CommandList className="max-h-80 py-2">
                <CommandEmpty className="py-8 text-center text-sm text-purple-300/50">
                    No results found.
                </CommandEmpty>

                <CommandGroup
                    heading="Meetings"
                    className="**:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-purple-400/50"
                >
                    <CommandItem
                        onSelect={() => setOpen(false)}
                        className="mx-1 cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm text-purple-200/80 aria-selected:bg-purple-700/25 aria-selected:text-purple-100"
                    >
                        <VideoIcon className="h-4 w-4 shrink-0 text-purple-400/60" />
                        Meeting 1
                    </CommandItem>
                    <CommandItem
                        onSelect={() => setOpen(false)}
                        className="mx-1 cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm text-purple-200/80 aria-selected:bg-purple-700/25 aria-selected:text-purple-100"
                    >
                        <VideoIcon className="h-4 w-4 shrink-0 text-purple-400/60" />
                        Meeting 2
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator className="my-1 bg-purple-500/15" />

                <CommandGroup
                    heading="Agents"
                    className="**:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-purple-400/50"
                >
                    <CommandItem
                        onSelect={() => setOpen(false)}
                        className="mx-1 cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm text-purple-200/80 aria-selected:bg-purple-700/25 aria-selected:text-purple-100"
                    >
                        <BotIcon className="h-4 w-4 shrink-0 text-purple-400/60" />
                        Agent A
                    </CommandItem>
                    <CommandItem
                        onSelect={() => setOpen(false)}
                        className="mx-1 cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm text-purple-200/80 aria-selected:bg-purple-700/25 aria-selected:text-purple-100"
                    >
                        <BotIcon className="h-4 w-4 shrink-0 text-purple-400/60" />
                        Agent B
                    </CommandItem>
                </CommandGroup>
            </CommandList>

            {/* Footer hint */}
            <div className="flex items-center gap-3 border-t border-purple-500/15 px-4 py-2.5">
                <span className="text-[11px] text-purple-400/40">
                    <kbd className="rounded border border-purple-500/20 bg-purple-900/30 px-1.5 py-0.5 text-[10px]">↑↓</kbd>
                    {" "}navigate
                </span>
                <span className="text-[11px] text-purple-400/40">
                    <kbd className="rounded border border-purple-500/20 bg-purple-900/30 px-1.5 py-0.5 text-[10px]">↵</kbd>
                    {" "}select
                </span>
                <span className="text-[11px] text-purple-400/40">
                    <kbd className="rounded border border-purple-500/20 bg-purple-900/30 px-1.5 py-0.5 text-[10px]">esc</kbd>
                    {" "}close
                </span>
            </div>
        </CommandDialog>
    );
};
