export default function IngredientPill({ children }) {
  return (
    <span className="rounded-full border border-aqua/30 bg-aqua/12 px-3 py-1 text-xs font-semibold text-slate dark:text-white">
      {children}
    </span>
  );
}
