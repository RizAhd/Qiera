import React, { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { data: user, loading, refetch } = useAppwrite<User | null, {}>({
    fn: getCurrentUser,
    
  });

  const wrappedRefetch = async (newParams?: Record<string, string | number>) => {
    await refetch(newParams || {});
  };

  const isLogged = !!user;
  console.log(JSON.stringify(user))

  return React.createElement(
    GlobalContext.Provider,
    {
      value: {
        isLogged: isLogged,
        user: user,
        loading: loading,
        refetch: wrappedRefetch,
      },
    },
    children
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};

export default GlobalProvider;
