import { useState } from "react";
import { Users, Clock, TrendingUp, UserPlus, AlertTriangle, CheckCircle, UserCircle, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { cn } from "../ui/utils";

const hiringData = [
  { month: "Jan", recrues: 3 }, { month: "Fév", recrues: 5 },
  { month: "Mar", recrues: 2 }, { month: "Avr", recrues: 7 },
  { month: "Mai", recrues: 4 }, { month: "Jun", recrues: 6 },
];

const deptData = [
  { name: "Engineering", value: 42, color: "var(--color-eng)" },
  { name: "Commercial", value: 28, color: "var(--color-com)" },
  { name: "RH", value: 12, color: "var(--color-rh)" },
  { name: "Finance", value: 18, color: "var(--color-fin)" },
  { name: "Marketing", value: 24, color: "var(--color-mar)" },
];

const barConfig = { recrues: { label: "Recrutements", color: "#93C5FD" } };

const pieConfig = {
  eng: { label: "Engineering", color: "#2563EB" }, // blue-600
  com: { label: "Commercial", color: "#059669" }, // emerald-600
  rh: { label: "RH", color: "#7C3AED" }, // violet-600
  fin: { label: "Finance", color: "#D97706" }, // amber-600
  mar: { label: "Marketing", color: "#E11D48" }, // rose-600
};

const initialRecentRequests = [
  { id: 1, name: "Marie Albert", type: "Congés payés", date: "9 Jun", status: "pending" },
  { id: 2, name: "Lucas Morin", type: "Attestation travail", date: "8 Jun", status: "pending" },
  { id: 3, name: "Aïcha Diop", type: "RTT", date: "7 Jun", status: "approved" },
  { id: 4, name: "Pierre Durand", type: "Congé maladie", date: "6 Jun", status: "approved" },
];

type HRDashboardProps = {
  onNavigate: (page: string) => void;
};

export function HRDashboard({ onNavigate }: HRDashboardProps) {
  const [recentRequests, setRecentRequests] = useState(initialRecentRequests);

  const handleRequestDecision = (id: number, status: "approved" | "rejected") => {
    setRecentRequests((prev) => prev.map((req) => req.id === id ? { ...req, status } : req));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tableau de Bord RH</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Total employés", value: "124", trend: "+3", icon: <Users size={22} />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" },
          { label: "Demandes en attente", value: "14", trend: "+2", icon: <Clock size={22} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
          { label: "Recrutements actifs", value: "7", trend: "+1", icon: <UserPlus size={22} />, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/40" },
          { label: "Taux présence", value: "94%", trend: "+1%", icon: <TrendingUp size={22} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
        ].map((kpi, i) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", kpi.bg, kpi.color)}>
                {kpi.icon}
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                {kpi.trend}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 relative z-10">{kpi.value}</div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 relative z-10">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Hiring chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recrues par mois</h3>
          <div className="w-full h-[250px]">
            <ChartContainer config={barConfig} className="w-full h-full">
              <BarChart data={hiringData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} className="text-xs font-semibold fill-slate-500 dark:fill-slate-400" />
                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                <Bar dataKey="recrues" fill="var(--color-recrues)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </motion.div>

        {/* Dept distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 flex flex-col"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Répartition par équipe</h3>
          <div className="flex-1 min-h-[160px] flex items-center justify-center">
            <ChartContainer config={pieConfig} className="w-full h-full max-h-[160px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} stroke="none" paddingAngle={2}>
                  {deptData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
          <div className="space-y-2 mt-4">
            {deptData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: pieConfig[d.name.toLowerCase().substring(0,3) as keyof typeof pieConfig]?.color || "#000" }} />
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{d.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent requests */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Demandes récentes</h3>
            <button
              onClick={() => onNavigate("request-review")}
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Voir toutes les demandes →
            </button>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {recentRequests.map((r) => (
                <motion.div 
                  layout
                  key={r.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 shadow-sm">
                      <UserCircle size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{r.name}</div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{r.type} · {r.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {r.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleRequestDecision(r.id, "approved")}
                          className="flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => handleRequestDecision(r.id, "rejected")}
                          className="flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                        >
                          Refuser
                        </button>
                      </>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl w-full sm:w-auto">
                        <CheckCircle size={14} /> Traité
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-3xl p-6 bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/20 relative overflow-hidden h-full">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 blur-2xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">3 contrats expirent bientôt</h3>
              <p className="text-sm text-white/90 font-medium leading-relaxed">
                Lucas M., Karim T. et Nadia R. <br/>
                Veuillez vérifier les renouvellements avant la fin du mois pour éviter une interruption de service.
              </p>
              <button className="mt-6 w-full py-3 rounded-xl bg-white text-amber-600 font-bold text-sm hover:bg-amber-50 transition-colors shadow-md">
                Gérer les contrats
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


