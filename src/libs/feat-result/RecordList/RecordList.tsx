import { Paper } from "@libs/share-ui";
import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useRecordList } from "./useRecordList";

export const RecordList = bind(useRecordList, ({ username, score }) => {
  return (
    <Paper title="Records">
      <List>
        {[null].map((record, index) => (
          <ListItem>
            <Username>
              {`${++index}. `}
              {username || "Type your name"}
            </Username>
            <span>{score}</span>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
});

const List = styled.ul`
  max-height: 284px;
  flex: 1;
  overflow-y: scroll;
`;

const ListItem = styled.li`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  line-height: 50px;
  font-size: 20px;
`;

const Username = styled.div`
  white-space: nowrap;
  padding-right: 15px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
