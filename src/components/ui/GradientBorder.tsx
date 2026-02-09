import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientBorder({ children, className }: GradientBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-[1px]", className)}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan opacity-50" />
      <div className="relative rounded-2xl bg-brand-dark">{children}</div>
    </div>
  );
}
