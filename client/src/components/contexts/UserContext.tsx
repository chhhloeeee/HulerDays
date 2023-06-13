import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface ContextUserType {
  isManager: boolean;
  setIsManager: Dispatch<SetStateAction<boolean>>;
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

interface UserType {
  userId: string;
  isManager: boolean;
}
export const UserContext = createContext<ContextUserType>({} as ContextUserType);

const UserContextProvider = ({ children }) => {
  const [isManager, setIsManager] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        isManager,
        setIsManager,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
