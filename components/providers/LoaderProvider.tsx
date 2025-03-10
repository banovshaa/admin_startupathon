"use client";

import { createContext, PropsWithChildren, useState } from "react";
import Loader from "../shared/Loader/Loader";

export const LoaderContext = createContext<{
  loading: boolean;
  setLoading: (value: boolean) => void;
}>({
  loading: false,
  setLoading: () => {},
});

const LoaderProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
