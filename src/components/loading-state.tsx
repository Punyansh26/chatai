import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  className?: string;
}

export const LoadingState = ({ title, description, className }: Props) => {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-8 p-8 text-center",
        className
      )}
    >
      {/* Modern orbital loading animation */}
      <div className="relative size-28">
        {/* Soft gradient background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-2xl" />

        {/* Outer rotating ring */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border-2 border-transparent border-t-primary/40 border-r-primary/20" />

        {/* Inner rotating ring (reverse) */}
        <div className="absolute inset-3 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-primary/30 border-l-primary/15" />

        {/* Center pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10 backdrop-blur-sm">
            {/* Animated pulse rings */}
            <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/10 [animation-duration:2s]" />

            {/* Core dot */}
            <div className="relative size-3 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/50">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/50 blur-sm" />
            </div>

            {/* Glass shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-transparent" />
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div className="absolute left-1/2 top-1 size-2 -translate-x-1/2 rounded-full bg-primary/60 shadow-sm shadow-primary/30" />
        </div>
        <div className="absolute inset-2 animate-[spin_3s_linear_infinite_reverse]">
          <div className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
        </div>
        <div className="absolute inset-4 animate-[spin_5s_linear_infinite]">
          <div className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary/50" />
        </div>
      </div>

      <div className="flex max-w-sm flex-col items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-balance">{description}</p>

        {/* Loading dots */}
        <div className="flex items-center gap-1.5 pt-2">
          <div className="size-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:0ms]" />
          <div className="size-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms]" />
          <div className="size-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};
