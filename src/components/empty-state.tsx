import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-8 p-8 text-center",
        className
      )}
    >
      {/* Modern empty state illustration */}
      <div className="relative size-36">
        {/* Soft gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-2xl" />

        {/* Animated dashed rings */}
        <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-muted-foreground/15" />
        <div className="absolute inset-3 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-dashed border-muted-foreground/10" />

        {/* Center logo container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-muted to-muted/50 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/logoipsum-338.svg"
              alt="Logo"
              width={48}
              height={48}
              className="opacity-70"
            />
            {/* Glass shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
        </div>

        {/* Decorative dots */}
        <div className="absolute left-1 top-10 size-2 animate-pulse rounded-full bg-primary/20 [animation-delay:0.2s]" />
        <div className="absolute right-3 top-5 size-1.5 animate-pulse rounded-full bg-primary/30 [animation-delay:0.5s]" />
        <div className="absolute bottom-8 right-1 size-1.5 animate-pulse rounded-full bg-primary/20 [animation-delay:0.8s]" />
        <div className="absolute bottom-4 left-4 size-1 animate-pulse rounded-full bg-primary/25 [animation-delay:1s]" />
      </div>

      <div className="flex max-w-sm flex-col items-center gap-3">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-balance">{description}</p>

        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            size="lg"
            className="mt-4 gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
          >
            <PlusIcon className="size-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
