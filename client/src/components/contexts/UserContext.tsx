import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ContextUserType {
  isManager: boolean;
  setIsManager: Dispatch<SetStateAction<boolean>>;
  userId: number;
  setUserId: Dispatch<SetStateAction<number>>;
  holiday: number;
  setHoliday: Dispatch<SetStateAction<number>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<ContextUserType>({} as ContextUserType);

const UserContextProvider = ({ children }) => {
  const [isManager, setIsManager] = useState(false);
  const [userId, setUserId] = useState();
  const [holiday, setHoliday] = useState();
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider
      value={{
        isManager,
        setIsManager,
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
