import { motion } from "framer-motion";
import clsx from "clsx";


export default function PrimaryButton({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-slate to-aqua text-white shadow-halo hover:shadow-[0_24px_72px_rgba(73,136,148,0.3)] dark:from-aqua dark:to-gold dark:text-dusk",
        variant === "secondary" &&
          "glass-panel text-slate hover:bg-white/70 dark:text-white dark:hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
