import { useState } from "react";
import { FileText, CheckCircle, Clock, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getMockData } from "../../services/mockData";
import { cn } from "../ui/utils";

const docTypes = [
  { id: "attestation", label: "Attestation de travail", delay: "24h" },
  { id: "fiche-paie", label: "Bulletin de paie", delay: "48h" },
  { id: "rib", label: "Attestation RIB", delay: "24h" },
  { id: "conge", label: "Attestation de congés", delay: "24h" },
  { id: "emploi", label: "Contrat de travail", delay: "72h" },
  { id: "mutuelle", label: "Attestation mutuelle", delay: "48h" },
];

export function RequestDocument() {
  const data = getMockData();
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setSelected(null); setNote(""); }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Demande de Document</h1>

      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4 mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
              <CheckCircle size={24} className="flex-shrink-0" />
              <div>
                <div className="font-bold">Demande envoyée avec succès !</div>
                <div className="text-sm font-medium mt-0.5 opacity-90">Vous recevrez une notification dès que votre document sera prêt.</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Document type selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Choisir un type de document</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {docTypes.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelected(selected === d.id ? null : d.id)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all duration-200",
                  selected === d.id 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md shadow-blue-500/10" 
                    : "border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-white dark:hover:bg-slate-800"
                )}
              >
                <div className={cn("text-sm font-bold", selected === d.id ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-300")}>{d.label}</div>
                <div className={cn("flex items-center gap-1.5 mt-2 text-xs font-medium", selected === d.id ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-500")}>
                  <Clock size={12} /> Traitement : {d.delay}
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Note complémentaire (optionnel)</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Précisez si nécessaire (destinataire, objet…)"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder:text-slate-400"
                  />
                </div>
                <button 
                  onClick={handleSubmit} 
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  <FileText size={18} /> Envoyer la demande
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pending/recent */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 h-fit"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Demandes récentes</h3>
          <div className="space-y-4">
            {data.documents.filter(d => d.status === "pending").map((p, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{p.type}</div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Demandé {p.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 w-fit">
                  <Clock size={12} /> En cours de traitement
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


