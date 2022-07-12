import { FC } from "react";
import styled, { css } from "styled-components";

type SongItemProps =
  | {
      active: boolean;
      title: string;
      artistName: string;
      artistProfile: string;
    }
  | { loading: true };

export const SongItem: FC<SongItemProps> = (props) => {
  if ("loading" in props) {
    return <Skeletons />;
  }

  const { active, title, artistName, artistProfile } = props;

  return (
    <Container active={active}>
      <Artist>
        <AritistImage src={artistProfile} alt={artistName} />
      </Artist>
      <SongDetail>
        <SongTitle>{title}</SongTitle>
        <p>{artistName}</p>
      </SongDetail>
    </Container>
  );
};

const Container = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #666;
  margin-bottom: 15px;
  transition: box-shadow 0.5s, transform 0.5s;

  ${(props) =>
    props.active &&
    css`
      background-color: #fff;
      color: #fff;
      transform: scale(1.05);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      background: rgb(0, 78, 146);
      background: linear-gradient(
        270deg,
        rgba(0, 78, 146, 1) 19%,
        rgba(0, 4, 40, 1) 100%
      );
    `}
`;

const Artist = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
`;

const AritistImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SongDetail = styled.div`
  flex: 1;
`;

const SongTitle = styled.h3`
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  max-height: 50px;
  overflow: hidden;
`;

const Skeletons = styled.li`
  margin-bottom: 15px;
  width: 100%;
  height: 100px;
  background-color: #eee;
`;
