import React, { useState, createContext, PropsWithChildren } from "react";
import type { UserState, UserApi } from "./types";

const initState: UserState = {
  token: "",
  name: "",
  avatar: "",
  auth: "user",
};

export const UserContext = createContext<UserApi | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<UserState>(() => ({ ...initState }));

  const setUser = (user: UserState) => {
    setState((prevState) => ({ ...prevState, ...user }));
  };

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
