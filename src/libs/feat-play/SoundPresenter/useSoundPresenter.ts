import { usePlayContext } from "@libs/provider-play";

export function useSoundPresenter() {
  const { song } = usePlayContext();

  return {
    song,
  };
}
