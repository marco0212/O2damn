import { usePlayContext } from "@libs/provider-play";

export function useStatusBar() {
  const { status, score } = usePlayContext();
  return {
    status,
    score,
  };
}
