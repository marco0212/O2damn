import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { PlayScene, ResultScene, ListScene } from "../../scenes";

export type Scenes = "home" | "list" | "play" | "result";

type NavigatorContextType = {
  currentScene: Scenes;
  navigate: (to: Scenes) => void;
};

const NavigatorContext = createContext<NavigatorContextType | null>(null);

export const NavigatorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<Scenes>("list");

  const navigate = (to: Scenes) => {
    setCurrentScene(to);
  };

  return (
    <NavigatorContext.Provider value={{ navigate, currentScene }}>
      {children}
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

export const Switch = () => {
  const { currentScene } = useNavigatorContext();

  const CurrentScene = useMemo(() => {
    switch (currentScene) {
      case "play":
        return PlayScene;
      case "result":
        return ResultScene;
      case "list":
        return ListScene;
      default:
        return ResultScene;
    }
  }, [currentScene]);

  return <CurrentScene />;
};
