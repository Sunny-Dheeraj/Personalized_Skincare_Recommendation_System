export default function LoadingPulse({ progress }) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-full bg-white/45 p-1 dark:bg-white/8">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-aqua via-mint to-gold transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs font-medium text-slate/60 dark:text-white/55">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}
