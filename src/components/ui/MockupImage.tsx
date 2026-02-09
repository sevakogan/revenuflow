import { cn } from "@/lib/utils";

interface MockupImageProps {
  className?: string;
}

export default function MockupImage({ className }: MockupImageProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Window frame */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <div className="flex-1 text-center text-xs text-slate-500">RevenueFlow Dashboard</div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 md:p-6 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.04] rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Revenue</div>
              <div className="text-lg font-bold text-brand-emerald">$48,290</div>
              <div className="text-xs text-brand-emerald">+23.5%</div>
            </div>
            <div className="bg-white/[0.04] rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Occupancy</div>
              <div className="text-lg font-bold text-brand-blue">89%</div>
              <div className="text-xs text-brand-blue">+12.3%</div>
            </div>
            <div className="bg-white/[0.04] rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">ADR</div>
              <div className="text-lg font-bold text-brand-purple">$312</div>
              <div className="text-xs text-brand-purple">+8.7%</div>
            </div>
          </div>

          {/* Chart area */}
          <div className="bg-white/[0.04] rounded-lg p-4">
            <div className="text-xs text-slate-500 mb-3">Revenue Trend</div>
            <div className="flex items-end gap-1.5 h-24">
              {[35, 45, 40, 55, 50, 65, 60, 75, 70, 85, 80, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, rgba(59,130,246,0.3), rgba(139,92,246,0.6))`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Pricing panel */}
          <div className="bg-white/[0.04] rounded-lg p-4">
            <div className="text-xs text-slate-500 mb-3">Dynamic Pricing</div>
            <div className="space-y-2">
              {[
                { name: "Oceanview Villa", price: "$389", occ: "94%" },
                { name: "Downtown Loft", price: "$245", occ: "87%" },
                { name: "Mountain Cabin", price: "$198", occ: "91%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{item.name}</span>
                  <div className="flex gap-3">
                    <span className="text-brand-emerald font-medium">{item.price}</span>
                    <span className="text-brand-blue">{item.occ}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glow behind mockup */}
      <div className="absolute -inset-4 bg-gradient-radial from-brand-blue/10 to-transparent blur-3xl -z-10" />
    </div>
  );
}
