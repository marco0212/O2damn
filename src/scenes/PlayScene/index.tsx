import { StatusBar, GameController } from "@libs/feat-play";
import styled from "styled-components";

export const PlayScene = () => {
  return (
    <Container>
      <GameController />
      <StatusBar />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 90px;
  grid-template-columns: 300px 1fr;
`;
