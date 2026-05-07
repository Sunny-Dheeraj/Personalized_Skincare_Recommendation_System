import { motion } from "framer-motion";

import { useTheme } from "../hooks/useTheme";


export default function FloatingBackground() {
  const { isDark } = useTheme();

  return (
    <div
      className={`fixed inset-0 -z-10 ${
        isDark ? "bg-aura-dark" : "bg-aura-light"
      } transition-colors duration-500`}
    >
      <motion.div
        animate={{ y: [0, -22, 0], x: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-[6%] top-[12%] h-56 w-56 rounded-full bg-aqua/24 blur-3xl dark:bg-aqua/16"
      />
      <motion.div
        animate={{ y: [0, 28, 0], x: [0, -16, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-[14%] right-[10%] h-72 w-72 rounded-full bg-blush/24 blur-3xl dark:bg-gold/10"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-[34%] top-[18%] h-40 w-40 rounded-full border border-white/25 bg-white/20 blur-2xl dark:border-white/10 dark:bg-white/5"
      />
    </div>
  );
}
