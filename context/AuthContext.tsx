"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  User,
  AuthState,
  AuthAction,
  AuthContextType,
  LoginCredentials,
  RegisterData,
} from '@/types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage key
const USER_STORAGE_KEY = 'cdkeydeals_user';
const USERS_STORAGE_KEY = 'cdkeydeals_users';

// Generate unique ID
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser) as User;
        dispatch({ type: 'LOAD_USER', payload: parsedUser });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (state.user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, [state.user]);

  // Get registered users from localStorage
  const getRegisteredUsers = (): (RegisterData & { id: string; createdAt: string })[] => {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  // Save registered user to localStorage
  const saveRegisteredUser = (userData: RegisterData & { id: string; createdAt: string }) => {
    try {
      const users = getRegisteredUsers();
      users.push(userData);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  // Login function
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const users = getRegisteredUsers();
      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const userData: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'REGISTER_START' });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const users = getRegisteredUsers();
      const existingUser = users.find((u) => u.email === data.email);

      if (existingUser) {
        dispatch({ type: 'REGISTER_FAILURE' });
        return { success: false, error: 'Email already registered' };
      }

      const newUser = {
        id: generateId(),
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString(),
      };

      saveRegisteredUser(newUser);

      const userData: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };

      dispatch({ type: 'REGISTER_SUCCESS', payload: userData });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE' });
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Update user function
  const updateUser = (data: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: data });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
