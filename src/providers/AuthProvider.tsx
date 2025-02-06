
import { User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useState } from "react";

type AuthContextState = {
  setUser?: (user: User) => void;
  user: User | null;
};

export const AuthContext = createContext<AuthContextState>({user: null});

type Props = PropsWithChildren<{}>;

export default function AuthProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
