import { Leaf } from "lucide-react";

import GlassCard from "./GlassCard";


export default function TipCard({ tip }) {
  return (
    <GlassCard>
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-mint/30 p-3 text-slate dark:bg-mint/12 dark:text-mint">
          <Leaf className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate/50 dark:text-white/40">
            Tip of the day
          </p>
          <p className="mt-3 text-sm leading-6 text-slate/75 dark:text-white/70">{tip}</p>
          <p className="mt-3 text-sm font-semibold text-slate dark:text-white">
            Glowing skin depends on lifestyle too.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
