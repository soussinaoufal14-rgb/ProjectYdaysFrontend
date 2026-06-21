import { X, CheckCircle, FileText, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { getMockData } from "../../services/mockData";
import { useAppContext } from "../../contexts/AppContext";

export function NotificationsPanel() {
  const data = getMockData();
  const { toggleNotifications, setIsNotificationsViewOpen } = useAppContext();

  const handleViewAll = () => {
    setIsNotificationsViewOpen(true);
    toggleNotifications();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="fixed right-6 top-20 w-[360px] z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-800/50">
        <h4 className="font-bold">Notifications</h4>
        <button onClick={toggleNotifications} className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
          <X size={16} />
        </button>
      </div>
      <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
        {data.activities.map((a) => (
          <div key={a.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ color: a.color }}>
              {a.icon === "check" ? <CheckCircle size={16} /> : a.icon === "file" ? <FileText size={16} /> : <AlertCircle size={16} />}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{a.text}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{a.time}</div>
            </div>
          </div>
        ))}
        {data.activities.length === 0 && (
          <div className="text-sm text-slate-500">Aucune notification pour le moment.</div>
        )}
      </div>
      <div className="border-t border-slate-200/50 dark:border-slate-800/50 p-3">
        <button
          onClick={handleViewAll}
          className="w-full text-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
        >
          Tout voir
        </button>
      </div>
    </motion.div>
  );
}


