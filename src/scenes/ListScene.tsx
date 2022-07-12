import { SongList, WallPaperWithSound } from "@libs/feat-list";
import styled from "styled-components";

export const ListScene = () => (
  <Container>
    <SongList />
    <WallPaperWithSound />
  </Container>
);

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
