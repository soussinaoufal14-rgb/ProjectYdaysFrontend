import { useState } from "react";
import { Users, TrendingUp, Clock, AlertTriangle, CheckCircle, XCircle, UserCircle } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { cn } from "../ui/utils";

const teamPerf = [
  { subject: "Livraisons", score: 88 }, { subject: "Présence", score: 94 },
  { subject: "Qualité", score: 82 }, { subject: "Autonomie", score: 76 },
  { subject: "Collaboration", score: 91 }, { subject: "Innovation", score: 70 },
];

const weeklyOutput = [
  { day: "Lun", tasks: 12 }, { day: "Mar", tasks: 18 }, { day: "Mer", tasks: 15 },
  { day: "Jeu", tasks: 22 }, { day: "Ven", tasks: 19 },
];

const teamMembers = [
  { name: "Marie Albert", role: "Dev Full Stack", score: 91, status: "active" },
  { name: "Lucas Morin", role: "Chef Projet", score: 85, status: "active" },
  { name: "Karim Taleb", role: "DevOps", score: 78, status: "active" },
  { name: "Nadia Rachidi", role: "Designer UX", score: 72, status: "leave" },
];

const radarConfig = { score: { label: "Score", color: "#93C5FD" } };
const barConfig = { tasks: { label: "Tâches", color: "#93C5FD" } };

export function ManagerDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, name: "Marie Albert", type: "Congés payés", dates: "10–18 Juil 2026", status: "pending" },
    { id: 2, name: "Karim Taleb", type: "Sans solde", dates: "1–15 Août 2026", status: "pending" },
    { id: 3, name: "Lucas Morin", type: "RTT", dates: "20 Jun 2026", status: "pending" },
  ]);

  const [selectedReq, setSelectedReq] = useState<number | null>(null);
  const [reviewAction, setReviewAction] = useState<"approved" | "rejected" | null>(null);
  const [reviewNote, setReviewNote] = useState("");

  const handleConfirmAction = () => {
    if (selectedReq && reviewAction) {
      setPendingApprovals((prev) => prev.map((p) => (p.id === selectedReq ? { ...p, status: reviewAction } : p)));
    }
    setSelectedReq(null);
    setReviewAction(null);
    setReviewNote("");
  };

  const reqObj = pendingApprovals.find(r => r.id === selectedReq);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Vue d'ensemble Manager</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Membres équipe", value: "8", icon: <Users size={22} />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" },
          { label: "Demandes en attente", value: pendingApprovals.filter(p => p.status === "pending").length, icon: <Clock size={22} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
          { label: "Score équipe", value: "84%", icon: <TrendingUp size={22} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
          { label: "Alertes risques", value: "2", icon: <AlertTriangle size={22} />, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40" },
        ].map((kpi, i) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", kpi.bg, kpi.color)}>
                {kpi.icon}
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{kpi.value}</div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Radar performance with Shadcn Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance globale</h3>
          <div className="w-full aspect-square">
            <ChartContainer config={radarConfig} className="w-full h-full min-h-[250px]">
              <RadarChart data={teamPerf} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid className="stroke-slate-200 dark:stroke-slate-700" />
                <PolarAngleAxis dataKey="subject" className="text-xs font-semibold fill-slate-600 dark:fill-slate-400" />
                <Radar dataKey="score" fill="var(--color-score)" fillOpacity={0.4} stroke="var(--color-score)" strokeWidth={2} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              </RadarChart>
            </ChartContainer>
          </div>
        </motion.div>

        {/* Weekly output with Shadcn Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Productivité Hebdomadaire</h3>
          <div className="w-full h-[250px]">
            <ChartContainer config={barConfig} className="w-full h-full">
              <BarChart data={weeklyOutput}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <YAxis axisLine={false} tickLine={false} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </motion.div>

        {/* Top performers */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Membres clés</h3>
          <div className="space-y-4">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr from-blue-600 to-indigo-600 flex-shrink-0 shadow-sm">
                  <UserCircle size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{m.name}</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{m.role}</div>
                </div>
                <div className="flex items-center gap-1">
                  {m.status === "leave" ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">Congé</span>
                  ) : (
                    <span className={cn("text-sm font-black", m.score >= 85 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400")}>{m.score}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pending approvals */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Validation des demandes</h3>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 w-fit">
            {pendingApprovals.filter(p => p.status === "pending").length} en attente
          </span>
        </div>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {pendingApprovals.map((req) => (
              <motion.div 
                layout 
                key={req.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-sm">
                    <UserCircle size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{req.name}</div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{req.type} · <span className="text-slate-700 dark:text-slate-300 font-semibold">{req.dates}</span></div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  {req.status === "pending" ? (
                    <>
                      <button
                        onClick={() => { setSelectedReq(req.id); setReviewAction("rejected"); }}
                        className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                      >
                        Refuser
                      </button>
                      <button
                        onClick={() => { setSelectedReq(req.id); setReviewAction("approved"); }}
                        className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                      >
                        Approuver
                      </button>
                    </>
                  ) : req.status === "approved" ? (
                    <span className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl w-full sm:w-auto">
                      <CheckCircle size={14} /> Traité
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 rounded-xl w-full sm:w-auto">
                      <XCircle size={14} /> Refusé
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Review Dialog */}
      <Dialog open={!!selectedReq} onOpenChange={(open) => !open && setSelectedReq(null)}>
        <DialogContent className="sm:max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-white/40 dark:border-slate-800/50">
          <DialogHeader>
            <DialogTitle>{reviewAction === "approved" ? "Valider la demande" : "Refuser la demande"}</DialogTitle>
            <DialogDescription>
              {reviewAction === "approved" ? (
                <>Vous êtes sur le point de valider la demande de <strong className="text-emerald-600 dark:text-emerald-400">{reqObj?.name}</strong>.</>
              ) : (
                <>Vous êtes sur le point de refuser la demande de <strong className="text-rose-600 dark:text-rose-400">{reqObj?.name}</strong>. Cette action peut être notifiée à l'employé.</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className={cn(
              "p-4 rounded-xl border bg-white/80 dark:bg-slate-950/80",
              reviewAction === "approved"
                ? "border-emerald-200 dark:border-emerald-700"
                : "border-rose-200 dark:border-rose-700"
            )}>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Détails de la demande</div>
              <div className={cn(
                "text-sm font-bold mb-1",
                reviewAction === "approved" ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
              )}
              >{reqObj?.type}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{reqObj?.dates}</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Commentaire (optionnel)</label>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                rows={2}
                placeholder="Donnez une raison ou un contexte..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <button 
              onClick={() => setSelectedReq(null)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleConfirmAction}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md transition-all active:scale-95",
                reviewAction === "approved" 
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25" 
                  : "bg-rose-600 hover:bg-rose-700 shadow-rose-500/25"
              )}
            >
              {reviewAction === "approved" ? "Valider" : "Refuser"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


