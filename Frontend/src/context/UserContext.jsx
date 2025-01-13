

// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a custom hook to use UserContext
export const useUser = () => useContext(UserContext);
 
// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // You can set user info here or fetch it from localStorage or an API
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
