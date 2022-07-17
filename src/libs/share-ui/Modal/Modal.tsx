import styled, { keyframes } from "styled-components";
import ReactDOM from "react-dom";
import { FC, useCallback, useEffect, useState } from "react";

type CloserArgs = { closeModal(): void };

type ModalProps = {
  opened?: boolean;
  onClose?(): void;
  title: string;
  children:
    | React.ReactNode
    | React.ReactNode[]
    | ((closerArgs: CloserArgs) => React.ReactNode);
};

export const Modal: FC<ModalProps> = ({
  opened: openedProp,
  title,
  children,
  onClose,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = useCallback(() => {
    setIsOpened(true);
  }, [setIsOpened]);

  const closeModal = useCallback(() => {
    onClose?.();
    setIsOpened(false);
  }, [onClose, setIsOpened]);

  useEffect(() => {
    if (openedProp === undefined) {
      return;
    }

    if (openedProp) {
      openModal();
    } else {
      closeModal();
    }
  }, [openedProp, openModal, closeModal]);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeModal} />
      <Container>
        <header className="mb-40">
          <Title>{title}</Title>
        </header>
        <div>
          {typeof children === "function" ? children({ closeModal }) : children}
        </div>
      </Container>
    </>,
    document.getElementById("portal") as Element
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(0px)
  }

  to {
    transform: translateY(-600px)
  }
`;

const Container = styled.div`
  animation: ${slideIn} 0.5s forwards;
  position: fixed;
  bottom: -600px;
  left: 0;
  right: 0;
  max-width: 640px;
  width: 100%;
  background-color: white;
  margin: auto;
  border-radius: 10px 10px 0 0;
  padding: 30px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 21px;
`;
