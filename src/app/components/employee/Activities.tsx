import { ArrowLeft, CheckCircle, FileText, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { getMockData } from "../../services/mockData";

export function EmployeeActivities({ onBack }: { onBack: () => void }) {
  const data = getMockData();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-md bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activité</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20">
        <div className="space-y-4">
          {data.activities.map((a) => (
            <div key={a.id} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700" style={{ color: a.color }}>
                {a.icon === "check" ? <CheckCircle size={16} /> : a.icon === "file" ? <FileText size={16} /> : <AlertCircle size={16} />}
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
  );
}


