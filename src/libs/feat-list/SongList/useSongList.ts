import { useListContext } from "@libs/provider-list";
import { usePlayContext } from "@libs/provider-play";
import { useEffect } from "react";

enum KeyboardInterface {
  PREV = "ArrowUp",
  NEXT = "ArrowDown",
  SELECT = " ",
}

export function useSongList() {
  const { loading, songs, currentSongIndex, setCurrentSongIndex } =
    useListContext();
  const { selectSong } = usePlayContext();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!songs) {
      return;
    }

    const key = event.key;
    const songLength = songs.length;

    if (key === KeyboardInterface.NEXT) {
      setCurrentSongIndex((currentSongIndex + 1) % songLength);
    }

    if (key === KeyboardInterface.PREV) {
      if (currentSongIndex === 0) {
        setCurrentSongIndex(songLength - 1);
      } else {
        setCurrentSongIndex((currentSongIndex - 1) % songLength);
      }
    }

    if (key === KeyboardInterface.SELECT) {
      const { id } = songs[currentSongIndex];
      selectSong(id);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return { loading, songs, currentSongIndex };
}
