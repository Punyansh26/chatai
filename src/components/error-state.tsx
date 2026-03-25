import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  title: string;
  description: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({ title, description, onRetry, className }: Props) => {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-8 p-8 text-center",
        className
      )}
    >
      {/* Modern error icon with animated rings */}
      <div className="relative size-28">
        {/* Gradient glow effect */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-destructive/20 via-destructive/10 to-transparent blur-xl" />

        {/* Animated warning rings */}
        <div className="absolute inset-2 animate-ping rounded-full border border-destructive/20 [animation-duration:3s]" />
        <div className="absolute inset-4 animate-ping rounded-full border border-destructive/15 [animation-delay:0.5s] [animation-duration:3s]" />

        {/* Center icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-destructive/30 bg-gradient-to-br from-destructive/15 to-destructive/5 shadow-xl shadow-destructive/10 backdrop-blur-sm">
            <AlertTriangleIcon className="size-7 text-destructive drop-shadow-sm" strokeWidth={2} />
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute left-2 top-2 size-1.5 animate-bounce rounded-full bg-destructive/50 [animation-delay:0.1s] [animation-duration:2s]" />
        <div className="absolute bottom-4 right-2 size-1 animate-bounce rounded-full bg-destructive/40 [animation-delay:0.3s] [animation-duration:2.5s]" />
        <div className="absolute bottom-2 left-6 size-1 animate-bounce rounded-full bg-destructive/30 [animation-delay:0.6s] [animation-duration:2s]" />
      </div>

      <div className="flex max-w-md flex-col items-center gap-3">
        <h2 className="bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-balance">{description}</p>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="lg"
            className="mt-4 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <RefreshCwIcon className="size-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
