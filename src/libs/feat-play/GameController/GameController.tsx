import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { ComboIndicator } from "../ComboIndicator";
import { useGameController } from "./useGameController";

export const GameController = bind(
  useGameController,
  ({
    canvasRef,
    audioRef,
    song,
    playSongAndStartEngine,
    moveToResultScene,
  }) => {
    if (!song) {
      return null;
    }

    return (
      <Container>
        <audio
          ref={audioRef}
          onCanPlay={playSongAndStartEngine}
          onEnded={moveToResultScene}
          muted={false}
        >
          <source src={song.file} />
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
