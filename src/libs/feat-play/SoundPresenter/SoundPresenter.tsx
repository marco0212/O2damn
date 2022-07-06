import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useSoundPresenter } from "./useSoundPresenter";

export const SoundPresenter = bind(
  useSoundPresenter,
  ({ songCover, playingSongTitle }) => {
    return (
      <Container>
        <Cover src={songCover} alt={`Song ${playingSongTitle} Cover`} />
      </Container>
    );
  }
);

const Container = styled.div`
  background: #323232 no-repeat center / cover;
  grid-column: 2;
  grid-row: 1;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
