import { Mail, Phone, MapPin, Calendar, FileText, ChevronLeft, TrendingUp, Award, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const perf = [
  { month: "Jan", score: 78 }, { month: "Fév", score: 82 }, { month: "Mar", score: 79 },
  { month: "Avr", score: 88 }, { month: "Mai", score: 85 }, { month: "Jun", score: 91 },
];

const docHistory = [
  { name: "Contrat CDI", date: "15 Jan 2022", type: "Contrat" },
  { name: "Avenant 2025", date: "01 Jan 2025", type: "Contrat" },
  { name: "Attestation Mai 2026", date: "01 Jun 2026", type: "Attestation" },
];

type EmployeeDetailProps = {
  employee: {
    id: number;
    name: string;
    role: string;
    dept: string;
    email: string;
    phone: string;
    status: string;
    since: string;
  } | null;
  onBack: () => void;
};

export function EmployeeDetail({ employee, onBack }: EmployeeDetailProps) {
  if (!employee) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 p-10 text-center shadow-sm">
        <div className="text-lg font-semibold text-slate-900 dark:text-white">Aucun employé sélectionné</div>
        <div className="text-sm text-slate-500 mt-2">Veuillez retourner à l'annuaire et choisir un profil.</div>
        <button
          type="button"
          onClick={onBack}
          className="mt-6 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          Retour à l'annuaire
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-3 text-sm font-medium text-slate-200 dark:text-white hover:text-white transition-colors"
        >
          <ChevronLeft size={15} />
          Annuaire
        </button>
        <span className="text-slate-200 dark:text-white">/</span>
        <span className="text-sm font-medium text-slate-200 dark:text-white">{employee.name}</span>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <aside className="w-full xl:w-[360px] space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 shadow-sm overflow-hidden">
            <div className="h-32 bg-slate-100 dark:bg-slate-800" />
            <div className="px-6 pb-6 pt-4">
              <div className="relative">
                <div className="absolute -top-16 left-6 w-24 h-24 rounded-full border-4 border-white bg-slate-100 shadow-lg flex items-center justify-center text-slate-500">
                  <User size={36} />
                </div>
                <div className="h-12" />
              </div>
              <div className="mt-8 space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
                  <p className="text-sm text-slate-500">{employee.role} · {employee.dept}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-900">Profile overview</div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-2">
                    <span className="font-medium text-slate-700">Department</span>
                    <span>{employee.dept}</span>
                  </div>
                  <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-2">
                    <span className="font-medium text-slate-700">Joined</span>
                    <span>{employee.since}</span>
                  </div>
                  <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-2">
                    <span className="font-medium text-slate-700">Statut</span>
                    <span>{employee.status === "active" ? "Actif" : "En congé"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 shadow-sm">
            <Tabs defaultValue="personal">
              <div className="flex justify-center border-b border-slate-200 p-6">
                <TabsList className="w-full max-w-3xl justify-center">
                  <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                  <TabsTrigger value="job">Informations emploi</TabsTrigger>
                  <TabsTrigger value="salary">Informations salaire</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
              </div>
              <div className="p-6">
                <TabsContent value="personal">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Email", value: employee.email, icon: <Mail size={18} /> },
                      { label: "Téléphone", value: employee.phone, icon: <Phone size={18} /> },
                      { label: "Localisation", value: "Paris, France", icon: <MapPin size={18} /> },
                      { label: "Date de naissance", value: "12 Avr 1991", icon: <Calendar size={18} /> },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-2"><span className="text-sm font-semibold text-slate-900 dark:text-white">{item.icon}{item.label}</span></div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="job">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Rôle", value: employee.role, icon: <User size={18} /> },
                      { label: "Département", value: employee.dept, icon: <TrendingUp size={18} /> },
                      { label: "Statut", value: employee.status === "active" ? "Actif" : "En congé", icon: <Award size={18} /> },
                      { label: "Date d'entrée", value: employee.since, icon: <Calendar size={18} /> },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-2"><span className="text-sm font-semibold text-slate-900 dark:text-white">{item.icon}{item.label}</span></div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="salary">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Salaire de base", value: "€54 000", icon: <TrendingUp size={18} /> },
                      { label: "Bonus annuel", value: "€3 200", icon: <Award size={18} /> },
                      { label: "Avantages", value: "Mutuelle, RTT", icon: <User size={18} /> },
                      { label: "Dernier bulletin", value: "Mai 2026", icon: <FileText size={18} /> },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-2"><span className="text-sm font-semibold text-slate-900 dark:text-white">{item.icon}{item.label}</span></div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="documents">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Contrat", value: "CDI", icon: <FileText size={18} /> },
                      { label: "Dernier document", value: "Évaluation 2026", icon: <FileText size={18} /> },
                      { label: "Documents en attente", value: "2", icon: <Calendar size={18} /> },
                      { label: "Dernière mise à jour", value: "3 Jun 2026", icon: <FileText size={18} /> },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4">
                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-2"><span className="text-sm font-semibold text-slate-900 dark:text-white">{item.icon}{item.label}</span></div>
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-3xl border border-slate-200/80 bg-slate-50 dark:bg-slate-800 p-4">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Documents récents</div>
                    <div className="space-y-3">
                      {docHistory.map((d, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-950 p-4">
                          <FileText size={16} />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">{d.name}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500">{d.date}</div>
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">{d.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-5">
                <TrendingUp size={18} />
                Key stats
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Présence", value: "97%" },
                  { label: "Congés restants", value: "12j" },
                  { label: "Ancienneté", value: "4 ans" },
                  { label: "Score perf.", value: "91/100" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-4 text-center">
                    <div className="text-xl font-semibold text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold mb-5">
                <Award size={18} />
                Performance
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={perf}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{ background: "#1B3A6B", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="#2557A7" strokeWidth={3} dot={{ fill: "#2557A7", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}


