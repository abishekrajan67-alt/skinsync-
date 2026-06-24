import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("gb_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const userData = { email, name: email.split("@")[0] };
    localStorage.setItem("gb_user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const signup = (name, email, password) => {
    const userData = { email, name };
    localStorage.setItem("gb_user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("gb_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
