import { usePlayContext } from "@libs/provider-play";

export function useComboIndicator() {
  const { combo, latestStat } = usePlayContext();

  const hasAnyStat = latestStat !== undefined;
  const isHit = hasAnyStat && latestStat !== "miss";
  const isMiss = latestStat === "miss";

  return { combo, hasAnyStat, latestStat, isHit, isMiss };
}
