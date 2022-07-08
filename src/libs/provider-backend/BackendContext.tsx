import { RecordService } from "@libs/constructor-service";
import { SongService } from "@libs/constructor-service/SongService";
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
};

const BackendContext = createContext<BackEndContext | null>(null);

export const BackendProvider: FC<PropsWithChildren> = ({ children }) => {
  const { current: recordService } = useRef(new RecordService());
  const { current: songService } = useRef(new SongService());

  return (
    <BackendContext.Provider
      value={{
        recordService,
        songService,
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
