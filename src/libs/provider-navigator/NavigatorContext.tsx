import { createContext, useContext, useMemo, useState } from "react";
import { PlayScene, ResultScene } from "../../scenes";

export type Scenes = "home" | "list" | "play" | "result";

type NavigatorContextType = {
  navigate: (to: Scenes) => void;
};

const NavigatorContext = createContext<NavigatorContextType | null>(null);

export const NavigatorProvider = () => {
  const [currentScene, setCurrentScene] = useState<Scenes>("home");

  const navigate = (to: Scenes) => {
    setCurrentScene(to);
  };

  const CurrentScene = useMemo(() => {
    switch (currentScene) {
      case "play":
        return PlayScene;
      case "result":
        return ResultScene;
      default:
        return ResultScene;
    }
  }, [currentScene]);

  return (
    <NavigatorContext.Provider value={{ navigate }}>
      <CurrentScene />
    </NavigatorContext.Provider>
  );
};

export function useNavigatorContext() {
  const context = useContext(NavigatorContext);

  if (!context) {
    throw new Error("Not found context");
  }

  return context;
}
