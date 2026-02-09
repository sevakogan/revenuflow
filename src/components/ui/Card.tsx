import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export default function Card({
  className,
  hover = false,
  glow = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15]",
        glow && "hover:shadow-glow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
