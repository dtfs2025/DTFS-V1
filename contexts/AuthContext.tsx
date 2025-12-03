
import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { User, UserRole, Permission, RolePermissions } from '../types.ts';
import { USERS, PERMISSION_MATRIX } from '../constants.tsx';

interface SocialProfile {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: Omit<User, 'permissions'>[];
  login: (userId: string, rememberMe?: boolean) => void;
  loginWithSocial: (provider: 'google' | 'apple') => Promise<{ status: 'success' | 'new_user', user?: User, socialData?: SocialProfile }>;
  logout: () => void;
  register: (details: { name: string; email: string; role: UserRole; avatar?: string }) => void;
  completeKyc: () => void;
  hasPermission: (permission: Permission) => boolean;
  rolePermissions: RolePermissions;
  togglePermission: (role: UserRole, permission: Permission) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Omit<User, 'permissions'>[]>(Object.values(USERS));
  // Initialize dynamic permissions from the constant matrix
  const [rolePermissions, setRolePermissions] = useState<RolePermissions>(PERMISSION_MATRIX);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((userId: string, rememberMe = false) => {
    const userToLogin = users.find(u => u.id === userId);
    if (userToLogin) {
      // Calculate permissions based on the CURRENT state of rolePermissions
      const permissions = new Set(rolePermissions[userToLogin.role]);
      setCurrentUser({ ...userToLogin, permissions });
      if (rememberMe) {
        localStorage.setItem('rememberedUserId', userId);
      }
    }
  }, [rolePermissions, users]);

  // Simulate Social Login Provider (Google/Apple)
  const loginWithSocial = useCallback(async (provider: 'google' | 'apple'): Promise<{ status: 'success' | 'new_user', user?: User, socialData?: SocialProfile }> => {
        // 1. Simulate network delay for OAuth popup
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 2. Mock Data returned from Provider
        const mockSocialUser: SocialProfile = {
            id: provider === 'google' ? 'soc_goog_123' : 'soc_apl_456',
            name: provider === 'google' ? 'Alex Taylor' : 'Jordan Lee',
            email: provider === 'google' ? 'alex.taylor@gmail.com' : 'jordan.lee@icloud.com',
            avatar: provider === 'google' 
                ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop' 
                : 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop'
        };

        // 3. Check if user already exists in our DB
        const existingUser = users.find(u => u.email === mockSocialUser.email);

        if (existingUser) {
            login(existingUser.id);
            // Return constructed user object
            return { 
                status: 'success', 
                user: { 
                    ...existingUser, 
                    permissions: new Set(rolePermissions[existingUser.role]) 
                } 
            };
        } else {
            // 4. Return new user data so frontend can ask for Role
            return { status: 'new_user', socialData: mockSocialUser };
        }
  }, [users, login, rolePermissions]);

  useEffect(() => {
    try {
        const rememberedUserId = localStorage.getItem('rememberedUserId');
        if (rememberedUserId) {
            login(rememberedUserId, true); // Keep them remembered
        }
    } catch (error) {
        console.error("Could not access local storage:", error);
    } finally {
        setIsLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('rememberedUserId');
  }, []);

  const register = useCallback((details: { name: string; email: string; role: UserRole; avatar?: string }) => {
    const newId = `U${Date.now().toString().slice(-5)}`;
    const newUser: Omit<User, 'permissions'> = {
        id: newId,
        name: details.name,
        email: details.email,
        role: details.role,
        avatar: details.avatar || `https://i.pravatar.cc/150?u=${newId}`,
        kycCompleted: true, // Bypass KYC for simplicity in this flow
    };
    setUsers(prev => [...prev, newUser]);
    
    // Directly set currentUser to avoid race condition where 'users' state hasn't updated yet for 'login' to find it.
    // Add safety check for permissions
    const rolePerms = rolePermissions[newUser.role];
    if (!rolePerms) {
        console.warn(`Warning: No permissions definitions found for role '${newUser.role}'. Defaulting to empty permissions.`);
    }
    const permissions = new Set(rolePerms || []);
    setCurrentUser({ ...newUser, permissions });
  }, [rolePermissions]);
  
  const completeKyc = useCallback(() => {
      if (!currentUser) return;
      setUsers(prev => prev.map(u => u.id === currentUser.id ? {...u, kycCompleted: true} : u));
      setCurrentUser(prev => prev ? {...prev, kycCompleted: true} : null);
  }, [currentUser]);


  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions.has(permission);
  }, [currentUser]);

  // Dynamic Permission Toggling
  const togglePermission = useCallback((role: UserRole, permission: Permission) => {
      setRolePermissions(prev => {
          const currentPermissions = prev[role] || [];
          let newPermissions;
          
          if (currentPermissions.includes(permission)) {
              newPermissions = currentPermissions.filter(p => p !== permission);
          } else {
              newPermissions = [...currentPermissions, permission];
          }
          
          return { ...prev, [role]: newPermissions };
      });
  }, []);

  // Effect to update current user permissions if the matrix changes while they are logged in
  useEffect(() => {
    if (currentUser) {
      const permsList = rolePermissions[currentUser.role] || [];
      const latestPermissionsForRole = new Set(permsList);
      
      // Only update if permissions have actually changed to avoid infinite loops
      const hasChanged = 
        latestPermissionsForRole.size !== currentUser.permissions.size || 
        ![...latestPermissionsForRole].every(p => currentUser.permissions.has(p));

      if (hasChanged) {
        setCurrentUser(cUser => cUser ? { ...cUser, permissions: latestPermissionsForRole } : null);
      }
    }
  }, [rolePermissions, currentUser]);

  const value = useMemo(() => ({
    isAuthenticated: !!currentUser,
    user: currentUser,
    users,
    login,
    loginWithSocial,
    logout,
    register,
    completeKyc,
    hasPermission,
    rolePermissions,
    togglePermission
  }), [currentUser, users, login, loginWithSocial, logout, register, completeKyc, hasPermission, rolePermissions, togglePermission]);

  if (isLoading) {
      return (
          <div className="flex items-center justify-center h-screen bg-gray-50">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
      )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
