import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fadeUp, staggerContainer } from "../animations/variants";
import GlassCard from "../components/GlassCard";
import ImageDropzone from "../components/ImageDropzone";
import PageTransition from "../components/PageTransition";
import PrimaryButton from "../components/PrimaryButton";
import { useSkincare } from "../hooks/useSkincare";
import { REQUIRED_UPLOADS, UPLOAD_REQUIREMENTS } from "../utils/constants";


export default function UploadPage() {
  const { userProfile, uploads, saveUploads } = useSkincare();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile.name) {
      navigate("/details", { replace: true });
    }
  }, [navigate, userProfile.name]);

  const handleFileUpdate = (key, file) => {
    if (uploads[key]?.preview) {
      URL.revokeObjectURL(uploads[key].preview);
    }
    const next = {
      ...uploads,
      [key]: {
        file,
        preview: URL.createObjectURL(file),
      },
    };
    saveUploads(next);
  };

  const handleClear = (key) => {
    if (uploads[key]?.preview) {
      URL.revokeObjectURL(uploads[key].preview);
    }
    const next = { ...uploads };
    delete next[key];
    saveUploads(next);
  };

  const isReady = REQUIRED_UPLOADS.every(({ key }) => uploads[key]?.file);

  return (
    <PageTransition>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassCard>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate/45 dark:text-white/40">
              Imaging guide
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-slate dark:text-white">
              Upload five clean angles for the analysis.
            </h2>
            <div className="mt-6 space-y-3">
              {UPLOAD_REQUIREMENTS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/45 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-aqua" />
                  <p className="text-sm leading-6 text-slate/72 dark:text-white/68">{item}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate/45 dark:text-white/40">
                Coverage
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {REQUIRED_UPLOADS.map(({ key, label }) => (
                  <div
                    key={key}
                    className={`rounded-[22px] border px-4 py-4 text-sm font-semibold transition ${
                      uploads[key]
                        ? "border-aqua/40 bg-aqua/12 text-slate dark:text-white"
                        : "border-white/45 bg-white/45 text-slate/60 dark:border-white/10 dark:bg-white/5 dark:text-white/55"
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <PrimaryButton
                disabled={!isReady}
                className={`gap-2 ${!isReady ? "cursor-not-allowed opacity-60" : ""}`}
                onClick={() => isReady && startTransition(() => navigate("/processing"))}
              >
                Start AI analysis
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {REQUIRED_UPLOADS.map(({ key, label }) => (
            <ImageDropzone
              key={key}
              label={label}
              value={uploads[key]}
              onFileSelect={(file) => handleFileUpdate(key, file)}
              onClear={() => handleClear(key)}
            />
          ))}
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
