import { motion } from "framer-motion";

import GlassCard from "./GlassCard";
import IngredientPill from "./IngredientPill";


export default function IngredientSpotlight({ ingredient }) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <GlassCard className="h-full">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[1.65rem] font-semibold text-slate dark:text-white">{ingredient.name}</h3>
          <span className="rounded-full bg-gold/20 px-3 py-1 text-sm font-semibold text-slate dark:text-white">
            {ingredient.when}
          </span>
        </div>
        <p className="mt-3 text-base leading-8 text-slate/78 dark:text-white/76">
          {ingredient.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ingredient.tags.map((tag) => (
            <IngredientPill key={tag}>{tag}</IngredientPill>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {ingredient.benefits.map((benefit) => (
            <span
              key={benefit}
              className="rounded-full bg-white/60 px-3 py-1 text-sm font-medium text-slate dark:bg-white/10 dark:text-white/80"
            >
              {benefit}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
