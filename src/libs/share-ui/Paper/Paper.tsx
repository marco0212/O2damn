import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

type PaperProps = {
  title: string;
};

export const Paper: FC<PropsWithChildren<PaperProps>> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

const Container = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 21px;
`;
