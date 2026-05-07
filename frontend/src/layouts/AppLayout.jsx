import { Outlet } from "react-router-dom";

import FloatingBackground from "../components/FloatingBackground";
import StepIndicator from "../components/StepIndicator";
import ThemeToggle from "../components/ThemeToggle";


export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <FloatingBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 pb-16 pt-5 sm:px-8 xl:px-12">
        <header className="glass-panel sticky top-4 z-30 mb-10 flex items-center justify-between rounded-full px-6 py-5 shadow-glass">
          <h1 className="font-display text-[2rem] font-semibold tracking-tight text-slate dark:text-white">
            SKIN AI
          </h1>
          <StepIndicator />
          <ThemeToggle />
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <p className="fixed bottom-5 right-5 max-w-[260px] text-right text-xs leading-5 text-slate/60 dark:text-white/50">
          AI can assist you, but it cannot replace professional dermatological advice.
        </p>
      </div>
    </div>
  );
}
