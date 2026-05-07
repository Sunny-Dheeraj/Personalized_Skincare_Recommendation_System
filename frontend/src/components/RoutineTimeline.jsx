import { renderIcon } from "../utils/iconMap";
import GlassCard from "./GlassCard";


export default function RoutineTimeline({ routine }) {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate dark:text-white">{routine.title}</h3>
        <span className="rounded-full bg-aqua/14 px-3 py-1 text-xs font-semibold text-slate dark:text-white">
          Guided sequence
        </span>
      </div>
      <div className="mt-6 space-y-4">
        {routine.steps.map((step) => {
          return (
            <div key={`${routine.title}-${step.order}`} className="flex gap-4 rounded-[24px] border border-white/45 bg-white/45 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate/10 text-slate dark:bg-white/10 dark:text-white">
                {renderIcon(step.icon, { className: "h-5 w-5" })}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gold/16 px-3 py-1 text-xs font-semibold text-slate dark:text-white">
                    Step {step.order}
                  </span>
                  <h4 className="text-base font-semibold text-slate dark:text-white">{step.title}</h4>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate/70 dark:text-white/65">{step.description}</p>
                {step.ingredients.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.ingredients.map((ingredient) => (
                      <span
                        key={`${step.order}-${ingredient}`}
                        className="rounded-full border border-white/55 bg-white/60 px-3 py-1 text-xs font-medium text-slate dark:border-white/10 dark:bg-white/8 dark:text-white/80"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
