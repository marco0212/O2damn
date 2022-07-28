import { StatusBar, GameController, SoundPresenter } from "@libs/feat-play";
import styled from "styled-components";

const PlayScene = () => (
  <Container>
    <GameController />
    <StatusBar />
    <SoundPresenter />
  </Container>
);

export default PlayScene;

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 90px;
  grid-template-columns: 300px 1fr;
`;
