import { bind } from "@libs/util-structure";
import styled, { keyframes } from "styled-components";
import { useComboIndicator } from "./useComboIndicator";

export const ComboIndicator = bind(
  useComboIndicator,
  ({ combo, latestStat, isHit, isMiss }) => {
    if (isMiss) {
      return (
        <Container key={Math.random()}>
          <Stat>miss</Stat>
        </Container>
      );
    }

    if (isHit) {
      return (
        <Container key={Math.random()}>
          <Stat>{latestStat}</Stat>
          <Combo>{combo}</Combo>
        </Container>
      );
    }

    return null;
  }
);

const bounceIn = keyframes`
  0% {
    transform: translateY(-20px);
  }
  20% {
    transform: translateY(0px);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 75px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: white;
  text-align: center;
  justify-content: center;
  animation: ${bounceIn} 1s ease-out forwards;
`;

const Stat = styled.span`
  display: block;
  font-size: 35px;
  text-transform: capitalize;
`;

const Combo = styled.span`
  display: block;
  font-size: 40px;
  letter-spacing: 4px;
`;
