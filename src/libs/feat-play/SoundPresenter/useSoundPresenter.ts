import { usePlayContext } from "@libs/provider-play";
import songCover from "../../../assets/for_my_friend.jpeg";

export function useSoundPresenter() {
  const { playingSongTitle } = usePlayContext();

  return {
    songCover,
    playingSongTitle,
  };
}
