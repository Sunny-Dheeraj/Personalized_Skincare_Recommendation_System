import { MoonStar, SunMedium } from "lucide-react";

import { useTheme } from "../hooks/useTheme";


export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold text-slate shadow-glass transition hover:-translate-y-0.5 dark:text-white"
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
