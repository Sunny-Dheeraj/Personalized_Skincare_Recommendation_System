import { motion } from "framer-motion";
import { useEffect, useEffectEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import LoadingPulse from "../components/LoadingPulse";
import PageTransition from "../components/PageTransition";
import PrimaryButton from "../components/PrimaryButton";
import { useSkincare } from "../hooks/useSkincare";
import { analyzeSkincare } from "../services/api";


const statusMessages = [
  "Analyzing skin...",
  "Detecting concerns...",
  "Running skin type model...",
  "Generating skincare routine...",
];

export default function ProcessingPage() {
  const { userProfile, uploads, saveAnalysisResult } = useSkincare();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(12);
  const [statusIndex, setStatusIndex] = useState(0);
  const [error, setError] = useState("");

  const rotateStatus = useEffectEvent(() => {
    setStatusIndex((current) => (current + 1) % statusMessages.length);
  });

  useEffect(() => {
    if (!userProfile.name) {
      navigate("/details", { replace: true });
      return;
    }
    if (Object.keys(uploads).length < 5) {
      navigate("/upload", { replace: true });
      return;
    }

    let isMounted = true;
    const progressTimer = window.setInterval(() => {
      setProgress((current) => (current >= 92 ? current : current + 4));
    }, 520);
    const messageTimer = window.setInterval(() => rotateStatus(), 1800);
    const stopTimers = () => {
      window.clearInterval(progressTimer);
      window.clearInterval(messageTimer);
    };

    analyzeSkincare({ profile: userProfile, uploads })
      .then((data) => {
        if (!isMounted) {
          return;
        }
        stopTimers();
        setProgress(100);
        saveAnalysisResult(data);
        window.setTimeout(() => navigate("/results"), 500);
      })
      .catch((requestError) => {
        if (!isMounted) {
          return;
        }
        stopTimers();
        setError(
          requestError?.response?.data?.detail ||
            "We couldn't complete the skin analysis this time. Please try again.",
        );
      });

    return () => {
      isMounted = false;
      stopTimers();
    };
  }, [navigate, saveAnalysisResult, uploads, userProfile]);

  return (
    <PageTransition className="flex min-h-[72vh] items-center justify-center">
      <GlassCard className="relative w-full max-w-3xl overflow-hidden p-8 sm:p-10">
        <div className="absolute left-1/2 top-12 h-44 w-44 -translate-x-1/2 rounded-full bg-aqua/18 blur-3xl dark:bg-aqua/12" />
        <div className="relative">
          <div className="mx-auto flex h-40 w-40 items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full border border-aqua/20 animate-pulse-ring" />
            <div className="absolute h-28 w-28 rounded-full border border-gold/30 animate-pulse-ring [animation-delay:0.6s]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/50 bg-white/70 shadow-halo dark:border-white/10 dark:bg-white/10"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-aqua to-gold" />
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate/45 dark:text-white/38">
              AI processing
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold text-slate dark:text-white">
              {error ? "Analysis paused" : statusMessages[statusIndex]}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate/70 dark:text-white/65">
              {error
                ? error
                : "We’re blending image detection, skin-type classification, and dermatology-inspired logic into one polished recommendation flow."}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <LoadingPulse progress={progress} />
          </div>

          {error && (
            <div className="mt-8 flex justify-center">
              <PrimaryButton variant="secondary" onClick={() => navigate("/upload")}>
                Return to uploads
              </PrimaryButton>
            </div>
          )}
        </div>
      </GlassCard>
    </PageTransition>
  );
}
