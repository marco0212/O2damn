import { useListContext } from "@libs/provider-list";

export function useWallPaperWithSound() {
  const { songs, currentSongIndex } = useListContext();
  const currentSong = songs ? songs[currentSongIndex] : null;

  return { currentSong };
}
