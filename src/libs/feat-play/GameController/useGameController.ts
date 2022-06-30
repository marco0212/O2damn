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

    engine.start();
  }, []);

  return { canvasRef };
}
