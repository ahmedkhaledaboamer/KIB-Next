"use client";

import { useTranslations } from "next-intl";

export default function OurProcess() {
  const t = useTranslations("ourProcess");

  const steps = [
    { number: "1", title: t("steps.consultation") },
    { number: "2", title: t("steps.caseEvaluation") },
    { number: "3", title: t("steps.strategicPlanning") },
    { number: "4", title: t("steps.representation") },
    { number: "5", title: t("steps.caseFollowUp") },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/aa.webp)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="container mx-auto px-4 lg:px-12 py-16">
          {/* Title */}
          <h2
            className="font-bold mb-12 text-center"
            style={{ fontSize: "clamp(2rem,5vw,6rem)", color: "#ff6900" }}
          >
            {t("title")} 
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1rem,2vw,5rem)] items-center">
            {/* Left Side - Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group w-full max-w-[600px] aspect-[3/4]">
                {/* Orange Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(100px,20vw,256px)] h-[clamp(100px,20vw,256px)] bg-orange-600 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Image */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/images/aa.webp"
                    alt="Professional lawyer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Right Side - Steps */}
            <div className="space-y-[clamp(1rem,2vw,3rem)]">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-[clamp(1rem,2vw,2rem)] transition-all duration-300 hover:bg-slate-800/60 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/50"
                >
                  <div className="flex items-center gap-[clamp(1rem,2vw,2rem)]">
                    {/* Number */}
                    <div
                      style={{ fontSize: "clamp(2rem,4vw,6rem)" }}
                      className="font-bold text-white/90 group-hover:text-orange-500 transition-colors duration-300"
                    >
                      {step.number}
                    </div>

                    {/* Separator */}
                    <div
                      style={{ fontSize: "clamp(1.5rem,3vw,4rem)" }}
                      className="font-bold text-orange-500"
                    >
                      :-
                    </div>

                    {/* Title */}
                    <div
                      style={{ fontSize: "clamp(1.5rem,3vw,4rem)" }}
                      className="font-bold text-orange-500 group-hover:text-orange-400 transition-colors duration-300"
                    >
                      {step.title}
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-transparent w-0 group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
