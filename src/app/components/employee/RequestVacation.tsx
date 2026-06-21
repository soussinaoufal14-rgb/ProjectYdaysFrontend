import { useState, useCallback } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle, UploadCloud, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { getMockData } from "../../services/mockData";
import { cn } from "../ui/utils";

const statusConfig = {
  approved: { label: "Approuvé", icon: <CheckCircle size={14} />, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
  rejected: { label: "Refusé", icon: <XCircle size={14} />, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/40" },
  pending: { label: "En attente", icon: <AlertCircle size={14} />, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
};

export function RequestVacation() {
  const data = getMockData();
  
  const [type, setType] = useState("Congés payés");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Demande de Congés</h1>

      {/* Balance cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Congés restants", value: `${data.kpis.vacationRemaining}j`, total: `sur ${data.kpis.vacationTotal}j`, color: "text-blue-600 dark:text-blue-400" },
          { label: "RTT restants", value: "4j", total: "sur 10j", color: "text-indigo-600 dark:text-indigo-400" },
          { label: "Congé maladie", value: "∞", total: "sous justificatif", color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Posés cette année", value: "9j", total: "consommés", color: "text-amber-600 dark:text-amber-400" },
        ].map((b, i) => (
          <motion.div 
            key={b.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <div className={`text-4xl font-extrabold mb-1 ${b.color}`}>{b.value}</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">{b.label}</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{b.total}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Nouvelle demande</h3>

          <AnimatePresence>
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <span className="font-semibold text-sm">Demande envoyée avec succès pour validation !</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Type de congé</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option>Congés payés</option>
                <option>RTT</option>
                <option>Congé maladie</option>
                <option>Congé exceptionnel</option>
                <option>Sans solde</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Dates de congé</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "w-full flex items-center justify-start gap-3 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all",
                        !dateRange.from && "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      <CalendarIcon size={18} />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "d MMM yyyy", { locale: fr })} -{" "}
                            {format(dateRange.to, "d MMM yyyy", { locale: fr })}
                          </>
                        ) : (
                          format(dateRange.from, "d MMM yyyy", { locale: fr })
                        )
                      ) : (
                        <span>Sélectionnez une période</span>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-2xl" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange as any}
                      onSelect={(range: any) => setDateRange(range)}
                      numberOfMonths={2}
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <AnimatePresence>
              {dateRange.from && dateRange.to && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30">
                    <Clock size={18} className="flex-shrink-0" />
                    <span className="text-sm font-semibold">
                      Durée estimée : {Math.max(1, Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / 86400000))} jour(s) ouvrable(s)
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Motif (optionnel)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Précisez la raison de votre demande…"
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder:text-slate-400"
              />
            </div>

            <AnimatePresence>
              {type === "Congé maladie" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2">
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Certificat médical (Requis)</label>
                    {!file ? (
                      <div 
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => document.getElementById('medical-cert-upload')?.click()}
                        className={cn(
                          "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-200",
                          isDragging 
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                            : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        <UploadCloud size={32} className={isDragging ? "text-blue-500" : "text-slate-400"} />
                        <p className="text-sm font-bold mt-4 text-slate-700 dark:text-slate-300">
                          {isDragging ? "Relâchez le fichier ici" : "Cliquez ou glissez pour télécharger un document"}
                        </p>
                        <p className="text-xs font-medium mt-1.5 text-slate-500 dark:text-slate-500">PDF, JPG ou PNG (Max 5MB)</p>
                        <input 
                          id="medical-cert-upload" 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => e.target.files && setFile(e.target.files[0])}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                            <FileText size={20} />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setFile(null)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              className="w-full py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Envoyer la demande
            </button>
          </form>
        </motion.div>

        {/* History Area */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* History */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Historique des demandes</h3>
            <div className="space-y-4 flex-1">
              {data.vacationHistory.map((h, i) => {
                const s = statusConfig[h.status as keyof typeof statusConfig];
                return (
                  <div key={h.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        <CalendarIcon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{h.type}</div>
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{h.from} → {h.to} · {h.days} jour{h.days > 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border", s.bg, s.color, s.bg.replace("bg-", "border-").replace("/40", "/20"))}>
                      {s.icon} <span className="hidden sm:inline">{s.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


