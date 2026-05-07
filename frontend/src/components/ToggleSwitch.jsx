export default function ToggleSwitch({ label, description, checked, onChange }) {
  return (
    <div className="rounded-2xl border border-white/45 bg-white/55 p-5 dark:border-white/12 dark:bg-white/9">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate dark:text-white">{label}</p>
          <p className="mt-1 text-sm leading-6 text-slate/68 dark:text-white/70">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative h-9 w-16 rounded-full transition ${
            checked ? "bg-gradient-to-r from-aqua to-gold" : "bg-slate/15 dark:bg-white/12"
          }`}
        >
          <span
            className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow transition ${
              checked ? "left-8" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
