import { usePlayContext } from "@libs/provider-play";

export function useStatusBar() {
  const { status, score, song } = usePlayContext();
  return {
    status,
    score,
    song,
  };
}
