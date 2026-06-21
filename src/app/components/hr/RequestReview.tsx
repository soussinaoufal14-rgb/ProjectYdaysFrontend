import { useState } from "react";
import { CheckCircle, XCircle, Clock, Filter, Calendar, FileText, MessageSquare, UserCircle } from "lucide-react";

const initialRequests = [
  { id: 1, employee: "Marie Albert", dept: "Engineering", type: "Congés payés", detail: "10–18 Juil 2026 (7 jours)", submitted: "8 Jun 2026", status: "pending", priority: "normal" },
  { id: 2, employee: "Lucas Morin", dept: "Engineering", type: "Attestation de travail", detail: "Pour dossier bancaire", submitted: "7 Jun 2026", status: "pending", priority: "urgent" },
  { id: 3, employee: "Aïcha Diop", dept: "Commercial", type: "RTT", detail: "14 Jun 2026 (1 jour)", submitted: "6 Jun 2026", status: "approved", priority: "normal" },
  { id: 4, employee: "Pierre Durand", dept: "Finance", type: "Congé maladie", detail: "3–5 Jun 2026 (3 jours)", submitted: "3 Jun 2026", status: "approved", priority: "normal" },
  { id: 5, employee: "Karim Taleb", dept: "Engineering", type: "Sans solde", detail: "1–15 Août 2026 (11 jours)", submitted: "5 Jun 2026", status: "pending", priority: "urgent" },
  { id: 6, employee: "Sophie Martin", dept: "RH", type: "Bulletin de paie", detail: "Copie Mai 2026", submitted: "4 Jun 2026", status: "rejected", priority: "normal" },
];

const statusConfig = {
  pending: { label: "En attente", bg: "#FEF3C7", color: "#F59E0B", icon: <Clock size={12} /> },
  approved: { label: "Approuvé", bg: "#D1FAE5", color: "#10B981", icon: <CheckCircle size={12} /> },
  rejected: { label: "Refusé", bg: "#FEE2E2", color: "#EF4444", icon: <XCircle size={12} /> },
};

export function RequestReview() {
  const [filter, setFilter] = useState("all");
  const [commenting, setCommenting] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [requests, setRequests] = useState(initialRequests);

  const filtered = requests.filter((r) => filter === "all" || r.status === filter);
  const pending = requests.filter((r) => r.status === "pending").length;

  const updateRequestStatus = (id: number, status: "approved" | "rejected") => {
    setRequests((prev) => prev.map((req) => req.id === id ? { ...req, status } : req));
    if (commenting === id) {
      setCommenting(null);
      setComment("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Révision des Demandes</h1>
          {pending > 0 && (
            <p className="text-sm mt-0.5 text-amber-600 dark:text-amber-400">{pending} demande{pending > 1 ? "s" : ""} en attente de traitement</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "En attente", value: requests.filter((r) => r.status === "pending").length, type: "pending" },
          { label: "Approuvées", value: requests.filter((r) => r.status === "approved").length, type: "approved" },
          { label: "Refusées", value: requests.filter((r) => r.status === "rejected").length, type: "rejected" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-md shadow-slate-200/10 dark:shadow-slate-950/10 text-center">
            <div className={
              `text-2xl font-bold ${s.type === 'pending' ? 'text-amber-600 dark:text-amber-400' : s.type === 'approved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`
            }>{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[['all', 'Toutes'], ['pending', 'En attente'], ['approved', 'Approuvées'], ['rejected', 'Refusées']].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={
              `px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${filter === v ? 'bg-slate-900 text-white border-slate-900' : 'bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-200/70 dark:border-slate-700'}`
            }
          >
            {l}
          </button>
        ))}
      </div>

      {/* Requests list */}
      <div className="space-y-3">
        {filtered.map((req) => {
          const s = statusConfig[req.status as keyof typeof statusConfig];
          return (
            <div key={req.id} className="rounded-2xl p-5 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-md shadow-slate-200/10 dark:shadow-slate-950/10">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br from-slate-900 to-blue-700">
                    <UserCircle size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">{req.employee}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{req.dept} · Soumis le {req.submitted}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {req.priority === "urgent" && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200">URGENT</span>
                  )}
                  <span className={
                    `flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full ${req.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-200' : req.status === 'approved' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200' : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200'}`
                  }>
                    {s.icon}
                    {s.label}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl mb-3 bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center gap-2 text-sm font-medium mb-0.5 text-slate-900 dark:text-white">
                  {req.type === "Congés payés" || req.type === "RTT" || req.type === "Congé maladie" || req.type === "Sans solde"
                      ? <Calendar size={14} />
                      : <FileText size={14} />}
                  {req.type}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{req.detail}</div>
              </div>

              {req.status === "pending" && (
                <div className="space-y-3">
                  {commenting === req.id && (
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={2}
                      placeholder="Ajouter un commentaire…"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm outline-none resize-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => setCommenting(commenting === req.id ? null : req.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <MessageSquare size={12} /> Commenter
                    </button>
                    <button onClick={() => updateRequestStatus(req.id, "rejected")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ml-auto bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors">
                      <XCircle size={13} /> Refuser
                    </button>
                    <button onClick={() => updateRequestStatus(req.id, "approved")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors">
                      <CheckCircle size={13} /> Approuver
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


