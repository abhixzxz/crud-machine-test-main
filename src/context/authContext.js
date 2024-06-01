import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("authUser");
    if (user) {
      setAuthUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setAuthUser(userData);
    sessionStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setAuthUser(null);
    sessionStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
