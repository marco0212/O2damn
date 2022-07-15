import { Song } from "@libs/constructor-model";
import { Note } from "@libs/constructor-model/NoteModel";
import { useBackendContext } from "@libs/provider-backend";
import { useNavigatorContext } from "@libs/provider-navigator";
import { useCallback, useContext, useMemo } from "react";
import { createContext, FC, PropsWithChildren, useState } from "react";

export type StatusLevel = "excellent" | "good" | "off beat" | "miss";

type Status = Record<StatusLevel, number>;
type PlayContextType = {
  status: Status;
  score: number;
  combo: number;
  latestStat: StatusLevel | null;
  song: Song | null;
  notes: Note[];
  selectSong: (songId: string) => void;
  increaseScore: (level: StatusLevel) => void;
  increaseMissStat: () => void;
  initializeState: () => void;
};

const PlayContext = createContext<PlayContextType | null>(null);

export const PlayProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const initialStatus = useMemo(
    () => ({
      excellent: 0,
      good: 0,
      "off beat": 0,
      miss: 0,
    }),
    []
  );

  const [status, setStatus] = useState<Status>(initialStatus);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [song, setSong] = useState<Song | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [latestStat, setLatestStat] = useState<StatusLevel | null>(null);

  const { songService } = useBackendContext();
  const { navigate } = useNavigatorContext();

  const calculateScore = (level: StatusLevel) => {
    switch (level) {
      case "excellent":
        return 100;
      case "good":
        return 80;
      case "off beat":
        return 40;
      default:
        return 0;
    }
  };

  const initializeState = useCallback(() => {
    setStatus(initialStatus);
    setLatestStat(null);
    setScore(0);
    setCombo(0);
  }, [initialStatus]);

  const selectSong = async (songId: string) => {
    const { notes, ...song } = await songService.getSongWithNote(songId);
    setSong(song);
    setNotes(notes);
    navigate("play");
  };

  const increaseScore = useCallback((level: StatusLevel) => {
    setLatestStat(level);
    setStatus((status) => ({ ...status, [level]: status[level] + 1 }));

    setCombo((prevCombo) => {
      const nextCombo = prevCombo + 1;
      setScore((prevScore) => {
        const incomingScore = calculateScore(level);
        const comboBonus = prevCombo * incomingScore * 0.5;
        return prevScore + incomingScore + comboBonus;
      });

      return nextCombo;
    });
  }, []);

  const increaseMissStat = useCallback(() => {
    setCombo(0);
    setLatestStat("miss");

    setStatus((status) => {
      const prevMiss = status.miss;
      return Object.assign({}, status, { miss: prevMiss + 1 });
    });
  }, []);

  return (
    <PlayContext.Provider
      value={{
        song,
        notes,
        status,
        score,
        combo,
        latestStat,
        selectSong,
        increaseScore,
        increaseMissStat,
        initializeState,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export function usePlayContext() {
  const context = useContext(PlayContext);

  if (!context) {
    throw new Error("Not found context");
  }

  return context;
}
