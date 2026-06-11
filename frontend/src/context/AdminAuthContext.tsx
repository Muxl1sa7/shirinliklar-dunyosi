import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { adminLogin, adminLogout, adminMe } from '../lib/api';

interface LoginResult {
  success: boolean;
  message?: string;
}

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminMe()
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string): Promise<LoginResult> => {
    try {
      await adminLogin(username, password);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, message: err instanceof Error ? err.message : 'Xatolik yuz berdi' };
    }
  };

  const logout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
