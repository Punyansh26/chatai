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
        "flex min-h-100 flex-col items-center justify-center gap-8 p-12 text-center",
        className
      )}
    >
      {/* Modern orbital loading animation */}
      <div className="relative size-24">
        {/* Center glow */}
        <div className="absolute inset-0 m-auto size-3 animate-pulse rounded-full bg-primary shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
        
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin">
          <div className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-linear-to-br from-primary to-violet-400 shadow-lg" />
        </div>
        <div className="absolute inset-0 animate-spin [animation-delay:0.33s]">
          <div className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-linear-to-br from-violet-400 to-purple-500 shadow-lg opacity-75" />
        </div>
        <div className="absolute inset-0 animate-spin [animation-delay:0.66s]">
          <div className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-linear-to-br from-purple-500 to-fuchsia-400 shadow-lg opacity-50" />
        </div>
        
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-primary/20" />
      </div>

      <div className="flex max-w-sm flex-col items-center gap-2.5">
        <h2 className="text-xl font-semibold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text">{title}</h2>
        <p className="text-sm text-muted-foreground text-balance leading-relaxed">{description}</p>
      </div>
    </div>
  );
};      