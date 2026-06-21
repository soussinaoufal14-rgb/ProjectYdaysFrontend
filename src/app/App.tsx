import { useState } from "react";
import { Login } from "./components/Login";
import { Layout, Role } from "./components/Layout";

// Shared
import { Profile } from "./components/shared/Profile";
import { AIAssistant } from "./components/shared/AIAssistant";
import { Settings } from "./components/shared/Settings";

// Employee
import { EmployeeDashboard } from "./components/employee/Dashboard";
import { EmployeeActivities } from "./components/employee/Activities";
import { RequestVacation } from "./components/employee/RequestVacation";
import { RequestDocument } from "./components/employee/RequestDocument";
import { MyDocuments } from "./components/employee/MyDocuments";
import { OnboardingJourney } from "./components/employee/OnboardingJourney";

// HR
import { HRDashboard } from "./components/hr/Dashboard";
import { EmployeeDirectory } from "./components/hr/EmployeeDirectory";
import { EmployeeDetail } from "./components/hr/EmployeeDetail";
import { EmployeeAccountManagement } from "./components/hr/EmployeeAccountManagement";
import { DocumentLibrary } from "./components/hr/DocumentLibrary";
import { RequestReview as HRRequestReview } from "./components/hr/RequestReview";
import { AISupervision } from "./components/hr/AISupervision";

// Manager
import { ManagerDashboard } from "./components/manager/Dashboard";
import { Team } from "./components/manager/Team";
import { TeamRiskAlerts } from "./components/manager/TeamRiskAlerts";
import { RequestReview as ManagerRequestReview } from "./components/hr/RequestReview";

const defaultPages: Record<Role, string> = {
  employee: "dashboard",
  hr: "dashboard",
  manager: "dashboard",
};

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [page, setPage] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: number;
    name: string;
    role: string;
    dept: string;
    email: string;
    phone: string;
    status: string;
    since: string;
  } | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<{
    name: string;
    role: string;
    email: string;
    phone: string;
    perf: number;
    presence: number;
    vacation: number;
    status: string;
    risk: string;
  } | null>(null);

  const renderPage = (role: Role, page: string, navigate: (p: string) => void) => {
    // Shared across roles
    if (page === "profile") {
      const profileBack = role === "manager" && selectedTeamMember
        ? () => {
            setSelectedTeamMember(null);
            navigate("team");
          }
        : undefined;

      return <Profile role={role} employee={selectedTeamMember ?? undefined} onBack={profileBack} />;
    }
    if (page === "ai-assistant") {
      return <AIAssistant role={role} isDrawer={false} />;
    }
    if (page === "settings") return <Settings role={role} />;

    if (role === "employee") {
      switch (page) {
        case "dashboard": return <EmployeeDashboard onNavigate={navigate} />;
        case "activities": return <EmployeeActivities onBack={() => navigate("dashboard")} />;
        case "request-vacation": return <RequestVacation />;
        case "request-document": return <RequestDocument />;
        case "my-documents": return <MyDocuments />;
        case "onboarding": return <OnboardingJourney />;
      }
    }

    if (role === "hr") {
      switch (page) {
        case "dashboard": return <HRDashboard onNavigate={navigate} />;
        case "employee-directory": return <EmployeeDirectory onViewDetail={(employee) => {
          setSelectedEmployee(employee);
          navigate("employee-detail");
        }} />;
        case "employee-detail": return <EmployeeDetail employee={selectedEmployee} onBack={() => navigate("employee-directory")} />;
        case "employee-account": return <EmployeeAccountManagement />;
        case "document-library": return <DocumentLibrary />;
        case "request-review": return <HRRequestReview />;
        case "ai-supervision": return <AISupervision />;
      }
    }

    if (role === "manager") {
      switch (page) {
        case "dashboard": return <ManagerDashboard />;
        case "team": return <Team onViewProfile={(member) => {
          setSelectedTeamMember(member);
          navigate("profile");
        }} />;
        case "request-vacation": return <RequestVacation />;
        case "request-review": return <ManagerRequestReview />;
        case "risk-alerts": return <TeamRiskAlerts />;
      }
    }

    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-3">🚧</div>
          <p className="font-medium" style={{ color: "#1A2540" }}>Page en développement</p>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>Cette fonctionnalité sera disponible prochainement.</p>
        </div>
      </div>
    );
  };

  const handleLogin = (r: Role) => {
    setRole(r);
    setPage(defaultPages[r]);
  };

  const handleLogout = () => {
    setRole(null);
    setPage("dashboard");
    setSelectedEmployee(null);
    setSelectedTeamMember(null);
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout role={role} currentPage={page} onNavigate={setPage} onLogout={handleLogout}>
      {renderPage(role, page, setPage)}
    </Layout>
  );
}

export default App;
