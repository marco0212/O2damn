import { Spinner } from "@libs/share-ui";
import {
  createContext,
  FC,
  lazy,
  PropsWithChildren,
  Suspense,
  useContext,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";

export type Scenes = "home" | "list" | "play" | "result";

type NavigatorContextType = {
  currentScene: Scenes;
  navigate: (to: Scenes) => void;
};

const NavigatorContext = createContext<NavigatorContextType | null>(null);

export const NavigatorProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [currentScene, setCurrentScene] = useState<Scenes>("home");

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

const PlayScene = lazy(() => import("../../scenes/PlayScene"));
const ListScene = lazy(() => import("../../scenes/ListScene"));
const ResultScene = lazy(() => import("../../scenes/ResultScene"));

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
        return ListScene;
    }
  }, [currentScene]);

  return (
    <Suspense
      fallback={
        <FallbackContainer>
          <Spinner />
        </FallbackContainer>
      }
    >
      <CurrentScene />
    </Suspense>
  );
};

const FallbackContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
