import { FormEvent, useState } from "react";
import { Shield, UserPlus, Search, CheckCircle, XCircle, Key, Trash2, UserCircle } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const accounts = [
  { name: "Marie Albert", email: "marie.albert@it.com", role: "Employé", dept: "Engineering", status: "active", lastLogin: "Il y a 2h", onboarding: "on" },
  { name: "Lucas Morin", email: "lucas.morin@it.com", role: "Manager", dept: "Engineering", status: "active", lastLogin: "Il y a 1j", onboarding: "off" },
  { name: "Aïcha Diop", email: "aicha.diop@it.com", role: "Employé", dept: "Commercial", status: "active", lastLogin: "Il y a 3h", onboarding: "offboarding" },
  { name: "Pierre Durand", email: "pierre.durand@it.com", role: "Employé", dept: "Finance", status: "suspended", lastLogin: "Il y a 5j", onboarding: "off" },
  { name: "Nadia Rachidi", email: "nadia.rachidi@it.com", role: "Employé", dept: "Marketing", status: "active", lastLogin: "Il y a 1j", onboarding: "on" },
  { name: "Sarah Benali", email: "sarah.benali@it.com", role: "RH/Admin", dept: "RH", status: "active", lastLogin: "Il y a 30min", onboarding: "off" },
];

const roleColors: Record<string, { bg: string; color: string }> = {
  "Employé": { bg: "#E8EDF8", color: "#1B3A6B" },
  "Manager": { bg: "#FEF3C7", color: "#F59E0B" },
  "RH/Admin": { bg: "#D1FAE5", color: "#10B981" },
};

const roleClasses: Record<string, string> = {
  "Employé": "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200",
  "Manager": "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-200",
  "RH/Admin": "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200",
};

export function EmployeeAccountManagement() {
  const [search, setSearch] = useState("");
  const [accountState, setAccountState] = useState(accounts);

  const filtered = accountState.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.email.includes(search.toLowerCase())
  );

  const nextOnboardingState = (state: string) => {
    if (state === "off") return "on";
    if (state === "on") return "offboarding";
    return "off";
  };

  const toggleOnboarding = (index: number) => {
    setAccountState((prev) =>
      prev.map((acc, i) =>
        i === index
          ? { ...acc, onboarding: nextOnboardingState(acc.onboarding ?? "off") }
          : acc,
      ),
    );
  };

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Employé");
  const [newDept, setNewDept] = useState("Engineering");

  const handleCreateAccount = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    setAccountState((prev) => [
      {
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole,
        dept: newDept,
        status: "active",
        lastLogin: "Jamais",
        onboarding: "off",
      },
      ...prev,
    ]);
    setNewName("");
    setNewEmail("");
    setNewRole("Employé");
    setNewDept("Engineering");
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Gestion des Comptes</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-br from-slate-900 to-blue-700 text-white hover:from-slate-800 hover:to-blue-600 transition-colors">
              <UserPlus size={15} /> Créer un compte
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle>Créer un compte</DialogTitle>
              <DialogDescription>Ajoutez un nouveau collaborateur à la liste des comptes.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nom complet</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 ring-offset-background focus:ring-2 focus:ring-blue-500"
                  placeholder="Marie Albert"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Adresse e-mail</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 ring-offset-background focus:ring-2 focus:ring-blue-500"
                  placeholder="prenom.nom@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Rôle</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 ring-offset-background focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Employé</option>
                    <option>Manager</option>
                    <option>RH/Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Département</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 ring-offset-background focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Engineering</option>
                    <option>Commercial</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>RH</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <button type="button" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    Annuler
                  </button>
                </DialogClose>
                <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Enregistrer
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Comptes actifs", value: accountState.filter((a) => a.status === "active").length, type: "success" },
          { label: "Suspendus", value: accountState.filter((a) => a.status === "suspended").length, type: "danger" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-md shadow-slate-200/10 dark:shadow-slate-950/10">
            <div className={
              `text-2xl font-bold ${s.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`
            }>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white/80 dark:bg-slate-950 border-slate-200/70 dark:border-slate-700">
        <Search size={15} className="text-slate-400 dark:text-slate-300" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un compte…" className="flex-1 text-sm bg-transparent text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-md shadow-slate-200/10 dark:shadow-slate-950/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Utilisateur</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Rôle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Dernière connexion</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc, i) => {
                const rc = roleColors[acc.role] || { bg: "#F0F3FA", color: "#64748B" };
                return (
                  <tr key={i} className="border-t border-slate-200/70 dark:border-slate-800/70">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br from-slate-900 to-blue-700">
                          <UserCircle size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">{acc.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{acc.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleClasses[acc.role] ?? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}>{acc.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${acc.status === 'active' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {acc.status === "active" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {acc.status === "active" ? "Actif" : "Suspendu"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{acc.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {(() => {
                          const state = acc.onboarding ?? "off";
                          const title = state === "on" ? "Onboarding activé" : state === "offboarding" ? "Offboarding en cours" : "Onboarding désactivé";
                          const stateClasses = state === "on"
                            ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200 border border-emerald-700 dark:border-emerald-200"
                            : state === "offboarding"
                            ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200 border border-rose-700 dark:border-rose-200"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-300 dark:border-slate-700";
                          return (
                            <button
                              type="button"
                              onClick={() => toggleOnboarding(i)}
                              className={`p-1.5 rounded-lg text-sm font-medium ${stateClasses}`}
                              title={title}
                            >
                              <UserPlus size={13} />
                            </button>
                          );
                        })()}
                        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/40" title={acc.status === "active" ? "Désactiver le compte" : "Activer le compte"}><Shield size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/40" title="Changer le mot de passe"><Key size={13} /></button>
                        <button className="p-1.5 rounded-lg text-rose-500 hover:bg-red-50 dark:hover:bg-rose-900/40" title="Supprimer le compte"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


