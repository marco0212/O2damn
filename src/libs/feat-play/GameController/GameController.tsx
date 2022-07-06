import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { ComboIndicator } from "../ComboIndicator";
import { useGameController } from "./useGameController";
import song from "../../../assets/for_my_friend.mp3";

export const GameController = bind(
  useGameController,
  ({ canvasRef, audioRef, playSongAndStartEngine }) => {
    return (
      <Container>
        <audio
          ref={audioRef}
          onCanPlay={playSongAndStartEngine}
          autoPlay
          muted={false}
        >
          <source src={song} />
        </audio>
        <Controller ref={canvasRef} />
        <ComboIndicator />
      </Container>
    );
  }
);

const Container = styled.div`
  grid-row: 1;
  background-color: #444b50;
  position: relative;
`;

const Controller = styled.canvas`
  display: block;
`;
