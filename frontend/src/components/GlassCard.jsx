import clsx from "clsx";


export default function GlassCard({ children, className = "" }) {
  return (
    <div className={clsx("glass-panel rounded-[30px] p-7 shadow-glass", className)}>
      {children}
    </div>
  );
}
