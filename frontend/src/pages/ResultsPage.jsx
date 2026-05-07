import { motion } from "framer-motion";
import { ArrowLeft, MoonStar, Sparkles, SunMedium } from "lucide-react";
import { startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fadeUp, staggerContainer } from "../animations/variants";
import DisclaimerCard from "../components/DisclaimerCard";
import GlassCard from "../components/GlassCard";
import IngredientSpotlight from "../components/IngredientSpotlight";
import InsightCard from "../components/InsightCard";
import PageTransition from "../components/PageTransition";
import PrimaryButton from "../components/PrimaryButton";
import RoutineTimeline from "../components/RoutineTimeline";
import TipCard from "../components/TipCard";
import { useSkincare } from "../hooks/useSkincare";


function SnapshotTile({ label, value, tone = "default" }) {
  const toneClasses =
    tone === "accent"
      ? "from-aqua/20 to-gold/20 dark:from-aqua/18 dark:to-gold/12"
      : "from-white/70 to-white/45 dark:from-white/12 dark:to-white/8";

  return (
    <div
      className={`rounded-[26px] border border-white/45 bg-gradient-to-br ${toneClasses} p-6 dark:border-white/12`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate/55 dark:text-white/55">
        {label}
      </p>
      <p className="mt-4 text-[2rem] font-semibold leading-tight text-slate dark:text-white">{value}</p>
    </div>
  );
}


export default function ResultsPage() {
  const { analysisResult, resetJourney } = useSkincare();
  const navigate = useNavigate();

  useEffect(() => {
    if (!analysisResult) {
      navigate("/", { replace: true });
    }
  }, [analysisResult, navigate]);

  if (!analysisResult) {
    return null;
  }

  const {
    user_name: userName,
    skin_type: skinType,
    acne_severity: acneSeverity,
    sensitive_skin: sensitiveSkin,
    concerns,
    recommended_ingredients: ingredients,
    morning_routine: morningRoutine,
    night_routine: nightRoutine,
    disclaimer,
    tip_of_the_day: tipOfTheDay,
  } = analysisResult;

  return (
    <PageTransition>
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
        <motion.div variants={fadeUp} className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
          <GlassCard className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-aqua/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate dark:text-white">
                Skin Report
              </span>
              <span className="rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-slate dark:text-white">
                {userName}
              </span>
            </div>

            <h2 className="mt-6 font-display text-[4rem] font-semibold leading-tight text-slate dark:text-white xl:text-[4.5rem]">
              Your skin analysis is
              <span className="block text-gradient">ready to review</span>
            </h2>
            <p className="mt-5 max-w-4xl text-[1.22rem] leading-9 text-slate/78 dark:text-white/80">
              Here&apos;s a clearer report-style view of your results, starting with the main profile signals and then
              moving into visible concerns, ingredient direction, and morning and night care flow.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <SnapshotTile label="Skin type" value={skinType} tone="accent" />
              <SnapshotTile label="Acne severity" value={acneSeverity} />
              <SnapshotTile
                label="Sensitivity"
                value={sensitiveSkin ? "High attention" : "Standard care"}
              />
            </div>
          </GlassCard>

          <GlassCard className="xl:sticky xl:top-28 xl:h-fit">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate/55 dark:text-white/55">
              Summary
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[24px] border border-white/45 bg-white/52 p-6 dark:border-white/12 dark:bg-white/9">
                <div className="flex items-center gap-3">
                  <SunMedium className="h-5 w-5 text-gold" />
                  <h3 className="text-2xl font-semibold text-slate dark:text-white">Day plan</h3>
                </div>
                <p className="mt-3 text-base leading-8 text-slate/78 dark:text-white/78">
                  Keep the morning routine bright, balanced, and sunscreen-led.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/45 bg-white/52 p-6 dark:border-white/12 dark:bg-white/9">
                <div className="flex items-center gap-3">
                  <MoonStar className="h-5 w-5 text-aqua" />
                  <h3 className="text-2xl font-semibold text-slate dark:text-white">Night plan</h3>
                </div>
                <p className="mt-3 text-base leading-8 text-slate/78 dark:text-white/78">
                  Reserve stronger correction for evening, then let recovery-focused layers support the finish.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton
                variant="secondary"
                className="gap-2 px-7 py-3.5 text-base"
                onClick={() => startTransition(() => navigate("/upload"))}
              >
                <ArrowLeft className="h-4 w-4" />
                Refine uploads
              </PrimaryButton>
              <PrimaryButton
                className="gap-2 px-7 py-3.5 text-base"
                onClick={() => {
                  resetJourney();
                  startTransition(() => navigate("/"));
                }}
              >
                <Sparkles className="h-4 w-4" />
                Start over
              </PrimaryButton>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <GlassCard>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate/55 dark:text-white/55">
                  Priority concerns
                </p>
                <h3 className="mt-3 text-[2rem] font-semibold text-slate dark:text-white">
                  What stood out most in the scan
                </h3>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {concerns.map((concern) => (
                <InsightCard
                  key={concern.name}
                  title={concern.name}
                  summary={concern.summary}
                  icon={concern.icon}
                  level={concern.level}
                  score={concern.score}
                />
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate/55 dark:text-white/55">
              Ingredient edit
            </p>
            <h3 className="mt-3 text-[2rem] font-semibold text-slate dark:text-white">
              Best-fit actives and support ingredients
            </h3>
            <div className="mt-6 space-y-5">
              {ingredients.slice(0, 4).map((ingredient) => (
                <IngredientSpotlight key={ingredient.name} ingredient={ingredient} />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-8 xl:grid-cols-2">
          <RoutineTimeline routine={morningRoutine} />
          <RoutineTimeline routine={nightRoutine} />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <DisclaimerCard message={disclaimer} emphasized={sensitiveSkin} />
          <TipCard tip={tipOfTheDay} />
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
