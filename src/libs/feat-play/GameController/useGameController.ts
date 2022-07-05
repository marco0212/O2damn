import { Engine } from "@libs/constructor-play";
import { useEffect, useRef } from "react";

export function useGameController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const engine = new Engine(canvasElement);
    const max = window.engine.keys.length;
    const maxTime = 3;

    const tempNotes = new Array(1).fill(null).map((_) => {
      const maxKeyRandomIndex = Math.floor(Math.random() * max);

      return {
        time: parseFloat((Math.random() * maxTime).toFixed(1)),
        key: window.engine.keys[maxKeyRandomIndex],
      };
    });

    engine.initialize(tempNotes);
  }, []);

  return { canvasRef };
}
