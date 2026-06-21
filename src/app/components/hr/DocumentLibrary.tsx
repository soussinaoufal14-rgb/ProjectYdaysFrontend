import { type ChangeEvent, useRef, useState } from "react";
import { Search, Upload, FileText, Download, Eye, Trash2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";


type DocumentItem = {
  name: string;
  category: string;
  size: string;
  date: string;
  downloads: number;
  public: boolean;
};

const initialDocuments: DocumentItem[] = [
  { name: "Règlement intérieur 2026", category: "Politiques", size: "1.2 MB", date: "01 Jan 2026", downloads: 87, public: true },
  { name: "Charte informatique", category: "Politiques", size: "456 KB", date: "15 Mar 2025", downloads: 64, public: true },
  { name: "Modèle contrat CDI", category: "Modèles", size: "234 KB", date: "05 Avr 2026", downloads: 23, public: false },
  { name: "Grille salariale 2026", category: "Finance", size: "890 KB", date: "01 Jan 2026", downloads: 12, public: false },
  { name: "Procédure onboarding", category: "Procédures", size: "567 KB", date: "20 Fév 2026", downloads: 45, public: false },
  { name: "Modèle attestation de travail", category: "Modèles", size: "78 KB", date: "10 Jan 2026", downloads: 112, public: true },
  { name: "Guide entretien annuel", category: "Procédures", size: "340 KB", date: "15 Déc 2025", downloads: 38, public: false },
  { name: "Politique RGPD RH", category: "Politiques", size: "720 KB", date: "01 Jun 2025", downloads: 29, public: true },
];

const categories = ["Tous", "Politiques", "Modèles", "Procédures", "Finance"];

const catColors: Record<string, { bg: string; color: string }> = {
  Politiques: { bg: "#E8EDF8", color: "#1B3A6B" },
  Modèles: { bg: "#D1FAE5", color: "#10B981" },
  Procédures: { bg: "#FEF3C7", color: "#F59E0B" },
  Finance: { bg: "#FEE2E2", color: "#EF4444" },
};

export function DocumentLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [docs, setDocs] = useState<DocumentItem[]>(initialDocuments);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filtered = docs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Tous" || d.category === category;
    return matchSearch && matchCat;
  });

  const openFileDialog = () => fileInputRef.current?.click();

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setDocs((current) => [
      {
        name: file.name,
        category: "Importé",
        size: `${(file.size / 1024).toFixed(1)} KB`,
        date: new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()),
        downloads: 0,
        public: false,
      },
      ...current,
    ]);

    setImportMessage(`Document importé : ${file.name}`);
    event.target.value = "";
  };

  const handleDownload = (doc: DocumentItem) => {
    const blob = new Blob([`Contenu du fichier: ${doc.name}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = doc.name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    setDocs((current) =>
      current.map((item) =>
        item === doc ? { ...item, downloads: item.downloads + 1 } : item,
      ),
    );
  };

  const handlePreview = (doc: DocumentItem) => {
    setSelectedDoc(doc);
  };

  const closePreview = () => {
    setSelectedDoc(null);
  };


  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleImport} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Bibliothèque de Documents</h1>
          {importMessage && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{importMessage}</p>
          )}
        </div>
        <button
          type="button"
          onClick={openFileDialog}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-sky-700 hover:to-indigo-700"
        >
          <Upload size={15} /> Importer
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Documents total", value: docs.length },
          { label: "Publics", value: docs.filter((d) => d.public).length },
          { label: "Internes", value: docs.filter((d) => !d.public).length },
          { label: "Téléchargements", value: docs.reduce((s, d) => s + d.downloads, 0) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-sm shadow-slate-200/40 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-slate-950/20">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 items-center gap-2 rounded-xl border border-slate-200/70 bg-white/90 px-4 py-2.5 dark:border-slate-800/70 dark:bg-slate-950/80 sm:flex">
          <Search size={15} className="text-slate-400 dark:text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un document…"
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 rounded-xl border px-3 py-2 text-xs font-medium transition ${category === c ? "border-transparent bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-950" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-sm shadow-slate-200/40 dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-slate-950/20">
        {filtered.map((doc, i) => {
          const cat = catColors[doc.category] || { bg: "#F0F3FA", color: "#64748B" };
          return (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-slate-200/70 px-4 py-4 transition hover:bg-slate-50 dark:border-slate-800/70 dark:bg-slate-950/80 dark:hover:bg-slate-900/80"
            >
              <FileText size={18} className="text-slate-500 dark:text-slate-400" />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{doc.name}</span>
                  {doc.public && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">Public</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-full px-2 py-1 font-medium" style={{ background: cat.bg, color: cat.color }}>
                    {doc.category}
                  </span>
                  <span>{doc.date} · {doc.size} · {doc.downloads} téléch.</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePreview(doc)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                  title="Prévisualiser"
                >
                  <Eye size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                  title="Télécharger"
                >
                  <Download size={15} />
                </button>
                <button className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-900/50" title="Supprimer">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={Boolean(selectedDoc)} onOpenChange={closePreview}>
        <DialogContent className="sm:max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/70 dark:border-slate-800/70">
          <DialogHeader>
            <DialogTitle>Prévisualisation du document</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              Détails et actions pour ce document.
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-4 pt-4">
              <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-950 dark:text-slate-100">
                <div className="text-sm text-slate-500 dark:text-slate-400">Nom du document</div>
                <div className="text-base font-semibold">{selectedDoc.name}</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-800">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Catégorie</div>
                    <div className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedDoc.category}</div>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-800">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Taille</div>
                    <div className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedDoc.size}</div>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-800">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Date</div>
                    <div className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedDoc.date}</div>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-800">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Téléchargements</div>
                    <div className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">{selectedDoc.downloads}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleDownload(selectedDoc);
                    closePreview();
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <Download size={16} className="mr-2" /> Télécharger
                </button>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    Fermer
                  </button>
                </DialogClose>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
