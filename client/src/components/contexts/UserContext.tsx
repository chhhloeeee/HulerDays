import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ContextUserType {
  isManager: boolean;
  setIsManager: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}
export const UserContext = createContext<ContextUserType>(
  {} as ContextUserType
);

const UserContextProvider = ({ children }) => {
  const [isManager, setIsManager] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider
      value={{
        isManager,
        setIsManager,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
