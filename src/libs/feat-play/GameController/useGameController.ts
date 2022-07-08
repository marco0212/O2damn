import { Engine } from "@libs/constructor-play";
import { useNavigatorContext } from "@libs/provider-navigator";
import { usePlayContext } from "@libs/provider-play";
import { useRef } from "react";
import testSong from "./temp.json";

export function useGameController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { increaseScore, increaseMissStat } = usePlayContext();
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
      onScore: increaseScore,
      onMiss: increaseMissStat,
    });

    event.currentTarget.play();
    engine.initialize(testSong);
  };

  return { canvasRef, audioRef, playSongAndStartEngine, moveToResultScene };
}
