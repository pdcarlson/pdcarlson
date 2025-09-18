// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
// we no longer need the spinner here for the initial page load
// import Spinner from '../components/Spinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(email, password);
    const loggedInUser = await account.get();
    setUser(loggedInUser);
    return session;
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  // this block is removed so the app renders immediately
  /*
  if (loading) {
    return <Spinner />;
  }
  */

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};