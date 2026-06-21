import { useState } from "react";
import { Search, UserPlus, Mail, Phone, UserCircle, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { cn } from "../ui/utils";

const employees = [
  { id: 1, name: "Marie Albert", role: "Développeuse Full Stack", dept: "Engineering", email: "marie.albert@it.com", phone: "+33 6 12 34 56 78", status: "active", since: "Jan 2022" },
  { id: 2, name: "Lucas Morin", role: "Chef de Projet", dept: "Engineering", email: "lucas.morin@it.com", phone: "+33 6 23 45 67 89", status: "active", since: "Mar 2021" },
  { id: 3, name: "Aïcha Diop", role: "Commerciale Senior", dept: "Commercial", email: "aicha.diop@it.com", phone: "+33 6 34 56 78 90", status: "active", since: "Jun 2020" },
  { id: 4, name: "Pierre Durand", role: "Comptable", dept: "Finance", email: "pierre.durand@it.com", phone: "+33 6 45 67 89 01", status: "active", since: "Sep 2019" },
  { id: 5, name: "Nadia Rachidi", role: "Designer UX", dept: "Marketing", email: "nadia.rachidi@it.com", phone: "+33 6 56 78 90 12", status: "leave", since: "Nov 2022" },
  { id: 6, name: "Karim Taleb", role: "DevOps Engineer", dept: "Engineering", email: "karim.taleb@it.com", phone: "+33 6 67 89 01 23", status: "active", since: "Fév 2023" },
  { id: 7, name: "Sophie Martin", role: "RH Généraliste", dept: "RH", email: "sophie.martin@it.com", phone: "+33 6 78 90 12 34", status: "active", since: "Avr 2021" },
  { id: 8, name: "Antoine Blanc", role: "Data Analyst", dept: "Finance", email: "antoine.blanc@it.com", phone: "+33 6 89 01 23 45", status: "active", since: "Jul 2022" },
];

const depts = ["Tous", "Engineering", "Commercial", "Finance", "Marketing", "RH"];

const deptColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Engineering: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/50", gradient: "from-blue-600 to-indigo-600" },
  Commercial: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800/50", gradient: "from-emerald-500 to-teal-600" },
  Finance: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800/50", gradient: "from-amber-500 to-orange-500" },
  Marketing: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800/50", gradient: "from-purple-500 to-fuchsia-600" },
  RH: { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-700 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800/50", gradient: "from-rose-500 to-red-500" },
};

export type EmployeeDirectoryEmployee = {
  id: number;
  name: string;
  role: string;
  dept: string;
  email: string;
  phone: string;
  status: string;
  since: string;
};

export function EmployeeDirectory({ onViewDetail }: { onViewDetail?: (employee: EmployeeDirectoryEmployee) => void }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("Tous");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEmp, setSelectedEmp] = useState<EmployeeDirectoryEmployee | null>(null);

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "Tous" || e.dept === dept;
    return matchSearch && matchDept;
  });

  const handleOpenDetail = (emp: EmployeeDirectoryEmployee) => {
    setSelectedEmp(emp);
    onViewDetail?.(emp);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Annuaire des Employés</h1>
      </div>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-5 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm w-full">
            <Search size={18} className="text-slate-400" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, rôle..." 
              className="flex-1 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400" 
            />
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-2xl border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50">
                <SelectValue placeholder="Département" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {depts.map((d) => (
                  <SelectItem key={d} value={d} className="rounded-xl">{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/50 shadow-inner flex-shrink-0">
              <button 
                onClick={() => setViewMode("grid")}
                className={cn("p-2 rounded-xl transition-all", viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={cn("p-2 rounded-xl transition-all", viewMode === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="text-sm font-bold text-slate-500 dark:text-slate-400 px-2">
        {filtered.length} employé{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
      </div>

      {/* View Mode Content */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((emp, i) => {
              const c = deptColors[emp.dept] || deptColors["Engineering"];
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={emp.id} 
                  className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 hover:-translate-y-1 transition-all cursor-pointer group"
                  onClick={() => handleOpenDetail(emp)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm bg-gradient-to-tr", c.gradient)}>
                      <UserCircle size={28} />
                    </div>
                    <span className={cn("w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow-sm", emp.status === "active" ? "bg-emerald-500" : "bg-amber-500")} />
                  </div>
                  <div className="font-extrabold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{emp.name}</div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">{emp.role}</div>
                  <span className={cn("inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border shadow-sm", c.bg, c.text, c.border)}>
                    {emp.dept}
                  </span>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center gap-2">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"><Mail size={16} /></button>
                    <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"><Phone size={16} /></button>
                    <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase">Depuis {emp.since}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                  <TableRow className="border-slate-200 dark:border-slate-700/50">
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Employé</TableHead>
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Département</TableHead>
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300">Contact</TableHead>
                    <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((emp) => {
                    const c = deptColors[emp.dept] || deptColors["Engineering"];
                    return (
                      <TableRow key={emp.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-white/50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => handleOpenDetail(emp)}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr shadow-sm", c.gradient)}>
                                <UserCircle size={20} />
                              </div>
                              <span className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow-sm", emp.status === "active" ? "bg-emerald-500" : "bg-amber-500")} />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">{emp.name}</div>
                              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{emp.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cn("inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border shadow-sm", c.bg, c.text, c.border)}>
                            {emp.dept}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5"><Mail size={12} /> {emp.email}</div>
                            <div className="flex items-center gap-1.5"><Phone size={12} /> {emp.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            Profil
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Sheet */}
      <Sheet open={!!selectedEmp} onOpenChange={(open) => !open && setSelectedEmp(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-l-white/40 dark:border-l-slate-800/50 p-0 overflow-y-auto">
          {selectedEmp && (
            <div className="flex flex-col h-full">
              <div className="p-6 pb-0 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full" />
                <SheetHeader className="relative z-10 text-left">
                  <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white bg-gradient-to-tr shadow-lg mb-4", deptColors[selectedEmp.dept]?.gradient || "from-slate-600 to-slate-800")}>
                    <UserCircle size={40} />
                  </div>
                  <SheetTitle className="text-2xl font-extrabold">{selectedEmp.name}</SheetTitle>
                  <SheetDescription className="font-semibold text-slate-500">{selectedEmp.role}</SheetDescription>
                </SheetHeader>
              </div>
              
              <div className="p-6 space-y-6 relative z-10">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className={cn("w-2 h-2 rounded-full", selectedEmp.status === "active" ? "bg-emerald-500" : "bg-amber-500")} />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {selectedEmp.status === "active" ? "En poste" : "En congé"}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Coordonnées</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <Mail size={16} /> {selectedEmp.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <Phone size={16} /> {selectedEmp.phone}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Informations RH</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Département</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedEmp.dept}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Ancienneté</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedEmp.since}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full py-3.5 rounded-2xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                    Gérer le profil complet
                  </button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}


