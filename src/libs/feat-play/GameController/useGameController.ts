import { Engine } from "@libs/constructor-play";
import { usePlayContext } from "@libs/provider-play";
import { useEffect, useRef } from "react";
import testSong from "./temp.json";

export function useGameController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { increaseScore, increaseMissStat } = usePlayContext();

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const engine = new Engine(canvasElement, {
      onScore: increaseScore,
      onMiss: increaseMissStat,
    });

    engine.initialize(testSong);
  }, [increaseScore, increaseMissStat]);

  return { canvasRef };
}
