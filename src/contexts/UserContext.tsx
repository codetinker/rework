import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ROLE_PERMISSIONS, AccessLog, LegacyPermission } from '@/lib/index';
import { authAPI, usersAPI, accessLogsAPI } from '@/services/api';
import { mockUsers } from '@/services/mockData';

interface UserContextType {
  currentUser: User | null;
  switchUser: (userId: string) => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  logAccess: (action: string, resource: string, success: boolean, details?: string) => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication
    const initializeUser = async () => {
      try {
        const existingUser = authAPI.getCurrentUser();
        const token = authAPI.getToken();
        
        if (existingUser && token) {
          setCurrentUser(existingUser);
          // Log access after user is set
          try {
            await logAccess('session_restore', 'system', true, 'User session restored');
          } catch (logError) {
            console.error('Failed to log session restore:', logError);
          }
        } else {
          // Fallback to mock admin user for development
          const adminUser = mockUsers?.find(u => u.role === UserRole.SUPER_ADMIN);
          if (adminUser) {
            setCurrentUser(adminUser);
            // Log access after user is set
            try {
              await logAccess('mock_login', 'system', true, 'Mock admin login for development');
            } catch (logError) {
              console.error('Failed to log mock login:', logError);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeUser();
  }, []);

  const switchUser = async (userId: string) => {
    if (!userId) {
      console.error('switchUser: userId is required');
      return;
    }

    try {
      // Try to get user from API first
      const response = await usersAPI.getById(userId);
      if (!response.error && response.data) {
        setCurrentUser(response.data);
        await logAccess('switch_user', 'system', true, `Switched to user: ${response.data.name}`);
        return;
      }
    } catch (error) {
      console.error('Failed to get user from API:', error);
    }
    
    // Fallback to mock data
    const user = mockUsers?.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      try {
        await logAccess('switch_user', 'system', true, `Switched to user: ${user.name} (mock)`);
      } catch (logError) {
        console.error('Failed to log user switch:', logError);
      }
    } else {
      console.error(`User with id ${userId} not found`);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.error) {
        await logAccess('login', 'system', false, `Login failed: ${response.error}`);
        return { success: false, error: response.error };
      }
      
      if (response.data?.user) {
        setCurrentUser(response.data.user);
        await logAccess('login', 'system', true, 'User logged in successfully');
        return { success: true };
      }
      
      return { success: false, error: 'Invalid response from server' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await logAccess('login', 'system', false, `Login error: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        await logAccess('logout', 'system', true, 'User logged out');
      }
      authAPI.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!currentUser) return false;
    
    const permissions = ROLE_PERMISSIONS[currentUser.role];
    if (!permissions) return false;
    
    const resourcePermission = permissions.find(p => p.resource === resource);
    
    return resourcePermission?.actions.includes(action as any) || false;
  };

  const logAccess = async (action: string, resource: string, success: boolean, details?: string) => {
    if (!currentUser) return;
    
    try {
      await accessLogsAPI.log({
        userId: currentUser.id,
        userName: currentUser.name,
        action,
        resource,
        success,
        details,
        ipAddress: '192.168.1.100', // Mock IP
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log access:', error);
    }
  };

  const value: UserContextType = {
    currentUser,
    switchUser,
    login,
    logout,
    hasPermission,
    logAccess,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};