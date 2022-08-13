import { Scenes, useNavigatorContext } from "@libs/provider-navigator";
import { useCallback, useEffect, useMemo, useState } from "react";

enum KeyboardInterface {
  PREV = "ArrowUp",
  NEXT = "ArrowDown",
  SELECT = " ",
}

export function useMenuList() {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const { navigate } = useNavigatorContext();

  const menu = useMemo<{ name: string; path: Scenes }[]>(
    () => [{ name: "Press Space to Play", path: "list" }],
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (key === KeyboardInterface.NEXT) {
        setCurrentMenuIndex((currentMenuIndex + 1) % menu.length);
      }
      if (key === KeyboardInterface.PREV) {
        if (currentMenuIndex === 0) {
          setCurrentMenuIndex(menu.length - 1);
        } else {
          setCurrentMenuIndex((currentMenuIndex - 1) % menu.length);
        }
      }
      if (key === KeyboardInterface.SELECT) {
        navigate(menu[currentMenuIndex].path);
      }
    },
    [currentMenuIndex, menu, navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    menu,
    currentMenuIndex,
  };
}
