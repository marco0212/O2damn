import { bind } from "@libs/util-structure";
import { useRecords } from "./useRecords";
import { RecordForm } from "../RecordForm";
import { RecordList } from "../RecordList";

export const Records = bind(
  useRecords,
  ({ username, setUsername, loading, addRecord }) => {
    return (
      <>
        <RecordList username={username} />
        <RecordForm
          value={username}
          placeholder="Type your name"
          onChange={(event) => setUsername(event.currentTarget.value)}
          onSubmit={addRecord}
          loading={loading}
        />
      </>
    );
  }
);
