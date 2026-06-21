import { useState } from "react";
import { Mail, Phone, Calendar, UserCircle, Search, ArrowUpDown } from "lucide-react";
import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "../ui/utils";

type TeamMember = {
  name: string;
  role: string;
  email: string;
  phone: string;
  perf: number;
  presence: number;
  vacation: number;
  status: string;
  risk: "low" | "medium" | "high";
};

const initialTeam: TeamMember[] = [
  { name: "Marie Albert", role: "Développeuse Full Stack", email: "marie.albert@it.com", phone: "+33 6 12 34 56", perf: 91, presence: 97, vacation: 12, status: "active", risk: "low" },
  { name: "Lucas Morin", role: "Chef de Projet", email: "lucas.morin@it.com", phone: "+33 6 23 45 67", perf: 85, presence: 93, vacation: 8, status: "active", risk: "low" },
  { name: "Karim Taleb", role: "DevOps Engineer", email: "karim.taleb@it.com", phone: "+33 6 34 56 78", perf: 78, presence: 88, vacation: 5, status: "active", risk: "medium" },
  { name: "Nadia Rachidi", role: "Designer UX", email: "nadia.rachidi@it.com", phone: "+33 6 45 67 89", perf: 72, presence: 81, vacation: 15, status: "leave", risk: "medium" },
  { name: "Antoine Blanc", role: "Data Analyst", email: "antoine.blanc@it.com", phone: "+33 6 56 78 90", perf: 88, presence: 95, vacation: 10, status: "active", risk: "low" },
  { name: "Sophie Bernard", role: "QA Engineer", email: "sophie.b@it.com", phone: "+33 6 67 89 01", perf: 65, presence: 79, vacation: 3, status: "active", risk: "high" },
  { name: "Omar Benali", role: "Backend Dev", email: "omar.b@it.com", phone: "+33 6 78 90 12", perf: 82, presence: 92, vacation: 9, status: "active", risk: "low" },
  { name: "Claire Petit", role: "Frontend Dev", email: "claire.p@it.com", phone: "+33 6 89 01 23", perf: 79, presence: 90, vacation: 7, status: "active", risk: "low" },
];

const riskConfig = {
  low: { label: "Faible", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-400" },
  medium: { label: "Moyen", bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-400" },
  high: { label: "Élevé", bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-400" },
};

type SortKey = "name" | "perf" | "presence" | "risk";

export function Team({ onViewProfile }: { onViewProfile?: (employee: TeamMember) => void }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc"); // Default to desc for metrics
    }
  };

  const riskValue = { high: 3, medium: 2, low: 1 };

  const filteredTeam = initialTeam
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let aVal: any = a[sortKey];
      let bVal: any = b[sortKey];
      
      if (sortKey === "risk") {
        aVal = riskValue[a.risk];
        bVal = riskValue[b.risk];
      }
      
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mon Équipe</h1>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un membre..."
            className="text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total effectif", value: initialTeam.length, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" },
          { label: "En poste", value: initialTeam.filter((m) => m.status === "active").length, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
          { label: "En congé", value: initialTeam.filter((m) => m.status === "leave").length, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
          { label: "Présence moy.", value: `${Math.round(initialTeam.reduce((s, m) => s + m.presence, 0) / initialTeam.length)}%`, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/40" },
        ].map((s, i) => (
          <motion.div 
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl p-5 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <div className={cn("text-3xl font-extrabold mb-1", s.color)}>{s.value}</div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Data Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
              <TableRow className="border-slate-200 dark:border-slate-700/50">
                <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                    Collaborateur <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Contact</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("perf")}>
                  <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 justify-center">
                    Performance <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("presence")}>
                  <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 justify-center">
                    Présence <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("risk")}>
                  <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 justify-center">
                    Risque RH <ArrowUpDown size={14} className="opacity-50" />
                  </div>
                </TableHead>
                <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeam.map((m) => {
                const risk = riskConfig[m.risk];
                return (
                  <TableRow key={m.name} className="border-slate-100 dark:border-slate-800/50 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <TableCell>
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr from-blue-600 to-indigo-600 flex-shrink-0 shadow-sm">
                          <UserCircle size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            {m.name}
                            {m.status === "leave" && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">Congé</span>}
                          </div>
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{m.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium"><Mail size={12} /> {m.email}</div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium"><Phone size={12} /> {m.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn("text-base font-black", m.perf >= 85 ? "text-emerald-600 dark:text-emerald-400" : m.perf >= 75 ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400")}>
                        {m.perf}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-[100px] mx-auto">
                        <div className="flex justify-between text-xs mb-1 font-bold text-slate-700 dark:text-slate-300">
                          <span>{m.presence}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-600 dark:bg-blue-500 transition-all" style={{ width: `${m.presence}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border border-transparent shadow-sm", risk.bg, risk.text, "group-hover:border-current/20 transition-colors")}>
                        {risk.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => onViewProfile?.(m)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-sm"
                      >
                        Profil
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredTeam.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500 font-medium">
                    Aucun membre trouvé pour cette recherche.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}


