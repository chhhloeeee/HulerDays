import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

interface ContextUserType {
  isManager: string;
  updateIsManager: (val: string) => void;
  userId: number | string;
  updateUserId: (val: number) => void;
  holiday: number | string;
  updateHoliday: (val: number) => void;
  token: string;
  updateToken: (val: string) => void;
}

export const UserContext = createContext<ContextUserType>({} as ContextUserType);

const UserContextProvider = ({ children }) => {
  const [isManager, setIsManager] = useState(typeof window !== 'undefined' ? window.localStorage.getItem('isManager') : 'false');

  // // to avoid ssr error
  // useEffect(() => {
  //   setIsManager(localStorage.getItem('isManager') === isManager.toString());
  // }, []);

  const [userId, setUserId] = useState(typeof window !== 'undefined' ? window.localStorage.getItem('userId') : 0);
  const [holiday, setHoliday] = useState(typeof window !== 'undefined' ? window.localStorage.getItem('holiday') : 0);
  const [token, setToken] = useState(typeof window !== 'undefined' ? window.localStorage.getItem('token') : '');

  const updateIsManager = (newIsManager: string) => {
    setIsManager(newIsManager);
    localStorage.setItem('isManager', newIsManager);
  };

  const updateUserId = (newUserId: number) => {
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId.toString());
  };

  const updateHoliday = (newHoliday: number) => {
    setHoliday(newHoliday);
    localStorage.setItem('holiday', newHoliday.toString());
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <UserContext.Provider
      value={{
        isManager,
        updateIsManager,
        userId,
        updateUserId,
        holiday,
        updateHoliday,
        token,
        updateToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
