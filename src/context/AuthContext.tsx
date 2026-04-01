
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  handleGetCurrentUser, 
  handleSignOut, 
  isUserAdmin 
} from '../lib/auth';
import { AuthUser, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { configureAmplify } from '../lib/amplify-config';

interface AuthContextType {
  user: (AuthUser & { attributes: FetchUserAttributesOutput }) | null;
  isLoading: boolean;
  isAdmin: boolean;
  checkUserSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize Amplify on the client side
configureAmplify();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<(AuthUser & { attributes: FetchUserAttributesOutput }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserSession = async () => {
    setIsLoading(true);
    try {
      const currentUser = await handleGetCurrentUser();
      if (currentUser && currentUser.userId) {
        setUser(currentUser as any);
        const email = currentUser.attributes.email;
        if (email && isUserAdmin(email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await handleSignOut();
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, checkUserSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
