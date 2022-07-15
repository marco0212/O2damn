import { Song } from "@libs/constructor-model";
import { useBackendContext } from "@libs/provider-backend";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ListContextType = {
  loading: boolean;
  songs: Song[] | null;
  currentSongIndex: number;
  setCurrentSongIndex: Dispatch<React.SetStateAction<number>>;
};

const ListContext = createContext<ListContextType | null>(null);

export const ListProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const { songService } = useBackendContext();

  const fetchSongs = useCallback(async () => {
    setLoading(true);

    const songs = await songService.getSongs();

    setSongs(songs);
    setLoading(false);
  }, [songService]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <ListContext.Provider
      value={{ loading, songs, currentSongIndex, setCurrentSongIndex }}
    >
      {children}
    </ListContext.Provider>
  );
};

export function useListContext() {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error("Not found context");
  }

  return context;
}
