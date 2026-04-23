import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const mockUser: User = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  phone: '9876543210',
  addresses: [
    {
      fullName: 'Rahul Sharma',
      street: '42 MG Road, Sector 12',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      phone: '9876543210',
    },
  ],
};

const adminUser: User = {
  id: '0',
  name: 'Admin',
  email: 'admin@mudcraft.com',
  phone: '9000000000',
  addresses: [],
  isAdmin: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    if (email === 'admin@mudcraft.com') {
      setUser(adminUser);
      toast({ title: 'Welcome Admin!' });
      return true;
    }
    setUser({ ...mockUser, email });
    toast({ title: 'Welcome back!', description: 'Logged in successfully.' });
    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ ...mockUser, name, email, id: Date.now().toString() });
    toast({ title: 'Account created!', description: 'Welcome to MudCraft.' });
    return true;
  };

  const logout = () => {
    setUser(null);
    toast({ title: 'Logged out', description: 'See you soon!' });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
