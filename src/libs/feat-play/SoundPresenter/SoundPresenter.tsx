import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useSoundPresenter } from "./useSoundPresenter";

export const SoundPresenter = bind(useSoundPresenter, () => {
  return <Container>SoundPresenter</Container>;
});

const Container = styled.div`
  background: #323232 no-repeat center / cover;
  grid-column: 2;
  grid-row: 1;
`;
