import { Paper } from "@libs/share-ui";
import { bind } from "@libs/util-structure";
import styled from "styled-components";
import { useRecordList } from "./useRecordList";

export const RecordList = bind(useRecordList, ({ listRef, records }) => (
  <Paper title="Records">
    <List ref={listRef}>
      {records.map((record, index) => (
        <ListItem key={record.id} active={!record.id}>
          <Username>
            {`${++index}. `}
            {record.username || "Type your name"}
          </Username>
          <span>{record.score}</span>
        </ListItem>
      ))}
    </List>
  </Paper>
));

const List = styled.ul`
  flex: 1 0 0;
  overflow-y: scroll;
`;

const ListItem = styled.li<{ active: boolean }>`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  line-height: 50px;
  font-size: 20px;
  background-color: ${(props) => (props.active ? `#eee` : "none")};
`;

const Username = styled.div`
  white-space: nowrap;
  padding-right: 15px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
