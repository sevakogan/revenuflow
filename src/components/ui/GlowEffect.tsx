import { cn } from "@/lib/utils";

interface GlowEffectProps {
  color?: "blue" | "purple" | "cyan";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  blue: "from-brand-blue/20",
  purple: "from-brand-purple/20",
  cyan: "from-brand-cyan/20",
};

const sizeMap = {
  sm: "w-[300px] h-[300px]",
  md: "w-[500px] h-[500px]",
  lg: "w-[800px] h-[800px]",
};

export default function GlowEffect({
  color = "blue",
  size = "md",
  className,
}: GlowEffectProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full bg-gradient-radial to-transparent blur-3xl pointer-events-none",
        colorMap[color],
        sizeMap[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
