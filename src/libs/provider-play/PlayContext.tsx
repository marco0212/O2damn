import { useCallback, useContext } from "react";
import { createContext, FC, PropsWithChildren, useState } from "react";

export type StatusLevel = "excellent" | "good" | "off beat" | "miss";

type Status = Record<StatusLevel, number>;
type PlayContextType = {
  status: Status;
  score: number;
  combo: number;
  latestStat?: StatusLevel;
  playingSongTitle?: string;
  selectSong: (songtitle: string) => void;
  increaseScore: (level: StatusLevel) => void;
  increaseMissStat: () => void;
};

const PlayContext = createContext<PlayContextType | null>(null);

export const PlayProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialStatus = {
    excellent: 0,
    good: 0,
    "off beat": 0,
    miss: 0,
  };

  const [playingSongTitle, setPlayingSongTitle] = useState<string>();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [latestStat, setLatestStat] = useState<StatusLevel>();

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

  const initialize = () => {
    setStatus(initialStatus);
    setScore(0);
    setCombo(0);
  };

  const selectSong = (songTitle: string) => {
    initialize();
    setPlayingSongTitle(songTitle);
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
        playingSongTitle,
        status,
        score,
        combo,
        latestStat,
        selectSong,
        increaseScore,
        increaseMissStat,
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
