import { X, CheckCircle, FileText, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getMockData } from "../../services/mockData";
import { useAppContext } from "../../contexts/AppContext";

export function AllNotifications() {
  const data = getMockData();
  const { isNotificationsViewOpen, setIsNotificationsViewOpen } = useAppContext();

  if (!isNotificationsViewOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsNotificationsViewOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 m-auto max-h-[90vh] max-w-2xl w-[90vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-800/50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Toutes les notifications</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{data.activities.length} notification{data.activities.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => setIsNotificationsViewOpen(false)}
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {data.activities.length > 0 ? (
            data.activities.map((a) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ color: a.color }}>
                  {a.icon === "check" ? <CheckCircle size={20} /> : a.icon === "file" ? <FileText size={20} /> : <AlertCircle size={20} />}
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-slate-800 dark:text-slate-200">{a.text}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{a.time}</div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex items-center justify-center h-40 text-slate-500 dark:text-slate-400">
              <p className="text-lg">Aucune notification pour le moment.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200/50 dark:border-slate-800/50 p-4 flex-shrink-0">
          <button
            onClick={() => setIsNotificationsViewOpen(false)}
            className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
