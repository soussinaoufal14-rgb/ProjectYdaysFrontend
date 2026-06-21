export type Role = "employee" | "hr" | "manager";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

// Mock database
const MOCK_USERS: User[] = [
  { id: "1", email: "employe@entreprise.com", role: "employee", name: "Jean Employé" },
  { id: "2", email: "rh@entreprise.com", role: "hr", name: "Alice RH" },
  { id: "3", email: "manager@entreprise.com", role: "manager", name: "Paul Manager" },
];

export const authService = {
  /**
   * Simulates an authentication request
   * In a real app, this would be a POST request to an API endpoint
   */
  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate network latency
      setTimeout(() => {
        // In this mock, any password is valid as long as it's not empty
        if (!email || !password) {
          return reject(new Error("L'email et le mot de passe sont requis."));
        }

        const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (user) {
          resolve(user);
        } else {
          reject(new Error("Email ou mot de passe incorrect."));
        }
      }, 1000); // 1 second artificial delay
    });
  },

  /**
   * Helper to get the list of test users for the demo UI
   */
  getDemoUsers(): User[] {
    return MOCK_USERS;
  }
};
