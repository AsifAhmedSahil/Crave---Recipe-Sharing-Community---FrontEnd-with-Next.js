/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { IUser } from "../types";
  import { getCurrentUser } from "../services/AuthService";
  
  interface IUserContextProps {
    user: IUser | null;
    isLoading: boolean;
    setUser: (user: IUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  const UserContext = createContext<IUserContextProps | undefined>(undefined);
  const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const handleUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
      setIsLoading(false);
    };
  
    useEffect(() => {
      handleUser();
    }, [isLoading]);

    
  
    return (
      <UserContext.Provider value={{ user, isLoading, setUser, setIsLoading }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => {
    const context = useContext(UserContext);
  
    if (context === undefined) {
      throw new Error("use user must be used within the use probvider context!");
    }
  
    return context;
  };
  
  export default UserProvider;