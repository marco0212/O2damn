import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useGameController } from "./useGameController";

export const GameController = bind(useGameController, ({ canvasRef }) => {
  return (
    <Container>
      <Controller ref={canvasRef} />
    </Container>
  );
});

const Container = styled.div`
  grid-row: 1;
  background-color: #444b50;
`;

const Controller = styled.canvas`
  display: block;
`;
