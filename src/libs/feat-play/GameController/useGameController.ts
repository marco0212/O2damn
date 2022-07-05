import { Engine } from "@libs/constructor-play";
import { usePlayContext } from "@libs/provider-play";
import { useEffect, useRef } from "react";

export function useGameController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { increaseScore, initializeCombo } = usePlayContext();

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const engine = new Engine(canvasElement, {
      onScore: increaseScore,
      onMiss: initializeCombo,
    });
    const max = window.engine.keys.length;
    const maxTime = 10;

    const tempNotes = new Array(10).fill(null).map((_) => {
      const maxKeyRandomIndex = Math.floor(Math.random() * max);

      return {
        time: parseFloat((Math.random() * maxTime).toFixed(1)),
        key: window.engine.keys[maxKeyRandomIndex],
      };
    });

    engine.initialize(tempNotes);
  }, [increaseScore, initializeCombo]);

  return { canvasRef };
}
