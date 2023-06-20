import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ContextUserType {
  isManager: string;
  updateIsManager: (val: 'true' | 'false') => void;
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  holiday: number;
  setHoliday: Dispatch<SetStateAction<number>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<ContextUserType>({} as ContextUserType);

const UserContextProvider = ({ children }) => {
  const [isManager, setIsManager] = useState(typeof window !== 'undefined' ? window.localStorage.getItem('isManager') : 'false');
  const [userId, setUserId] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [token, setToken] = useState(null);

  const updateIsManager = (newIsManager: 'true' | 'false') => {
    setIsManager(newIsManager);
    localStorage.setItem('isManager', newIsManager);
  };

  return (
    <UserContext.Provider
      value={{
        isManager,
        updateIsManager,
        userId,
        setUserId,
        holiday,
        setHoliday,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
