// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: '' });

  const updateUserEmail = (email) => {
    setUser({ email });
  };

  return (
    <UserContext.Provider value={{ user, updateUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
