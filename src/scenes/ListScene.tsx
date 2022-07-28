import { SongList, WallPaperWithSound } from "@libs/feat-list";
import styled from "styled-components";

const ListScene = () => (
  <Container>
    <SongList />
    <WallPaperWithSound />
  </Container>
);

export default ListScene;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
