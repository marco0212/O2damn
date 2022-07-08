import { NavigatorButtons, PlayResult, Records } from "@libs/feat-result";
import styled from "styled-components";

export const ResultScene = () => {
  return (
    <Container>
      <PlayResult />
      <Records />
      <NavigatorButtons />
    </Container>
  );
};

const Container = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 30px;
  padding: 30px;
`;
