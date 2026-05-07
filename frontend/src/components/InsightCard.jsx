import { motion } from "framer-motion";

import { renderIcon } from "../utils/iconMap";
import GlassCard from "./GlassCard";


export default function InsightCard({ title, summary, icon, level, score }) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <GlassCard className="h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-2xl bg-aqua/14 p-3.5 text-aqua">
            {renderIcon(icon, { className: "h-5 w-5" })}
          </div>
          <span className="rounded-full bg-slate/10 px-3 py-1 text-sm font-semibold text-slate dark:bg-white/12 dark:text-white">
            {level}
          </span>
        </div>
        <h3 className="mt-5 text-[1.7rem] font-semibold text-slate dark:text-white">{title}</h3>
        <p className="mt-3 text-base leading-8 text-slate/78 dark:text-white/76">{summary}</p>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate/65 dark:text-white/62">
            <span>Visibility</span>
            <span>{score}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate/10 dark:bg-white/12">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-aqua to-gold"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
