import { useBackendContext } from "@libs/provider-backend";
import { User } from "firebase/auth";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type UserState = {
  id: string;
  name: string;
  email: string;
};

type LoginOption = { onCompleted?: () => void };

type AuthContextType = {
  user: UserState | null;
  isLoggedIn: boolean;
  login(option: LoginOption): void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(null);
  const { authService } = useBackendContext();
  const isLoggedIn = Boolean(user);

  const formatUser = (user: User): UserState => {
    const name = user.displayName ?? "Anonymous";
    const email = user.email ?? "unknown";
    const id = user.uid;

    return { id, name, email };
  };

  const login = ({ onCompleted }: LoginOption) => {
    authService.signWithGoogle((user) => {
      setUser(formatUser(user));
      onCompleted?.();
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (!user) {
        return;
      }

      setUser(formatUser(user));
    });
  }, [authService]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Not found context");
  }

  return context;
}
