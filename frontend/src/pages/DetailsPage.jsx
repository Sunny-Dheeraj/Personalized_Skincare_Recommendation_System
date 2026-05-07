import { motion } from "framer-motion";
import { ArrowRight, BedDouble, UserRound } from "lucide-react";
import { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fadeUp, staggerContainer } from "../animations/variants";
import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";
import PageTransition from "../components/PageTransition";
import PrimaryButton from "../components/PrimaryButton";
import ToggleSwitch from "../components/ToggleSwitch";
import { useSkincare } from "../hooks/useSkincare";


export default function DetailsPage() {
  const { userProfile, saveUserProfile } = useSkincare();
  const navigate = useNavigate();
  const [form, setForm] = useState(userProfile);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!form.age || Number(form.age) < 14 || Number(form.age) > 100) {
      nextErrors.age = "This app supports users aged 14 and above.";
    }
    if (!form.sleepDuration || Number(form.sleepDuration) <= 0 || Number(form.sleepDuration) > 24) {
      nextErrors.sleepDuration = "Sleep duration should be between 0 and 24 hours.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    saveUserProfile({
      name: form.name.trim(),
      age: Number(form.age),
      sensitiveSkin: form.sensitiveSkin,
      sleepDuration: Number(form.sleepDuration),
    });

    startTransition(() => navigate("/upload"));
  };

  return (
    <PageTransition>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto grid w-full max-w-[1400px] gap-8 lg:grid-cols-[0.92fr_1.08fr]"
      >
        <motion.div variants={fadeUp}>
          <GlassCard className="h-full">
            <div className="inline-flex items-center gap-2 rounded-full bg-aqua/14 px-4 py-2 text-base font-semibold text-slate dark:text-white">
              <UserRound className="h-4 w-4 text-aqua" />
              Profile setup
            </div>
            <h2 className="mt-6 font-display text-[4rem] font-semibold leading-tight text-slate dark:text-white xl:text-[4.4rem]">
              Tell us a little about your skin context.
            </h2>
            <p className="mt-6 text-[1.25rem] leading-10 text-slate/78 dark:text-white/78">
              These details help the recommendation engine adjust ingredient strength, comfort, and routine order with
              a more skin-aware plan.
            </p>
            <p className="mt-3 text-base font-medium text-slate/65 dark:text-white/65">
              This experience is intended for users aged 14 and above.
            </p>

            <div className="mt-10 grid gap-4">
              {[
                "Sensitive skin gets gentler ingredient filtering.",
                "Sleep duration helps contextualize under-eye and stress-related suggestions.",
                "Your profile is used to personalize the final dashboard.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/45 bg-white/45 p-5 text-base leading-7 text-slate/76 dark:border-white/12 dark:bg-white/7 dark:text-white/76"
                >
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit}>
          <GlassCard className="space-y-6">
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={form.name}
              error={errors.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                label="Age"
                type="number"
                placeholder="24"
                value={form.age}
                error={errors.age}
                onChange={(event) => updateField("age", event.target.value)}
              />
              <InputField
                label="Sleep duration"
                type="number"
                step="0.5"
                placeholder="7.5"
                hint="Average hours of sleep per night"
                value={form.sleepDuration}
                error={errors.sleepDuration}
                onChange={(event) => updateField("sleepDuration", event.target.value)}
              />
            </div>

            <ToggleSwitch
              label="Sensitive skin"
              description="Turn this on if your skin reacts easily to active ingredients or fragranced products."
              checked={form.sensitiveSkin}
              onChange={(value) => updateField("sensitiveSkin", value)}
            />

            <div className="rounded-[26px] border border-white/45 bg-gradient-to-r from-white/75 to-aqua/18 p-6 dark:border-white/12 dark:from-white/10 dark:to-aqua/18">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-slate/10 p-3 text-slate dark:bg-white/10 dark:text-white">
                  <BedDouble className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate dark:text-white">Routine comfort matters</h3>
                  <p className="mt-2 text-base leading-7 text-slate/78 dark:text-white/78">
                    We&apos;ll use your details to lean gentler or more active where appropriate, while keeping the
                    plan realistic for everyday use.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <PrimaryButton type="submit" className="gap-2 px-8 py-4 text-lg">
                Continue to uploads
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </GlassCard>
        </motion.form>
      </motion.div>
    </PageTransition>
  );
}
