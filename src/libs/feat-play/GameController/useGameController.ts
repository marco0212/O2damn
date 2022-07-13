import { Engine } from "@libs/constructor-play";
import { useNavigatorContext } from "@libs/provider-navigator";
import { usePlayContext } from "@libs/provider-play";
import { useEffect, useRef } from "react";

export function useGameController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 2000;

  const { increaseScore, increaseMissStat, initializeState, song, notes } =
    usePlayContext();
  const { navigate } = useNavigatorContext();

  const moveToResultScene = () => {
    navigate("result");
  };

  const playSongAndStartEngine = (
    event: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const canvasElement = canvasRef.current;
    const audioElement = audioRef.current;

    if (!canvasElement || !audioElement) {
      return;
    }

    const engine = new Engine(canvasElement, {
      delay,
      onScore: increaseScore,
      onMiss: increaseMissStat,
    });

    engine.initialize(notes);

    const { currentTarget } = event;

    timerRef.current = setTimeout(() => {
      currentTarget.play();
    }, delay);
  };

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  useEffect(() => {
    return () => {
      const timer = timerRef.current;
      if (timer) {
        clearTimeout(timer);
      }
    };
  });
  return {
    canvasRef,
    audioRef,
    playSongAndStartEngine,
    moveToResultScene,
    song,
  };
}
