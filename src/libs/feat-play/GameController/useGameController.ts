import { Engine } from "@libs/constructor-play";
import { useNavigatorContext } from "@libs/provider-navigator";
import { usePlayContext } from "@libs/provider-play";
import { useEffect, useRef } from "react";

export function useGameController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const engineRef = useRef<Engine | null>(null);
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
    const engine = engineRef.current;
    const audioElement = audioRef.current;

    if (!engine || !audioElement) {
      return;
    }

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
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    engineRef.current = new Engine(canvasElement, {
      delay,
      onScore: increaseScore,
      onMiss: increaseMissStat,
    });

    return () => {
      const engine = engineRef.current;
      const timer = timerRef.current;

      if (engine) {
        engine.destroy();
      }

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [increaseMissStat, increaseScore]);

  return {
    canvasRef,
    audioRef,
    playSongAndStartEngine,
    moveToResultScene,
    song,
  };
}
