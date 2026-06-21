// Centralized Mock Data Service for the Employee Space

export interface VacationRequest {
  id: string;
  type: string;
  from: string;
  to: string;
  days: number;
  status: "approved" | "pending" | "rejected";
  reason?: string;
  createdAt: string;
}

export interface DocumentRequest {
  id: string;
  type: string;
  status: "available" | "pending" | "rejected";
  date: string;
  downloadUrl?: string;
}

export interface Activity {
  id: string;
  icon: "check" | "file" | "alert";
  text: string;
  time: string;
  color: string;
}

export interface PresenceData {
  month: string;
  jours: number;
}

export const mockEmployeeData = {
  profile: {
    name: "Marie Albert",
    title: "Développeuse Full Stack",
    department: "Engineering",
    date: "Lundi 9 Juin 2026",
  },
  kpis: {
    vacationRemaining: 12,
    vacationTotal: 25,
    documentsCount: 8,
    documentsRecent: 3,
    hoursThisMonth: 168,
    extraHours: 4,
    presenceScore: 97,
  },
  presenceData: [
    { month: "Jan", jours: 20 },
    { month: "Fév", jours: 18 },
    { month: "Mar", jours: 22 },
    { month: "Avr", jours: 21 },
    { month: "Mai", jours: 19 },
    { month: "Jun", jours: 22 },
  ] as PresenceData[],
  activities: [
    { id: "1", icon: "check", text: "Demande de congés approuvée", time: "Il y a 2h", color: "#10B981" },
    { id: "2", icon: "file", text: "Attestation de travail disponible", time: "Il y a 1j", color: "#3B82F6" },
    { id: "3", icon: "alert", text: "Entretien annuel prévu le 20 juin", time: "Il y a 2j", color: "#F59E0B" },
    { id: "4", icon: "check", text: "Formation React complétée", time: "Il y a 5j", color: "#10B981" },
  ] as Activity[],
  vacationHistory: [
    { id: "v1", type: "Congés payés", from: "10 Juil 2026", to: "18 Juil 2026", days: 7, status: "approved", createdAt: "2026-06-01" },
    { id: "v2", type: "Congé maladie", from: "3 Mar 2026", to: "5 Mar 2026", days: 3, status: "approved", createdAt: "2026-03-01" },
    { id: "v3", type: "RTT", from: "14 Fév 2026", to: "14 Fév 2026", days: 1, status: "rejected", createdAt: "2026-02-05" },
    { id: "v4", type: "Congés payés", from: "23 Déc 2025", to: "31 Déc 2025", days: 7, status: "approved", createdAt: "2025-11-20" },
  ] as VacationRequest[],
  documents: [
    { id: "d1", type: "Fiche de paie Mai 2026", status: "available", date: "31 Mai 2026" },
    { id: "d2", type: "Attestation employeur", status: "pending", date: "Aujourd'hui" },
    { id: "d3", type: "Fiche de paie Avril 2026", status: "available", date: "30 Avr 2026" },
    { id: "d4", type: "Contrat de travail", status: "available", date: "15 Jan 2022" },
  ] as DocumentRequest[],
};

export const getMockData = () => mockEmployeeData;
