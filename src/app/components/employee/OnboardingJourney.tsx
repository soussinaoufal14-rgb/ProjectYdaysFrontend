import { CheckCircle, Circle, Lock, ChevronRight, Star, CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "../ui/utils";

const steps = [
  {
    phase: "Semaine 1 — Intégration",
    items: [
      { label: "Signature du contrat", done: true, date: "15 Jan 2022" },
      { label: "Configuration poste de travail", done: true, date: "15 Jan 2022" },
      { label: "Visite des locaux", done: true, date: "16 Jan 2022" },
      { label: "Rencontre avec l'équipe", done: true, date: "16 Jan 2022" },
    ],
  },
  {
    phase: "Semaine 2 — Formation",
    items: [
      { label: "Formation outils internes", done: true, date: "18 Jan 2022" },
      { label: "Formation processus RH", done: true, date: "19 Jan 2022" },
      { label: "Formation sécurité informatique", done: true, date: "20 Jan 2022" },
      { label: "Réunion with manager", done: true, date: "21 Jan 2022" },
    ],
  },
  {
    phase: "Mois 1 — Prise en main",
    items: [
      { label: "Premier projet assigné", done: true, date: "25 Jan 2022" },
      { label: "Point de suivi J+15", done: true, date: "30 Jan 2022" },
      { label: "Évaluation fin de mois", done: true, date: "15 Fév 2022" },
    ],
  },
  {
    phase: "Période d'essai — Confirmation",
    items: [
      { label: "Entretien mi-période", done: false, date: null, locked: false },
      { label: "Évaluation compétences", done: false, date: null, locked: false },
      { label: "Confirmation définitive", done: false, date: null, locked: true },
    ],
  },
];

export function OnboardingJourney() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set([
    "0-0", "0-1", "0-2", "0-3", // Phase 1 done
    "1-0", "1-1", "1-2", "1-3", // Phase 2 done
    "2-0", "2-1", "2-2",         // Phase 3 done
  ]));

  const handleStartStep = (phaseIndex: number, itemIndex: number) => {
    const stepKey = `${phaseIndex}-${itemIndex}`;
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepKey);
    setCompletedSteps(newCompleted);
  };

  const getItemDone = (phaseIndex: number, itemIndex: number) => {
    return completedSteps.has(`${phaseIndex}-${itemIndex}`);
  };

  const allItems = steps.flatMap((s) => s.items);
  const done = completedSteps.size;
  const total = allItems.length;
  const progress = Math.round((done / total) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Parcours d'Onboarding</h1>

      {/* Progress header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 relative overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20"
      >
        <div className="absolute right-[-5%] bottom-[-20%] opacity-10 text-[10rem] leading-none font-bold text-white pointer-events-none">
          {progress}%
        </div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 text-white gap-2">
            <span className="font-bold text-lg">Progression globale</span>
            <span className="font-bold bg-white/20 px-3 py-1 rounded-xl text-sm backdrop-blur-md">{done}/{total} étapes validées</span>
          </div>
          <div className="h-3 rounded-full mb-5 bg-white/20 overflow-hidden shadow-inner backdrop-blur-sm">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]" />
            </motion.div>
          </div>
          {progress >= 100 ? (
            <div className="flex items-center gap-2 text-amber-300 bg-amber-400/10 px-4 py-2 rounded-xl inline-flex backdrop-blur-sm">
              <Star size={18} fill="currentColor" />
              <span className="text-sm font-bold">Onboarding complété ! Félicitations 🎉</span>
            </div>
          ) : (
            <p className="text-sm font-medium text-white/80 bg-black/10 px-4 py-2 rounded-xl inline-block backdrop-blur-sm">
              Encore {total - done} étape{total - done > 1 ? "s" : ""} avant la confirmation définitive.
            </p>
          )}
        </div>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative pl-4 sm:pl-8 py-4">
        {/* Main Timeline Line */}
        <div className="absolute left-[35px] sm:left-[51px] top-6 bottom-6 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-10">
          {steps.map((phase, pi) => {
            const phaseDone = phase.items.every((_, ii) => getItemDone(pi, ii));
            const isCurrentPhase = !phaseDone && steps.findIndex((s, idx) => !s.items.every((_, jj) => getItemDone(idx, jj))) === pi;

            return (
              <motion.div 
                key={pi} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + pi * 0.1 }}
                className="relative"
              >
                {/* Phase Marker */}
                <div className="absolute left-0 top-6 -translate-x-1/2 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-4 border-slate-50 dark:border-slate-950 z-10 shadow-sm",
                    phaseDone ? "bg-emerald-500 text-white" : isCurrentPhase ? "bg-blue-600 text-white shadow-blue-500/50" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  )}>
                    {phaseDone ? <CheckCircle size={14} /> : <div className={cn("w-2 h-2 rounded-full", isCurrentPhase ? "bg-white animate-pulse" : "bg-slate-400")} />}
                  </div>
                </div>

                <div className="pl-10">
                  <div className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20">
                    <h3 className={cn("text-lg font-bold mb-6", phaseDone ? "text-emerald-600 dark:text-emerald-400" : isCurrentPhase ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white")}>
                      {phase.phase}
                    </h3>

                    <div className="space-y-4">
                      {phase.items.map((item, ii) => {
                        const itemDone = getItemDone(pi, ii);
                        return (
                        <div key={ii} className="flex items-center gap-4 group">
                          <div className="flex-shrink-0">
                            {itemDone ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <CheckCircle size={14} />
                              </div>
                            ) : item.locked ? (
                              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                                <Lock size={12} />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center transition-colors group-hover:border-blue-400" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <span className={cn(
                              "text-sm block truncate transition-colors", 
                              itemDone ? "text-slate-900 dark:text-white font-semibold" : 
                              item.locked ? "text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            )}>
                              {item.label}
                            </span>
                          </div>

                          {item.date && (
                            <div className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-lg">
                              <CalendarDays size={12} /> <span className="hidden sm:inline">{item.date}</span>
                            </div>
                          )}
                          
                          {!itemDone && !item.locked && (
                            <button 
                              onClick={() => handleStartStep(pi, ii)}
                              className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-sm">
                              <span className="hidden sm:inline">Commencer</span> <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


