import clsx from "clsx";
import { useLocation } from "react-router-dom";

import { APP_STEPS } from "../utils/constants";


export default function StepIndicator() {
  const location = useLocation();
  const activeIndex = APP_STEPS.findIndex((step) => step.path === location.pathname);

  return (
    <div className="hidden items-center gap-4 xl:flex">
      {APP_STEPS.map((step, index) => {
        const isActive = index <= activeIndex;
        return (
          <div key={step.path} className="flex items-center gap-4">
            <div
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition",
                isActive
                  ? "border-aqua/70 bg-aqua/16 text-slate dark:text-white"
                  : "border-slate/15 bg-white/35 text-slate/70 dark:border-white/12 dark:bg-white/8 dark:text-white/60",
              )}
            >
              {index + 1}
            </div>
            <span
              className={clsx(
                "text-base font-medium",
                isActive ? "text-slate dark:text-white" : "text-slate/65 dark:text-white/58",
              )}
            >
              {step.label}
            </span>
            {index < APP_STEPS.length - 1 && <div className="h-px w-8 bg-slate/15 dark:bg-white/12" />}
          </div>
        );
      })}
    </div>
  );
}
