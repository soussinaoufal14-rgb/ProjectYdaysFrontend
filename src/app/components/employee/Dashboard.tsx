import { Calendar, FileText, Clock, TrendingUp, CheckCircle, AlertCircle, Sun, Activity as ActivityIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "motion/react";
import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { getMockData } from "../../services/mockData";

function ContactHRForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const err: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) err.name = "Le nom est requis.";
    if (!email.trim()) err.email = "L'email est requis.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Email invalide.";
    if (!message.trim()) err.message = "Le message est requis.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // simulate API
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="p-4">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Votre nom</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Prénom Nom" className="w-full mt-1 px-3 py-2 rounded-md border bg-white/80 dark:bg-slate-800/70" />
            {errors.name && <div className="text-rose-600 text-xs mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresse@exemple.com" className="w-full mt-1 px-3 py-2 rounded-md border bg-white/80 dark:bg-slate-800/70" />
            {errors.email && <div className="text-rose-600 text-xs mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Téléphone (optionnel)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6 00 00 00 00" className="w-full mt-1 px-3 py-2 rounded-md border bg-white/80 dark:bg-slate-800/70" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Expliquez votre demande" className="w-full mt-1 px-3 py-2 rounded-md border bg-white/80 dark:bg-slate-800/70 h-28" />
            {errors.message && <div className="text-rose-600 text-xs mt-1">{errors.message}</div>}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500">Réponse sous 48h.</div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => { setName(""); setEmail(""); setPhone(""); setMessage(""); setErrors({}); }} className="px-3 py-2 rounded-md border">Effacer</button>
              <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {loading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle size={28} className="text-emerald-600" />
          </div>
          <div className="text-lg font-bold mt-4">Message envoyé</div>
          <div className="text-sm text-slate-500 mt-2">Merci — l'équipe RH vous contactera bientôt.</div>
          <div className="mt-6 flex justify-center">
            <button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setPhone(''); setMessage(''); }} className="px-4 py-2 rounded-md border">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

const chartConfig = {
  jours: {
    label: "Jours travaillés",
    color: "#93C5FD",
  },
};

export function EmployeeDashboard({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const data = getMockData();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 relative overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <Sun size={18} />
            <span className="text-sm font-medium">Bonjour,</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{data.profile.name} 👋</h1>
          <p className="text-sm text-white/70 font-medium">
            {data.profile.title} · {data.profile.department} · {data.profile.date}
          </p>
        </div>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Congés restants", value: `${data.kpis.vacationRemaining}j`, sub: `sur ${data.kpis.vacationTotal}j annuels`, icon: <Calendar size={22} />, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" },
          { label: "Documents", value: `${data.kpis.documentsCount}`, sub: `${data.kpis.documentsRecent} récents`, icon: <FileText size={22} />, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-900/40" },
          { label: "Heures ce mois", value: `${data.kpis.hoursThisMonth}h`, sub: `+${data.kpis.extraHours}h supplémentaires`, icon: <Clock size={22} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
          { label: "Score présence", value: `${data.kpis.presenceScore}%`, sub: "Excellent", icon: <TrendingUp size={22} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
        ].map((kpi, index) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{kpi.value}</div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">{kpi.label}</div>
            <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1.5">{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Presence chart with Shadcn UI */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
              <ActivityIcon size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Jours travaillés par mois</h3>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ChartContainer config={chartConfig} className="w-full h-full min-h-[250px]">
              <AreaChart data={data.presenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillJours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-jours)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-jours)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  className="text-xs font-medium fill-slate-500 dark:fill-slate-400"
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  className="text-xs font-medium fill-slate-500 dark:fill-slate-400"
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="jours" 
                  stroke="var(--color-jours)" 
                  fill="url(#fillJours)" 
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </motion.div>

        {/* Activité récente */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activité récente</h3>
            <button
              onClick={() => onNavigate?.("activities")}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Tout voir
            </button>
          </div>
          <div className="space-y-5 flex-1">
            {data.activities.map((a, i) => (
              <div key={a.id} className="flex gap-4">
                <div className="relative mt-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700" style={{ color: a.color }}>
                    {a.icon === "check" ? <CheckCircle size={16} /> : a.icon === "file" ? <FileText size={16} /> : <AlertCircle size={16} />}
                  </div>
                  {i < data.activities.length - 1 && (
                    <div className="absolute top-8 bottom-[-20px] left-1/2 w-px -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">{a.text}</p>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions via Shadcn Dialogs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Demander un congé", id: "vacation" },
            { label: "Demander un document", id: "document" },
            { label: "Voir mes documents", id: "view_docs" },
            { label: "Contacter RH", id: "contact_hr" },
          ].map((a) => {
            if (a.id === "contact_hr") {
              return (
                <Dialog key={a.id}>
                  <DialogTrigger asChild>
                    <button className="flex flex-col items-center justify-center gap-3 py-5 px-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-md hover:-translate-y-1 group">
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <AlertCircle size={18} />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">{a.label}</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-white/40 dark:border-slate-800/50">
                    <DialogHeader>
                      <DialogTitle>Contacter RH</DialogTitle>
                      <DialogDescription>Envoyez un message à l'équipe RH.</DialogDescription>
                    </DialogHeader>
                    <ContactHRForm />
                  </DialogContent>
                </Dialog>
              );
            }

            const mapId: Record<string, string> = {
              vacation: "request-vacation",
              document: "request-document",
              view_docs: "my-documents",
            };

            return (
              <button
                key={a.id}
                onClick={() => onNavigate?.(mapId[a.id])}
                className="flex flex-col items-center justify-center gap-3 py-5 px-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-md hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {a.id === "vacation" ? <Calendar size={18} /> : <FileText size={18} />}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 text-center">{a.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}


