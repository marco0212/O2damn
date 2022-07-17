import { Scenes, useNavigatorContext } from "@libs/provider-navigator";
import { FC, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  color: "primary" | "secondary";
  to?: Scenes;
  loading?: boolean;
  disabled?: boolean;
  fill?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  color: colorProps,
  onClick: onClickProps,
  disabled,
  loading,
  to,
  fill,
  children,
}) => {
  const color = {
    primary: "#1f4068",
    secondary: "#2a3a52",
  }[colorProps];

  const { navigate } = useNavigatorContext();

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (to) {
      navigate(to);
      return;
    }

    if (onClickProps) {
      onClickProps(event);
      return;
    }
  };

  return (
    <Container
      onClick={onClick}
      disabled={loading || disabled}
      color={color}
      fill={fill}
    >
      {children}
    </Container>
  );
};

const Container = styled.button<{ color: string; fill?: boolean }>`
  border: 0;
  padding: 0 30px;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  color: #fff;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  cursor: pointer;

  ${(props) =>
    props.fill &&
    css`
      display: block;
      width: 100%;
    `}

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
