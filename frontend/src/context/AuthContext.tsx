import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  getCustomerMe,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  type CustomerUser,
  type LoginPayload,
  type RegisterPayload,
} from '../lib/api';

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextValue {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  register: (data: RegisterPayload) => Promise<AuthResult>;
  login: (data: LoginPayload) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomerMe()
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (data: RegisterPayload): Promise<AuthResult> => {
    try {
      const result = await registerCustomer(data);
      setUser(result.user ?? null);
      return { success: true };
    } catch (err) {
      return { success: false, message: err instanceof Error ? err.message : 'Xatolik yuz berdi' };
    }
  };

  const login = async (data: LoginPayload): Promise<AuthResult> => {
    try {
      const result = await loginCustomer(data);
      setUser(result.user ?? null);
      return { success: true };
    } catch (err) {
      return { success: false, message: err instanceof Error ? err.message : 'Xatolik yuz berdi' };
    }
  };

  const logout = async () => {
    await logoutCustomer();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
