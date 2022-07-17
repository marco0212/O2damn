import { Button } from "@libs/share-ui";
import styled from "styled-components";

export const NavigatorButtons = () => (
  <Container>
    <Button color="secondary" fill to="list">
      Home
    </Button>
    <Button color="secondary" fill to="play">
      Retry
    </Button>
    <Button color="secondary" fill disabled>
      Feedback
    </Button>
    <Button color="secondary" fill disabled>
      Share
    </Button>
  </Container>
);

const Container = styled.div`
  flex: 1;
  display: flex;
  gap: 15px;
`;
