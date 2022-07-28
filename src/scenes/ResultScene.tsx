import { NavigatorButtons, PlayResult, Records } from "@libs/feat-result";
import styled from "styled-components";

const ResultScene = () => (
  <Container>
    <PlayResult />
    <Records />
    <NavigatorButtons />
  </Container>
);

export default ResultScene;

const Container = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 45px;
  grid-gap: 30px;
  padding: 30px;
`;
