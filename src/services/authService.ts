// src/services/authService.ts
import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/auth';

// Define interfaces for API requests and responses
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Create an axios instance with default configuration
const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This allows cookies to be sent with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
authApi.interceptors.request.use(
  config => {
    // Generate or retrieve device ID from localStorage
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = `web-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('deviceId', deviceId);
    }
    config.headers['x-device-id'] = deviceId;
    
    // Add authorization header if token exists (except for login/register)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !config.url?.includes('/login') && !config.url?.includes('/register')) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Request [${config.method?.toUpperCase()}]: ${config.baseURL}${config.url}`, 
        config.params || {}, config.data || {});
    }
    
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
authApi.interceptors.response.use(
  response => {
    // Log responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Response [${response.status}]:`, 
        response.config.url, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ Response Error [${error.response?.status}]:`, 
        error.config?.url, error.response?.data || error.message);
    }
    
    // Handle specific error cases
    const originalRequest = error.config;
    
    // If error is 401 Unauthorized and not from the refresh endpoint
    if (error.response?.status === 401 && 
        originalRequest && 
        !originalRequest.url?.includes('/refresh')) {
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        
        // Request a new token
        const response = await authApi.post<AuthResponse>('/refresh', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        
        // Save the new tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        // Update the failed request's authorization header
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        }
        
        // Retry the original request
        return authApi(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear auth data and reject
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication service class
class AuthService {
  // Store the current user in memory
  private currentUser: AuthResponse['user'] | null = null;

  // Initialize auth state from localStorage on service creation
  constructor() {
    if (typeof window !== 'undefined') { // Check if running in browser
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
    }
  }

  // Register a new user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/register', userData);
      this.setAuthData(response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login with email and password
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await authApi.post<AuthResponse>('/login', credentials);
      this.setAuthData(response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Social login redirect
  initiateOAuthLogin(provider: string): void {
    // Generate a state parameter for security
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('oauthState', state);
    
    // Construct the OAuth URL with CSRF protection
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    const oauthUrl = `${API_URL}/${provider.toLowerCase()}?redirect_uri=${redirectUri}&state=${state}`;
    
    // Redirect to the OAuth provider
    window.location.href = oauthUrl;
  }

  // Handle social login callback
  async handleOAuthCallback(provider: string, code: string): Promise<AuthResponse> {
    const storedState = localStorage.getItem('oauthState');
    const urlState = new URL(window.location.href).searchParams.get('state');
    
    // Verify state parameter to prevent CSRF attacks
    if (storedState && urlState && storedState !== urlState) {
      throw new Error('OAuth state mismatch');
    }
    
    // Clear the stored state
    localStorage.removeItem('oauthState');
    
    const redirectUri = `${window.location.origin}/auth/callback`;
    const response = await authApi.get<AuthResponse>(`/${provider.toLowerCase()}/callback`, {
      params: { 
        code,
        redirect_uri: redirectUri
      }
    });
    
    this.setAuthData(response.data);
    return response.data;
  }

  // Refresh the access token
  async refreshToken(): Promise<AuthResponse> {
    // Get the stored refresh token
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Set the authorization header with the refresh token
    const response = await authApi.post<AuthResponse>('/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
    
    this.setAuthData(response.data);
    return response.data;
  }

  // Logout the user
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await authApi.post('/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if the server request fails
    } finally {
      this.clearAuthData();
    }
  }

  // Logout from all devices
  async logoutAll(): Promise<void> {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await authApi.post('/logout-all', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout from all devices error:', error);
      // Continue with local logout even if the server request fails
    } finally {
      this.clearAuthData();
    }
  }

  // Get the current authenticated user
  getCurrentUser(): AuthResponse['user'] | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUser && !!localStorage.getItem('accessToken');
  }

  // Helper to set auth data in localStorage and memory
  private setAuthData(data: AuthResponse): void {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.currentUser = data.user;
  }

  // Helper to clear auth data from localStorage and memory
  private clearAuthData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUser = null;
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;