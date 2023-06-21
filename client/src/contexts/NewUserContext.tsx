import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface User {
  userId: number;
  isManager: boolean;
  holiday: number;
  token: string;
}

interface ContextUser {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const NewUserContext = createContext<ContextUser>({} as ContextUser);

const NewUserContextProvider = ({ children }) => {
  const [user, setUser] = useState<User>();

  return (
    <NewUserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </NewUserContext.Provider>
  );
};

export default NewUserContextProvider;
