import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { Paper } from "@libs/share-ui";
import { usePlayResult } from "./usePlayResult";

export const PlayResult = bind(usePlayResult, ({ status, score }) => {
  return (
    <Paper title="PlayResult">
      <StatList>
        <StatListItem>
          <em>Excellent</em>
          <span>{status.excellent}</span>
        </StatListItem>
        <StatListItem>
          <em>Good</em>
          <span>{status.good}</span>
        </StatListItem>
        <StatListItem>
          <em>Off Beat</em>
          <span>{status["off beat"]}</span>
        </StatListItem>
        <StatListItem>
          <em>Miss</em>
          <span>{status.miss}</span>
        </StatListItem>
        <StatListItem>
          <Score>Score</Score>
          <Score>{score}</Score>
        </StatListItem>
      </StatList>
    </Paper>
  );
});

const StatList = styled.ul`
  font-size: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StatListItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const Score = styled.div`
  font-size: 23px;
  font-weight: bold;
`;
