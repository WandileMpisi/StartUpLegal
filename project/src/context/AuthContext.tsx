import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthState, User } from '../types';
import { getFromStorage, saveToStorage, removeFromStorage, delay } from '../lib/utils';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const navigate = useNavigate();

  // Initialize auth state from storage on mount
  useEffect(() => {
    const initializeAuth = async () => {
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
        console.error('Error initializing auth:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await delay(1000);
      
      // Simple validation - in a real app, this would be handled by the backend
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
        
        toast.success('Logged in successfully');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Mock signup function - in a real app, this would make an API call
  const signup = async (fullName: string, email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      
      // Simulate API call
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
      
      toast.success('Account created successfully');
      navigate('/onboarding/step1');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = () => {
    removeFromStorage('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast.success('Logged out successfully');
    navigate('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (!state.user) return;
    
    const updatedUser = { ...state.user, ...userData };
    saveToStorage('user', updatedUser);
    
    setState((prev) => ({
      ...prev,
      user: updatedUser,
    }));
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