import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase, handleSupabaseError, isSupabaseReady } from '../lib/supabase';
import { AuthState, User } from '../types';
import { getFromStorage, saveToStorage, removeFromStorage, delay } from '../lib/utils';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    if (isSupabaseReady() && supabase) {
      initializeSupabaseAuth();
    } else {
      // Fallback to localStorage for demo mode
      initializeFallbackAuth();
    }
  }, []);

  const initializeSupabaseAuth = async () => {
    if (!supabase) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      await handleAuthChange(session);

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        await handleAuthChange(session);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error initializing Supabase auth:', error);
      initializeFallbackAuth();
    }
  };

  const initializeFallbackAuth = async () => {
    try {
      const storedUser = getFromStorage<User | null>('user', null);
      if (storedUser) {
        setState({
          user: storedUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error initializing fallback auth:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const handleAuthChange = async (session: Session | null) => {
    if (session?.user && supabase) {
      try {
        // Get or create user profile
        let { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            })
            .select()
            .single();

          if (createError) {
            throw createError;
          }
          profile = newProfile;
        } else if (error) {
          throw error;
        }

        const user: User = {
          id: profile.id,
          fullName: profile.full_name,
          email: session.user.email!,
          company: profile.company || undefined,
        };

        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error handling auth change:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      
      if (isSupabaseReady() && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        toast.success('Logged in successfully');
        navigate('/dashboard');
      } else {
        // Fallback demo login
        await delay(1000);
        
        if (email === 'demo@example.com' && password === 'password') {
          const user: User = {
            id: '1',
            fullName: 'Demo User',
            email: email,
            company: 'Demo Company',
          };
          
          saveToStorage('user', user);
          
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          
          toast.success('Logged in successfully (Demo Mode)');
          navigate('/dashboard');
        } else {
          toast.error('Invalid credentials');
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(handleSupabaseError(error));
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      
      if (isSupabaseReady() && supabase) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          throw error;
        }

        toast.success('Account created successfully');
        navigate('/onboarding/step1');
      } else {
        // Fallback demo signup
        await delay(1000);
        
        const user: User = {
          id: Date.now().toString(),
          fullName,
          email,
        };
        
        saveToStorage('user', user);
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        toast.success('Account created successfully (Demo Mode)');
        navigate('/onboarding/step1');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(handleSupabaseError(error));
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseReady() && supabase) {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          throw error;
        }
      } else {
        // Fallback logout
        removeFromStorage('user');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }

      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(handleSupabaseError(error));
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!state.user) return;
    
    try {
      if (isSupabaseReady() && supabase) {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: userData.fullName,
            company: userData.company,
          })
          .eq('id', state.user.id);

        if (error) {
          throw error;
        }
      } else {
        // Fallback update
        const updatedUser = { ...state.user, ...userData };
        saveToStorage('user', updatedUser);
      }

      const updatedUser = { ...state.user, ...userData };
      setState((prev) => ({
        ...prev,
        user: updatedUser,
      }));

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Update user error:', error);
      toast.error(handleSupabaseError(error));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};