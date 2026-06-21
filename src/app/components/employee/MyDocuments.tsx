import { useState } from "react";
import { Search, Download, Eye, FileText, File as FileIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../ui/utils";

const documents = [
  { name: "Bulletin de paie Mai 2026", category: "Paie", date: "01 Juin 2026", size: "245 KB", type: "PDF" },
  { name: "Bulletin de paie Avr 2026", category: "Paie", date: "01 Mai 2026", size: "242 KB", type: "PDF" },
  { name: "Contrat de travail CDI", category: "Contrats", date: "15 Jan 2022", size: "1.2 MB", type: "PDF" },
  { name: "Attestation de travail", category: "Attestations", date: "02 Juin 2026", size: "78 KB", type: "PDF" },
  { name: "Avenant salaire 2025", category: "Contrats", date: "01 Jan 2025", size: "312 KB", type: "PDF" },
  { name: "Attestation mutuelle 2026", category: "Attestations", date: "01 Jan 2026", size: "95 KB", type: "PDF" },
  { name: "Formation React - Certificat", category: "Formations", date: "15 Mai 2026", size: "180 KB", type: "PDF" },
  { name: "Entretien annuel 2025", category: "RH", date: "20 Jan 2025", size: "420 KB", type: "PDF" },
];

const categories = ["Tous", "Paie", "Contrats", "Attestations", "Formations", "RH"];

const categoryStyles: Record<string, string> = {
  Paie: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
  Contrats: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
  Attestations: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
  Formations: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/50",
  RH: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/50",
};

export function MyDocuments() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [previewDoc, setPreviewDoc] = useState<typeof documents[0] | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handlePreview = (doc: typeof documents[0]) => {
    setPreviewDoc(doc);
  };

  const handleDownload = (doc: typeof documents[0]) => {
    setDownloading(doc.name);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,JVBERi0xLjQK`;
      link.download = doc.name + ".pdf";
      link.click();
      setDownloading(null);
    }, 600);
  };

  const filtered = documents.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Tous" || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mes Documents</h1>
        <div className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {filtered.length} {filtered.length > 1 ? "documents trouvés" : "document trouvé"}
        </div>
      </div>

      {/* Search + filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un document (ex: Bulletin, Contrat)…"
              className="flex-1 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar items-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  "flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm",
                  activeCategory === c
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Documents list */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl bg-white/80 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/70 dark:border-slate-700/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20 overflow-hidden"
      >
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
              <FileIcon size={32} />
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">Aucun document trouvé</p>
            <p className="text-sm font-medium text-slate-500 mt-1">Essayez de modifier vos critères de recherche.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            <AnimatePresence>
              {filtered.map((doc, i) => {
                const style = categoryStyles[doc.category] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.2 }}
                    key={`${doc.name}-${i}`} 
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="hidden sm:flex p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800/30">
                      <FileText size={24} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between sm:block">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="sm:hidden p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                            <FileText size={16} />
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {doc.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-1">
                        <span className={cn("text-xs px-2.5 py-1 rounded-lg font-bold border shadow-sm", style)}>
                          {doc.category}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{doc.date}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{doc.size}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">{doc.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-slate-100 dark:border-slate-800/50 sm:border-0">
                      <button 
                        onClick={() => handlePreview(doc)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                        <Eye size={16} /> <span className="sm:hidden">Aperçu</span>
                      </button>
                      <button 
                        onClick={() => handleDownload(doc)}
                        disabled={downloading === doc.name}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                        <Download size={16} /> <span className="sm:hidden">{downloading === doc.name ? "..." : "Télécharger"}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Preview Dialog */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-white/40 dark:border-slate-800/50"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/50">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">{previewDoc.name}</h2>
              <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FileText size={32} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{previewDoc.name}</p>
                  <p className="text-sm text-slate-500 mt-2">Catégorie: {previewDoc.category}</p>
                  <p className="text-sm text-slate-500">Taille: {previewDoc.size} | Type: {previewDoc.type}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-6 border-t border-slate-100 dark:border-slate-800/50">
              <button onClick={() => setPreviewDoc(null)} className="flex-1 px-4 py-2 rounded-lg border font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">Fermer</button>
              <button onClick={() => { handleDownload(previewDoc); setPreviewDoc(null); }} className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Télécharger</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}


