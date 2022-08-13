import { Logo, MenuList } from "@libs/feat-home";
import styled from "styled-components";

const HomeScene = () => (
  <Container>
    <Logo />
    <MenuList />
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: rgb(0, 78, 146);
  background: linear-gradient(
    270deg,
    rgba(0, 78, 146, 1) 19%,
    rgba(0, 4, 40, 1) 100%
  );
`;

export default HomeScene;
