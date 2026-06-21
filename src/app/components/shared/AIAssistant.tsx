import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const suggestions = {
  employee: [
    "Combien de jours de congés me reste-t-il ?",
    "Comment faire une demande de document ?",
    "Quelles sont les étapes d'onboarding restantes ?",
    "Expliquez-moi ma fiche de paie",
  ],
  hr: [
    "Résumez les demandes en attente",
    "Quel est le taux d'absentéisme ce mois ?",
    "Générez un rapport d'effectif",
    "Qui a des congés cette semaine ?",
  ],
  manager: [
    "Résumez les performances de mon équipe",
    "Y a-t-il des risques de départ dans mon équipe ?",
    "Quelles demandes sont en attente de validation ?",
    "Quel est le moral de l'équipe ce trimestre ?",
  ],
};

const mockResponses = [
  "Bien sûr ! D'après vos données RH, voici ce que j'ai trouvé : vous disposez actuellement de **12 jours de congés** restants pour l'année 2026. Souhaitez-vous en planifier dès maintenant ?",
  "Voici une analyse des données disponibles : les indicateurs sont globalement positifs avec quelques points d'attention à surveiller. Je vous recommande de consulter le tableau de bord pour plus de détails.",
  "J'ai analysé votre demande. Voici les informations pertinentes extraites de la base de données RH. N'hésitez pas à me poser des questions complémentaires.",
  "Excellente question ! En tant qu'assistant IA spécialisé RH, je peux vous aider à naviguer dans les processus. Voici ce que je recommande dans ce cas précis.",
];

interface AIAssistantProps {
  role: "employee" | "hr" | "manager";
  isDrawer?: boolean;
}

export function AIAssistant({ role, isDrawer = false }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Bonjour ! Je suis **ARIA**, votre assistant IA Intelli-Talent. Je suis ici pour répondre à toutes vos questions RH et vous aider dans votre quotidien. Comment puis-je vous aider aujourd'hui ?",
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    const now = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: msg, time: now }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      }]);
      setLoading(false);
    }, 1200);
  };

  const formatContent = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const containerClass = isDrawer 
    ? "flex flex-col h-full bg-transparent" 
    : "max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-3xl p-6 shadow-xl";

  return (
    <div className={containerClass}>
      {/* Header (Only show if not in drawer, since drawer has its own header) */}
      {!isDrawer && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:bg-none dark:bg-white flex items-center justify-center text-white dark:text-blue-600 shadow-lg shadow-blue-500/30 dark:shadow-white/10">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ARIA — Assistant IA</h1>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                En ligne · Alimenté par Intelli-Talent AI
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages([{
              id: 0, role: "assistant",
              content: "Bonjour ! Je suis **ARIA**, votre assistant IA. Comment puis-je vous aider ?",
              time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            }])}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw size={16} /> <span className="hidden sm:inline">Nouvelle conversation</span>
          </button>
        </div>
      )}

      {/* Chat area */}
      <div className={`flex-1 overflow-y-auto space-y-4 mb-4 ${isDrawer ? "px-4 pt-4" : "pr-4"}`}>
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                m.role === "assistant" 
                  ? "bg-gradient-to-tr from-blue-600 to-indigo-600 dark:bg-none dark:bg-white text-white dark:text-blue-600 shadow-blue-500/20 dark:shadow-white/10" 
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}>
                {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[85%] sm:max-w-[75%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div 
                  className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === "assistant" 
                      ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700/50" 
                      : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm"
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatContent(m.content) }}
                />
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 px-1">{m.time}</span>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:bg-none dark:bg-white text-white dark:text-blue-600 flex items-center justify-center shadow-sm">
                <Bot size={16} />
              </div>
              <div className="px-4 py-4 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                <div className="flex gap-1.5 items-center h-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions & Input */}
      <div className={`mt-auto ${isDrawer ? "p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md" : ""}`}>
        {/* Quick suggestions */}
        {messages.length < 3 && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {suggestions[role].map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm"
              >
                <Sparkles size={14} className="flex-shrink-0" /> <span className="truncate">{s}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="flex gap-2 sm:gap-3 items-end">
          <div className="flex-1 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm px-4 py-3 flex gap-3 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Posez votre question RH…"
              rows={1}
              className="flex-1 resize-none outline-none text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-sm ${
              input.trim() && !loading 
                ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white hover:shadow-md hover:shadow-indigo-500/25 active:scale-95" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700"
            }`}
          >
            <Send size={18} className={input.trim() && !loading ? "ml-1" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}


