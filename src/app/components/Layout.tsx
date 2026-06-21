import { useState } from "react";
import {
  LayoutDashboard, Calendar, FileText, FolderOpen, Bot, Map, Settings,
  Users, UserCheck, BookOpen, ClipboardList, Eye, AlertTriangle,
  UserCircle, ChevronLeft, ChevronRight, LogOut, Bell, Search, Menu, X,
  Shield, Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../contexts/AppContext";
import { NotificationsPanel } from "./shared/NotificationsPanel";
import { AllNotifications } from "./shared/AllNotifications";
import imgLogo from "../../imports/image.png";

// Import AIAssistant to render it as a drawer
import { AIAssistant } from "./shared/AIAssistant";

export type Role = "employee" | "hr" | "manager";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: Record<Role, NavItem[]> = {
  employee: [
    
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "request-vacation", label: "Congés", icon: <Calendar size={18} /> },
    { id: "request-document", label: "Demande Document", icon: <FileText size={18} /> },
    { id: "my-documents", label: "Mes Documents", icon: <FolderOpen size={18} /> },
    { id: "ai-assistant", label: "Assistant IA", icon: <Bot size={18} /> },
    { id: "onboarding", label: "Onboarding", icon: <Map size={18} /> },
    { id: "settings", label: "Paramètres", icon: <Settings size={18} /> },
  ],
  hr: [
    
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "employee-directory", label: "Annuaire", icon: <Users size={18} /> },
    { id: "employee-detail", label: "Détail Employé", icon: <UserCheck size={18} /> },
    { id: "employee-account", label: "Gestion Comptes", icon: <Shield size={18} /> },
    { id: "document-library", label: "Bibliothèque Docs", icon: <BookOpen size={18} /> },
    { id: "request-review", label: "Révision Demandes", icon: <ClipboardList size={18} /> },
    { id: "ai-assistant", label: "Assistant IA", icon: <Bot size={18} /> },
    { id: "ai-supervision", label: "Supervision IA", icon: <Eye size={18} /> },
    { id: "settings", label: "Paramètres", icon: <Settings size={18} /> },
  ],
  manager: [
    
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "team", label: "Équipe", icon: <Users size={18} /> },
    { id: "request-vacation", label: "Congés", icon: <Calendar size={18} /> },
    { id: "request-review", label: "Révision Demandes", icon: <ClipboardList size={18} /> },
    { id: "risk-alerts", label: "Alertes Risques", icon: <AlertTriangle size={18} /> },
    { id: "ai-assistant", label: "Assistant IA", icon: <Bot size={18} /> },
    { id: "settings", label: "Paramètres", icon: <Settings size={18} /> },
  ],
};

const roleLabels: Record<Role, string> = {
  employee: "Employé",
  hr: "RH / Admin",
  manager: "Manager",
};

const roleIcons: Record<Role, React.ReactNode> = {
  employee: <UserCircle size={16} />,
  hr: <Building2 size={16} />,
  manager: <Shield size={16} />,
};

interface LayoutProps {
  role: Role;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function Layout({ role, currentPage, onNavigate, onLogout, children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleAiAssistant, isAiAssistantOpen, isNotificationsOpen, toggleNotifications } = useAppContext();
  
  const items = navItems[role];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-slate-200 dark:border-slate-800/50">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:bg-none dark:bg-white flex items-center justify-center shadow-md">
           <Bot size={20} className="text-white dark:text-blue-600" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">INTELLI-TALENT</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Plateforme RH IA</span>
          </motion.div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="mx-4 mt-6 mb-2 px-3 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 flex items-center gap-2 border border-blue-100 dark:border-blue-800/30">
          {roleIcons[role]}
          <span className="text-xs font-bold uppercase tracking-wider">{roleLabels[role]}</span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isAi = item.id === "ai-assistant";
          const active = isAi ? (currentPage === item.id || isAiAssistantOpen) : currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
                // Also close drawer if we navigate anywhere
                if (isAiAssistantOpen) toggleAiAssistant();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-600/90" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              } ${collapsed ? "justify-center" : "justify-start"}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`flex-shrink-0 transition-colors ${active ? "text-white" : "text-slate-400 group-hover:text-blue-500"}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && (
                <motion.span layoutId="activeDot" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800/50">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors ${collapsed ? "justify-center" : "justify-start"}`}
          title={collapsed ? "Déconnexion" : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Decorative ambient background for glassmorphism */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col flex-shrink-0 relative z-20 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center z-30 transition-colors shadow-sm"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setMobileOpen(false)} 
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-72 flex flex-col bg-white dark:bg-slate-900 shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 z-10"
              >
                <X size={18} />
              </button>
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold capitalize hidden sm:block text-slate-800 dark:text-slate-100">
              {currentPage.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleAiAssistant}
              className={`p-2.5 rounded-xl border transition-all duration-200 shadow-sm ${
                isAiAssistantOpen 
                ? "bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-700 dark:text-indigo-300" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              <Bot size={18} />
            </button>
            <button
              onClick={() => toggleNotifications()}
              className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 border-2 border-white dark:border-slate-800" />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1" />
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onNavigate('profile')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md border-2 border-white dark:border-slate-800">
                <UserCircle size={20} />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {role === "employee" ? "Marie Albert" : role === "hr" ? "Sarah Benali" : "Thomas Chen"}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{roleLabels[role]}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* AIAssistant Drawer */}
      <AnimatePresence>
        {isAiAssistantOpen && (
          <>
            {/* Backdrop for mobile only (optional, we can let user interact with page behind it on desktop) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
              onClick={toggleAiAssistant}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-l border-slate-200/50 dark:border-slate-800/50 shadow-2xl flex flex-col"
            >
              {/* Header for drawer */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 dark:bg-none dark:bg-white flex items-center justify-center text-white dark:text-blue-600 shadow-sm">
                    <Bot size={16} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">ARIA Assistant</h3>
                </div>
                <button 
                  onClick={toggleAiAssistant}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-hidden relative">
                <AIAssistant role={role} isDrawer={true} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationsPanel />
        )}
      </AnimatePresence>
      <AllNotifications />
      
    </div>
  );
}


