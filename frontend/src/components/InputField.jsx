export default function InputField({ label, error, hint, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-base font-semibold text-slate/85 dark:text-white/85">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/45 bg-white/70 px-5 py-3.5 text-base text-slate shadow-sm transition placeholder:text-slate/40 focus:border-aqua/60 focus:ring-2 focus:ring-aqua/25 dark:border-white/12 dark:bg-white/10 dark:text-white dark:placeholder:text-white/38"
      />
      {hint && !error && <p className="text-sm text-slate/60 dark:text-white/62">{hint}</p>}
      {error && <p className="text-sm font-medium text-rose-500">{error}</p>}
    </label>
  );
}
