import { motion } from "framer-motion";

import { pageVariants } from "../animations/variants";


export default function PageTransition({ children, className = "" }) {
  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.section>
  );
}
