import { AlertTriangle } from "lucide-react";

import GlassCard from "./GlassCard";


export default function DisclaimerCard({ message, emphasized }) {
  return (
    <GlassCard
      className={`${
        emphasized
          ? "border-amber-300/50 bg-amber-100/55 dark:border-amber-300/30 dark:bg-amber-300/10"
          : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`rounded-2xl p-3 ${
            emphasized
              ? "bg-amber-500/18 text-amber-700 dark:text-amber-300"
              : "bg-slate/10 text-slate dark:bg-white/10 dark:text-white"
          }`}
        >
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate dark:text-white">
            {emphasized ? "Sensitive Skin Notice" : "Patch Test Reminder"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate/70 dark:text-white/65">{message}</p>
        </div>
      </div>
    </GlassCard>
  );
}
