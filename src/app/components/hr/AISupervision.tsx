import { Bot, TrendingUp, AlertTriangle, CheckCircle, Eye, BarChart2, Zap, Shield } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import { motion } from "motion/react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { cn } from "../ui/utils";

const aiActivityData = [
  { day: "Lun", queries: 34 }, { day: "Mar", queries: 52 }, { day: "Mer", queries: 41 },
  { day: "Jeu", queries: 67 }, { day: "Ven", queries: 58 }, { day: "Sam", queries: 12 }, { day: "Dim", queries: 8 },
];

const accuracyData = [
  { week: "S1", accuracy: 91 }, { week: "S2", accuracy: 93 }, { week: "S3", accuracy: 89 },
  { week: "S4", accuracy: 95 }, { week: "S5", accuracy: 94 }, { week: "S6", accuracy: 97 },
];

const aiLogs = [
  { time: "09:14", user: "Marie Albert", query: "Mes congés restants", response: "Répondu · 12 jours", flag: null },
  { time: "09:31", user: "Lucas Morin", query: "Grille salariale Engineering", response: "Accès refusé · Hors périmètre", flag: "blocked" },
  { time: "10:02", user: "Karim Taleb", query: "Procédure démission", response: "Répondu avec sources", flag: null },
  { time: "10:45", user: "Aïcha Diop", query: "Politique de congé maladie", response: "Répondu · 3 sources", flag: null },
  { time: "11:12", user: "Pierre Durand", query: "Données personnelles collègues", response: "Refusé · RGPD", flag: "security" },
];

const barConfig = { queries: { label: "Requêtes", color: "#93C5FD" } };
const lineConfig = { accuracy: { label: "Précision (%)", color: "#93C5FD" } };

export function AISupervision() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200 dark:border-blue-800/50">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Supervision IA — ARIA</h1>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> Modèle actif · Intelli-Talent AI v2.4
            </p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Requêtes du jour", value: "58", icon: <Zap size={20} />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" },
          { label: "Précision moyenne", value: "94%", icon: <TrendingUp size={20} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
          { label: "Requêtes bloquées", value: "2", icon: <Shield size={20} />, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40" },
          { label: "Temps de réponse", value: "1.2s", icon: <BarChart2 size={20} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
        ].map((kpi, i) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", kpi.bg, kpi.color)}>
              {kpi.icon}
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{kpi.value}</div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Activité cette semaine</h3>
          <div className="w-full h-[220px]">
            <ChartContainer config={barConfig} className="w-full h-full">
              <BarChart data={aiActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar dataKey="queries" fill="#93C5FD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </motion.div>

        {/* Accuracy chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Précision par semaine (%)</h3>
          <div className="w-full h-[220px]">
            <ChartContainer config={lineConfig} className="w-full h-full">
              <LineChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tickMargin={10} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} domain={[80, 100]} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Line type="monotone" dataKey="accuracy" stroke="#93C5FD" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#93C5FD' }} activeDot={{ r: 6, fill: '#93C5FD' }} />
              </LineChart>
            </ChartContainer>
          </div>
        </motion.div>
      </div>

      {/* Audit log */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400">
            <Eye size={18} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Journal d'audit — Aujourd'hui</h3>
        </div>
        <div className="space-y-3">
          {aiLogs.map((log, i) => {
            const isAlert = log.flag === "security" || log.flag === "blocked";
            const isSecurity = log.flag === "security";
            
            return (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-2xl border transition-all relative overflow-hidden",
                  isAlert 
                    ? (isSecurity ? "bg-rose-50/50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/50" : "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50") 
                    : "bg-white/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                )}
              >
                {/* Pulse animation for security alerts */}
                {isSecurity && (
                  <div className="absolute top-0 right-0 -mr-2 -mt-2">
                    <span className="flex h-4 w-4 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 w-12">{log.time}</span>
                  <div className="flex-1 sm:hidden flex justify-end">
                    {isAlert ? <AlertTriangle size={16} className={isSecurity ? "text-rose-500" : "text-amber-500"} /> : <CheckCircle size={16} className="text-emerald-500" />}
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{log.user}</span>
                    <span className="text-xs font-bold text-slate-400">→</span>
                    <span className="text-sm font-medium italic text-slate-600 dark:text-slate-300">"{log.query}"</span>
                  </div>
                  <div className={cn(
                    "text-xs font-bold", 
                    isAlert ? (isSecurity ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400") : "text-slate-500 dark:text-slate-400"
                  )}>
                    {log.response}
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-center p-2 rounded-xl bg-white/50 dark:bg-slate-900/50 shadow-sm flex-shrink-0">
                  {isAlert ? (
                    <AlertTriangle size={18} className={isSecurity ? "text-rose-500" : "text-amber-500"} />
                  ) : (
                    <CheckCircle size={18} className="text-emerald-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}


