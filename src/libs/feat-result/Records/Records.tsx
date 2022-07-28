import { bind } from "@libs/util-structure";
import { useRecords } from "./useRecords";
import styled from "styled-components";
import { Button, Paper } from "@libs/share-ui";
import { LoginModal } from "../LoginModal";

export const Records = bind(
  useRecords,
  ({
    save,
    isModalOpen,
    loading,
    records,
    mutationCalled,
    listRef,
    closeModal,
  }) => {
    return (
      <Container>
        <Paper title="Records">
          <List>
            {records.map((record, index) => (
              <ListItem key={record.id} active={!record.id} ref={listRef}>
                <Username>
                  {`${++index}. `}
                  {record.username || "Anonymous"}
                </Username>
                <span>{record.score}</span>
              </ListItem>
            ))}
          </List>
          <Button
            color="primary"
            onClick={save}
            disabled={mutationCalled}
            loading={loading}
          >
            {mutationCalled ? "Thanks" : "Save"}
          </Button>
          <LoginModal opened={isModalOpen} onClose={closeModal} />
        </Paper>
      </Container>
    );
  }
);

const Container = styled.div`
  grid-column: 2;
  grid-row: 1/3;

  & > * {
    height: 100%;
  }
`;

const List = styled.ul`
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 21px;
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
