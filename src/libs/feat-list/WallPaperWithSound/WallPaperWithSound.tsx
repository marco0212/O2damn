import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useWallPaperWithSound } from "./useWallPaperWithSound";

export const WallPaperWithSound = bind(
  useWallPaperWithSound,
  ({ currentSong }) => {
    if (!currentSong) {
      return null;
    }

    return (
      <>
        <WallPaper src={currentSong.thumbnail} />
        <Sound autoPlay src={currentSong.file}>
          Your browser does not support the audio element.
        </Sound>
      </>
    );
  }
);

const WallPaper = styled.div<{ src: string }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(${(props) => props.src}) no-repeat center center / cover;
  z-index: -1;
  &:after {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Sound = styled.audio``;
