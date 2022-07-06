import { usePlayContext } from "@libs/provider-play";

export function useStatusBar() {
  const { status, score, playingSongTitle } = usePlayContext();
  return {
    status,
    score,
    playingSongTitle,
  };
}
