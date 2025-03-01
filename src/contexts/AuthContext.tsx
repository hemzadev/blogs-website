"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import authService from '@/services/authService'
import { useToast } from '@/components/common/use-toast'

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  initiateOAuthLogin: (provider: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      setIsLoading(true)
      try {
        // Check if user is already authenticated
        if (authService.isAuthenticated()) {
          setUser(authService.getCurrentUser())
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear potentially corrupt auth data
        await authService.logout()
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Setup storage event listener for multi-tab synchronization
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken' || event.key === 'user') {
        if (event.newValue) {
          // Another tab logged in
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        } else {
          // Another tab logged out
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Setup token refresh interval
    const refreshInterval = setInterval(async () => {
      if (authService.isAuthenticated()) {
        try {
          await authService.refreshToken()
          // Update user data if needed
          setUser(authService.getCurrentUser())
        } catch (error) {
          console.error('Token refresh failed:', error)
          // If refresh fails, log the user out
          setUser(null)
          setIsAuthenticated(false)
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          })
        }
      }
    }, 15 * 60 * 1000) // Refresh every 15 minutes

    return () => {
      clearInterval(refreshInterval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Check for OAuth callback parameters in URL
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Only run in browser environment
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        const state = url.searchParams.get('state')
        const provider = url.searchParams.get('provider')
        
        if (code && provider) {
          setIsLoading(true)
          try {
            const response = await authService.handleOAuthCallback(provider, code)
            setUser(response.user)
            setIsAuthenticated(true)
            
            // Clean up URL parameters
            window.history.replaceState({}, document.title, window.location.pathname)
            
            toast({
              title: "Login successful",
              description: `Welcome back via ${provider}!`,
              variant: "default",
            })
          } catch (error) {
            console.error('OAuth callback error:', error)
            toast({
              title: "Login failed",
              description: "There was an error logging in with your social account",
              variant: "destructive",
            })
          } finally {
            setIsLoading(false)
          }
        }
      }
    }
    
    handleOAuthCallback()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const response = await authService.login(credentials)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await authService.register(data)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Even if the backend request fails, we still want to clear local auth data
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      setIsLoading(false)
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken()
      setUser(response.user)
      return response
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      throw error
    }
  }

  const initiateOAuthLogin = (provider: string) => {
    try {
      authService.initiateOAuthLogin(provider)
    } catch (error) {
      console.error(`${provider} login error:`, error)
      toast({
        title: `${provider} login failed`,
        description: "There was an error connecting to the provider",
        variant: "destructive",
      })
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
    initiateOAuthLogin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}