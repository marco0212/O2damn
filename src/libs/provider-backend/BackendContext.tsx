import {
  RecordService,
  SongService,
  AuthService,
} from "@libs/constructor-service";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";

type BackEndContext = {
  recordService: RecordService;
  songService: SongService;
  authService: AuthService;
};

const BackendContext = createContext<BackEndContext | null>(null);

export const BackendProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { current: recordService } = useRef(new RecordService());
  const { current: songService } = useRef(new SongService());
  const { current: authService } = useRef(new AuthService());

  return (
    <BackendContext.Provider
      value={{
        recordService,
        songService,
        authService,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};

export function useBackendContext() {
  const context = useContext(BackendContext);

  if (!context) {
    throw new Error("Not found context");
  }

  return context;
}
