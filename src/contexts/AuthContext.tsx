import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'faculty' | 'admin' | 'government';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data for different roles
const mockUsers: Record<UserRole, User> = {
  student: {
    id: '1',
    email: 'student@example.com',
    role: 'student',
    name: 'Alex Johnson'
  },
  faculty: {
    id: '2',
    email: 'faculty@example.com',
    role: 'faculty',
    name: 'Dr. Sarah Wilson'
  },
  admin: {
    id: '3',
    email: 'admin@example.com',
    role: 'admin',
    name: 'Michael Chen'
  },
  government: {
    id: '4',
    email: 'government@example.com',
    role: 'government',
    name: 'Jennifer Davis'
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email && password) {
      // Check if the email matches the expected role
      const expectedUser = mockUsers[role];
      
      if (email === expectedUser.email) {
        setUser(expectedUser);
        setIsLoading(false);
        return true;
      } else {
        // Wrong role for this email
        setIsLoading(false);
        return false;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};