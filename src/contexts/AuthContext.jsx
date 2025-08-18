import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('pdftools_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email}&background=3b82f6&color=fff`,
      joinDate: new Date().toISOString(),
      totalEarnings: 0,
      toolsUsed: 0
    };
    
    setUser(mockUser);
    localStorage.setItem('pdftools_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const signup = async (name, email, password) => {
    // Mock signup - in real app, this would call your API
    const mockUser = {
      id: Date.now(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=fff`,
      joinDate: new Date().toISOString(),
      totalEarnings: 0,
      toolsUsed: 0
    };
    
    setUser(mockUser);
    localStorage.setItem('pdftools_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pdftools_user');
    localStorage.removeItem('pdftools_coins');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('pdftools_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};