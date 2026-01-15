"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

type StepKey = "consultation" | "caseEvaluation" | "strategicPlanning" | "implementation";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEP_KEYS: readonly StepKey[] = [
  "consultation",
  "caseEvaluation",
  "strategicPlanning",
  "implementation",
] as const;

export default function OurProcess() {
  const t = useTranslations("ourProcess");

  const steps = useMemo<Step[]>(() => {
    return STEP_KEYS.map((key, index) => ({
      number: String(index + 1).padStart(2, "0"),
      title: t(`steps.${key}`),
      description: t(`descriptions.${key}`),
    }));
  }, [t]);

  return (
<section className="p-[5%] ">
<div
      className="relative w-full overflow-hidden min-h-screen rounded-2xl  "
      aria-labelledby="process-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a1f1f]" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/process.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/60 to-slate-900/60" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-teal-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="w-full p-[2%]">
          {/* Heading */}
          <header className="text-center mx-auto space-y-4 mb-16 px-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <div className="w-4 h-4 bg-teal-400 rounded-full" /> */}
              <p className="font-semibold uppercase tracking-widest text-teal-400 text-[clamp(0.75rem,2.5vw,9rem)]">
                {t("title")}
              </p>
            </div>
            <h2
              id="process-heading"
              className="font-bold text-white leading-tight text-[clamp(2.25rem,4vw,5em)]"
            >
             {t("headline")}
            </h2>
          </header>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[clamp(1.5rem,3vw,3rem)] w-full px-4">
            {steps.map((step, index) => {
              const offset =
                index === 0
                  ? "md:mt-0"
                  : index === 1
                  ? "md:mt-20"
                  : index === 2
                  ? "md:mt-40"
                  : "md:mt-60";

              const lineHeight =
                index === 0 ? "h-24" : index === 1 ? "h-32" : index === 2 ? "h-40" : "h-48";

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col items-center ${offset}`}
                >
                  {/* Step Label */}
                  <div className="relative z-10 inline-block px-6 py-2 bg-slate-800/60 border border-slate-700 rounded-full">
                    <span className="font-semibold text-white text-[clamp(0.75rem,1.1vw,3rem)]">
                      {t("stepLabel")} {step.number}
                    </span>
                  </div>

                  {/* Connecting Line */}
                  <div className={`w-px ${lineHeight} bg-slate-700`} />

                  {/* Card */}
                  <article
                    className="w-full"
                    aria-label={`Step ${step.number}: ${step.title}`}
                  >
                    <div className="group relative w-full rounded-2xl bg-slate-800/60 backdrop-blur-sm p-8 border border-slate-700/50 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800/80 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10">
                      <div className="font-bold text-teal-500/80 mb-6 text-[clamp(3rem,6vw,6rem)]">
                        {step.number}
                      </div>

                      <h3 className="font-bold text-white mb-4 text-[clamp(1.25rem,2.2vw,3rem)]">
                        {step.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed text-[clamp(1rem,1.5vw,2rem)]">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Footer Text */}
          <div className="mt-16 text-center px-4">
            <p className="text-gray-200 text-[clamp(1rem,1.5vw,2.5rem)] leading-relaxed">
              {t("footerText")}
            </p>
          </div>
        </div>
      </div>
    </div>
</section>
  );
}
