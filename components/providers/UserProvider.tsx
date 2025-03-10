"use client";

import { useRouter, usePathname } from "next/navigation";
import { UserType } from "@/interfaces/dashboard.interfaces";
import { getCookie } from "@/libs/cookies";
import { checkCookieRequest } from "@/services/auth/auth.service";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoaderContext } from "./LoaderProvider";

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
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useContext(LoaderContext);

  const check = async () => {
    const token = getCookie("usertoken");

    if (!token) {
      setUser(null);
      if (pathname !== "/auth/login" && pathname !== "/auth/register") {
        router.push("/auth/login");
      }
      return;
    }

    try {
      setLoading(true);
      const { data, status } = await checkCookieRequest(token);

      if (status === 200) {
        setUser(data);
        if (pathname === "/auth/login" || pathname === "/auth/register") {
          router.push("/");
        }
      } else {
        setUser(null);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setUser(null);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    check();
  }, [router, pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user && children}
    </UserContext.Provider>
  );
};
