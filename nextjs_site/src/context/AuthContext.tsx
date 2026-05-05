'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  handleGetCurrentUser, 
  handleSignOut, 
  isUserAdmin 
} from '../lib/auth';
import { AuthUser, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { configureAmplify } from '../lib/amplify-config';
import { Hub } from 'aws-amplify/utils';

interface AuthContextType {
  user: (AuthUser & { attributes: FetchUserAttributesOutput }) | null;
  isLoading: boolean;
  isAdmin: boolean;
  googleUser: { email: string; name: string; picture?: string } | null;
  checkUserSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padLength = (4 - (base64.length % 4)) % 4;
    const paddedBase64 = base64.padEnd(base64.length + padLength, '=');
    const jsonPayload = decodeURIComponent(
      atob(paddedBase64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('[AuthContext] JWT decode error:', err);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<(AuthUser & { attributes: FetchUserAttributesOutput }) | null>(null);
  const [googleUser, setGoogleUser] = useState<{ email: string; name: string; picture?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkGoogleTokens = () => {
    let idToken = typeof window !== 'undefined' ? localStorage.getItem('cps_id_token') : null;
    
    if (!idToken && typeof document !== 'undefined') {
      const cookieMap: any = {};
      document.cookie.split(';').forEach(c => {
        const [k, v] = c.split('=');
        if (k && v) cookieMap[k.trim()] = v.trim();
      });
      idToken = cookieMap['cps_id_token'];
    }

    if (!idToken) {
      console.log('[AuthContext] No ID token found');
      return false;
    }

    const payload = decodeJwt(idToken);
    if (!payload) {
      console.error('[AuthContext] Failed to decode JWT');
      return false;
    }

    console.log('[AuthContext] JWT payload:', { email: payload.email, name: payload.name, cognito_username: payload['cognito:username'] });

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.warn('[AuthContext] ID token expired');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cps_id_token');
        document.cookie = "cps_id_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      return false;
    }

    const gUser = {
      email: payload.email || '',
      name: payload.name || payload.given_name || payload['cognito:username'] || payload.email?.split('@')[0] || 'User',
      picture: payload.picture,
    };

    console.log('[AuthContext] Setting Google user:', gUser);
    setGoogleUser(gUser);
    setIsAdmin(isUserAdmin(gUser.email));
    return true;
  };

  const checkUserSession = async () => {
    setIsLoading(true);
    try {
      const currentUser = await handleGetCurrentUser();
      if (currentUser && currentUser.userId) {
        console.log('[AuthContext] Amplify user found:', currentUser.username);
        setUser(currentUser as any);
        setGoogleUser(null);
        const email = currentUser.attributes?.email;
        setIsAdmin(!!email && isUserAdmin(email));
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log('[AuthContext] No Amplify user found, checking for Google tokens...');
    }

    const hasGoogle = checkGoogleTokens();
    if (!hasGoogle) {
      console.log('[AuthContext] No Google tokens found, clearing auth state');
      setUser(null);
      setGoogleUser(null);
      setIsAdmin(false);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cps_id_token');
      localStorage.removeItem('cps_access_token');
      document.cookie = "cps_id_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "cps_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    try { await handleSignOut(); } catch {}
    setUser(null);
    setGoogleUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    configureAmplify();
    checkUserSession();
    const sub = Hub.listen('auth', () => checkUserSession());
    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, googleUser, checkUserSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}