import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium",
        "bg-brand-blue/10 text-brand-blue border border-brand-blue/20",
        className
      )}
    >
      {children}
    </span>
  );
}
