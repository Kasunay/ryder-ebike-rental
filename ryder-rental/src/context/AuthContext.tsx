import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userEmail: string | null;
  userRole: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Restore session on mount
  useEffect(() => {
    console.log("AuthProvider: Checking for stored token on mount");
    const storedToken = localStorage.getItem("authToken");
    const storedEmail = localStorage.getItem("userEmail");
    const storedRole = localStorage.getItem("userRole");

    if (storedToken) {
      console.log("AuthProvider: Found stored token, restoring session", { storedEmail, storedRole });
      setToken(storedToken);
      setUserEmail(storedEmail);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    } else {
      console.log("AuthProvider: No stored token found");
    }
  }, []);

  const login = (authToken: string) => {
    console.log("AuthProvider: login() called with token");
    try {
      // Parse JWT to get user info
      const tokenParts = authToken.split(".");
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const email = payload.sub || "";
        const role = payload.role || "";

        console.log("AuthProvider: Parsed JWT successfully", { email, role });

        // Store in state
        setToken(authToken);
        setUserEmail(email);
        setUserRole(role);
        setIsAuthenticated(true);

        // Store in localStorage
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);
        console.log("AuthProvider: Auth state updated and saved to localStorage");
      } else {
        console.error("AuthProvider: Invalid token format, expected 3 parts, got", tokenParts.length);
      }
    } catch (error) {
      console.error("AuthProvider: Failed to parse token:", error);
    }
  };

  const logout = () => {
    console.log("AuthProvider: logout() called");
    setToken(null);
    setUserEmail(null);
    setUserRole(null);
    setIsAuthenticated(false);

    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
  };

  console.log("AuthProvider: Current state", { isAuthenticated, userEmail });

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
