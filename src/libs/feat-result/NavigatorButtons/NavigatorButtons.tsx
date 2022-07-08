import { Button } from "@libs/share-ui";
import styled from "styled-components";

export const NavigatorButtons = () => (
  <Container>
    <Button color="primary" to="play">
      Play Again
    </Button>
    <Button color="secondary" to="list">
      Exit
    </Button>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;
