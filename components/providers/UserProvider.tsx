"use client";

import { UserType } from "@/interfaces/dashboard.interfaces";
import { getCookie } from "@/libs/cookies";
import { checkCookieRequest } from "@/services/auth/auth.service";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const check = async () => {
    const token = getCookie("usertoken");
    if (!token) {
      setUser(null);
      return;
    }
    const { data, status } = await checkCookieRequest(token);
    if (status === 200) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    check();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
