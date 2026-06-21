import { AlertTriangle, TrendingDown, Brain, Shield, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { cn } from "../ui/utils";

const alerts = [
  {
    level: "high",
    employee: "Sophie Bernard",
    role: "QA Engineer",
    alert: "Risque de départ élevé",
    detail: "Score d'engagement en baisse de 28% sur 2 mois. Absentéisme récurrent. 3 refus de formation.",
    recommendation: "Planifier un entretien de rétention dans les 48h. Revoir les conditions salariales.",
    factors: ["Absentéisme +40%", "Engagement -28%", "Formations refusées x3"],
    aiScore: 87,
  },
  {
    level: "medium",
    employee: "Nadia Rachidi",
    role: "Designer UX",
    alert: "Surcharge de travail",
    detail: "120% de charge de travail sur les 3 dernières semaines. Heures supplémentaires non planifiées.",
    recommendation: "Rééquilibrer la charge. Envisager un renfort temporaire ou reporter des livrables.",
    factors: ["Charge +20%", "Heures sup. x5", "Délais non respectés"],
    aiScore: 68,
  },
  {
    level: "medium",
    employee: "Karim Taleb",
    role: "DevOps Engineer",
    alert: "Potentiel de promotion non exploité",
    detail: "Compétences techniques très au-dessus du niveau actuel. Aucune évolution depuis 18 mois.",
    recommendation: "Proposer une évolution de poste vers Lead DevOps ou une augmentation significative.",
    factors: ["Sans évolution 18 mois", "Niveau Senior atteint", "Candidature externe détectée"],
    aiScore: 61,
  },
];

const levelConfig = {
  high: { label: "RISQUE ÉLEVÉ", bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800/50", icon: <AlertTriangle size={16} /> },
  medium: { label: "RISQUE MOYEN", bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800/50", icon: <TrendingDown size={16} /> },
  low: { label: "RISQUE FAIBLE", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800/50", icon: <Shield size={16} /> },
};

function CircularScore({ score }: { score: number }) {
  const radius = 16;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="transform -rotate-90 w-10 h-10">
          <circle cx="20" cy="20" r={radius} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="3" fill="none" />
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            cx="20" cy="20" r={radius} 
            className="stroke-blue-600 dark:stroke-blue-500" 
            strokeWidth="3" fill="none" 
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-black text-slate-700 dark:text-slate-300">{score}%</span>
      </div>
      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
        Fiabilité<br/>IA
      </div>
    </div>
  );
}

export function TeamRiskAlerts() {
  const [selectedAlertIndex, setSelectedAlertIndex] = useState<number | null>(null);
  const [scheduleNote, setScheduleNote] = useState("");

  const selectedAlert = selectedAlertIndex !== null ? alerts[selectedAlertIndex] : null;

  const handleConfirmSchedule = () => {
    const employee = selectedAlert?.employee ?? "l'employé";
    window.alert(`Action planifiée pour ${employee}.`);
    setSelectedAlertIndex(null);
    setScheduleNote("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 shadow-sm border border-rose-200 dark:border-rose-800/50">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Alertes Risques Équipe</h1>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <Brain size={14} className="text-blue-500" /> Analyse IA Intelli-Talent · Mise à jour aujourd'hui
          </p>
        </div>
      </div>

      {/* AI banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="relative z-10 flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-md">
            <Brain size={24} className="text-white" />
          </div>
          <p className="text-sm font-medium text-white/90 leading-relaxed">
            <span className="font-bold text-white text-base block mb-0.5">ARIA a détecté 3 alertes</span>
            Sur votre équipe de 8 personnes. Agissez rapidement sur les risques élevés pour maintenir la cohésion d'équipe.
          </p>
        </div>
      </motion.div>

      {/* Alerts */}
      <div className="space-y-4">
        {alerts.map((alert, i) => {
          const cfg = levelConfig[alert.level as keyof typeof levelConfig];
          const isHighRisk = alert.level === "high";

          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="relative"
            >
              <div className={cn(
                "rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 transition-all",
                isHighRisk && "border-rose-200 dark:border-rose-800 shadow-rose-200/50 dark:shadow-rose-900/20"
              )}>
                {/* Urgency indicator for high risk */}
                {isHighRisk && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-500 border-2 border-white dark:border-slate-900"></span>
                  </span>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-sm">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <div className="font-extrabold text-lg text-slate-900 dark:text-white">{alert.employee}</div>
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{alert.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CircularScore score={alert.aiScore} />
                    <span className={cn("flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border", cfg.bg, cfg.text, cfg.border)}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 font-bold text-base mb-2 text-slate-900 dark:text-white">
                    {cfg.icon} {alert.alert}
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    {alert.detail}
                  </p>
                </div>

                {/* Factors */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {alert.factors.map((f, j) => (
                    <span key={j} className={cn("text-xs font-bold px-3 py-1.5 rounded-xl border shadow-sm", cfg.bg, cfg.text, cfg.border)}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400 mt-0.5">
                      <Brain size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-blue-800 dark:text-blue-300 mb-1">Recommandation ARIA</div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{alert.recommendation}</p>
                    </div>
                  </div>
                  <Dialog open={selectedAlertIndex === i} onOpenChange={(open) => !open && setSelectedAlertIndex(null)}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setSelectedAlertIndex(i)}
                        className="flex-shrink-0 flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/25 active:scale-95 w-full sm:w-auto"
                      >
                        Planifier action
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800/50">
                      <DialogHeader>
                        <DialogTitle>Planifier une action</DialogTitle>
                        <DialogDescription>
                          Planifiez l’intervention recommandée pour <strong>{alert.employee}</strong>.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-3">
                        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-200 dark:border-slate-700">
                          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Recommandation</div>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{alert.recommendation}</p>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mb-2">Note de suivi</label>
                          <textarea
                            rows={3}
                            value={scheduleNote}
                            onChange={(e) => setScheduleNote(e.target.value)}
                            placeholder="Ex: entretien prévu le jeudi 14h..."
                            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <button
                          type="button"
                          onClick={() => setSelectedAlertIndex(null)}
                          className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          onClick={handleConfirmSchedule}
                          className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95"
                        >
                          Confirmer
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


