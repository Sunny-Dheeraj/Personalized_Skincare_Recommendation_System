import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";

import { fadeUp, staggerContainer } from "../animations/variants";
import PageTransition from "../components/PageTransition";
import PrimaryButton from "../components/PrimaryButton";


export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <PageTransition className="flex min-h-[78vh] items-center">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="w-full"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-5xl space-y-8 py-8 text-center">
          <div className="space-y-6">
            <p className="text-base font-semibold uppercase tracking-[0.34em] text-slate/60 dark:text-white/58">
              Hello
            </p>
            <div>
              <h2 className="font-display text-[4.2rem] font-semibold leading-[0.94] text-slate dark:text-white sm:text-[5.4rem] xl:text-[6.2rem]">
                Discover your
                <span className="block text-gradient">skin story</span>
              </h2>
              <p className="mx-auto mt-8 max-w-3xl text-[1.35rem] leading-9 text-slate/78 dark:text-white/80">
                Upload a few clean face angles and get a calm, structured skin analysis with concerns, ingredients,
                and a personalized routine presented in one clear report.
              </p>
            </div>
          </div>

          <PrimaryButton
            className="gap-2 px-8 py-4 text-lg"
            onClick={() => startTransition(() => navigate("/details"))}
          >
            Begin analysis
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
