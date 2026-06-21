import { Mail, Phone, MapPin, Calendar, Briefcase, Home, User, ArrowLeft } from "lucide-react";
import { Role } from "../Layout";
import { motion } from "motion/react";

type ProfileEmployee = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location?: string;
  startDate?: string;
  perf?: number;
  presence?: number;
  vacation?: number;
};

interface ProfileProps {
  role: Role;
  employee?: ProfileEmployee;
  onBack?: () => void;
}

const profiles = {
  employee: {
    name: "Marie Albert",
    title: "Développeuse Full Stack",
    department: "Engineering",
    email: "marie.albert@intelli-talent.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    startDate: "15 Janvier 2022",
    initials: "MA",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    stats: [
      { label: "Congés restants", value: "12j" },
      { label: "Documents", value: "8" },
      { label: "Ancienneté", value: "2 ans" },
    ],
  },
  hr: {
    name: "Sarah Benali",
    title: "Responsable RH Senior",
    department: "Ressources Humaines",
    email: "sarah.benali@intelli-talent.com",
    phone: "+33 6 98 76 54 32",
    location: "Lyon, France",
    startDate: "3 Mars 2019",
    initials: "SB",
    skills: ["Recrutement", "GPEC", "Droit du travail", "Formation", "Paie"],
    stats: [
      { label: "Employés gérés", value: "124" },
      { label: "Demandes traitées", value: "37" },
      { label: "Ancienneté", value: "5 ans" },
    ],
  },
  manager: {
    name: "Thomas Chen",
    title: "Manager Engineering",
    department: "Engineering",
    email: "thomas.chen@intelli-talent.com",
    phone: "+33 6 55 44 33 22",
    location: "Paris, France",
    startDate: "10 Juin 2020",
    initials: "TC",
    skills: ["Leadership", "Agile", "Architecture", "Coaching", "Roadmap"],
    stats: [
      { label: "Membres équipe", value: "8" },
      { label: "Projets actifs", value: "3" },
      { label: "Ancienneté", value: "4 ans" },
    ],
  },
};

export function Profile({ role, employee, onBack }: ProfileProps) {
  const p = employee
    ? {
        name: employee.name,
        title: employee.role,
        department: employee.role,
        email: employee.email,
        phone: employee.phone,
        location: employee.location || "Paris, France",
        startDate: employee.startDate || "Date d'entrée inconnue",
        initials: employee.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        skills: ["Performance", "Présence", "Collaboration", "Organisation", "Projets"],
        stats: [
          { label: "Performance", value: employee.perf !== undefined ? `${employee.perf}%` : "-" },
          { label: "Présence", value: employee.presence !== undefined ? `${employee.presence}%` : "-" },
          { label: "Congés restants", value: employee.vacation !== undefined ? `${employee.vacation}j` : "-" },
        ],
      }
    : profiles[role];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <ArrowLeft size={16} /> Retour à l'équipe
        </button>
      )}
      
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        {/* Left Column: Avatar & Overview */}
        <aside className="w-full xl:w-[360px] space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="px-6 pb-6 pt-4">
              <div className="relative">
                <div className="absolute -top-16 left-2 w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <User size={40} />
                </div>
                <div className="h-12" />
              </div>
              <div className="mt-8 space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{p.name}</h1>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{p.title}</p>
                </div>
                <span className="inline-flex items-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
                  {p.department}
                </span>
              </div>

              <div className="mt-8 space-y-5">
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Aperçu du profil</div>
                <div className="grid gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{p.location}</span>
                  </div>
                  <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">Arrivée le {p.startDate}</span>
                  </div>
                  <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{p.email}</span>
                  </div>
                  <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-2">
                    <Phone size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{p.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Right Column: Details & Stats */}
        <main className="flex-1 space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-6 xl:grid-cols-2">
              {/* Home Address */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none"
              >
                <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold mb-6">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                    <Home size={18} />
                  </div>
                  Coordonnées Personnelles
                </div>
                <div className="space-y-4 text-sm">
                  {[
                    { label: "Adresse", value: "729 Luxury House King's Garden" },
                    { label: "Ville", value: "Garder City" },
                    { label: "Code Postal", value: "43203" },
                  ].map((item) => (
                    <div key={item.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_minmax(0,1fr)] border-b border-slate-100 dark:border-slate-800/50 pb-3 last:border-0 last:pb-0">
                      <div className="text-slate-500 dark:text-slate-400">{item.label}</div>
                      <div className="text-slate-900 dark:text-slate-200 font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Employment Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none"
              >
                <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold mb-6">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                    <Briefcase size={18} />
                  </div>
                  Détails Emploi
                </div>
                <div className="space-y-4 text-sm">
                  {[
                    { label: "Type de contrat", value: "Temps Plein (CDI)" },
                    { label: "ID Employé", value: "84739234" },
                    { label: "Manager", value: "Nathalie Moreau" },
                    { label: "Statut", value: "Actif" },
                  ].map((item) => (
                    <div key={item.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_minmax(0,1fr)] border-b border-slate-100 dark:border-slate-800/50 pb-3 last:border-0 last:pb-0">
                      <div className="text-slate-500 dark:text-slate-400">{item.label}</div>
                      <div className="text-slate-900 dark:text-slate-200 font-medium flex items-center gap-2">
                        {item.label === "Statut" && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {/* Key stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-5">Indicateurs clés</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700 p-4 text-center hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-3">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-3xl border border-white/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-5">Compétences</div>
                <div className="flex flex-wrap gap-2">
                  {p.skills.map((skill) => (
                    <span key={skill} className="rounded-xl bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


