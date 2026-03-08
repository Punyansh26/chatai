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
        "flex min-h-100 flex-col items-center justify-center gap-8 p-12 text-center",
        className
      )}
    >
      {/* Modern error icon with animated rings */}
      <div className="relative size-24">
        {/* Pulsing outer ring */}
        <div className="absolute inset-0 animate-pulse rounded-full bg-destructive/10" />
        
        {/* Animated warning rings */}
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-destructive/30 opacity-75 [animation-duration:2s]" />
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-destructive/20 [animation-delay:0.5s] [animation-duration:2s]" />
        
        {/* Center icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-full border-2 border-destructive/40 bg-destructive/10 shadow-lg shadow-destructive/20">
            <AlertTriangleIcon className="size-8 text-destructive animate-pulse" strokeWidth={2.5} />
          </div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute -left-1 -top-1 size-2 rounded-full bg-destructive/60 animate-pulse [animation-delay:0.2s]" />
        <div className="absolute -right-1 -bottom-1 size-2 rounded-full bg-destructive/60 animate-pulse [animation-delay:0.4s]" />
      </div>

      <div className="flex max-w-md flex-col items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-destructive">{title}</h2>
        <p className="text-sm text-muted-foreground text-balance leading-relaxed">{description}</p>
        
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="mt-2 gap-2"
          >
            <RefreshCwIcon className="size-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};