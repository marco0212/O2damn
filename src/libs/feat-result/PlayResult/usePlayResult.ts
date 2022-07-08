import { usePlayContext } from "@libs/provider-play";

export function usePlayResult() {
  const { status, score } = usePlayContext();
  return { status, score };
}
