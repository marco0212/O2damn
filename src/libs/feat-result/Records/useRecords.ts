import { Record } from "@libs/constructor-model";
import { usePlayContext } from "@libs/provider-play";
import { useCallback, useMemo, useState } from "react";
import { useRecordListQuery } from "./operation";
import { useAddRecordMutation } from "./operation/useAddRecordMutation";

export function useRecords() {
  const [username, setUsername] = useState("");
  const { score, song } = usePlayContext();
  const { records } = useRecordListQuery();
  const [addRecordMutation, { called: mutationCalled, loading }] =
    useAddRecordMutation();

  const presentedRecords = useMemo(() => {
    const nowPlayingRecord: Record = {
      username,
      score,
      id: "",
    };

    const result = mutationCalled ? records : [nowPlayingRecord, ...records];

    return result.sort((prev, next) => next.score - prev.score);
  }, [mutationCalled, records, score, username]);

  const addRecord = useCallback(() => {
    if (!song || mutationCalled) {
      return;
    }

    addRecordMutation(song.id, { score, username });
  }, [addRecordMutation, mutationCalled, score, song, username]);

  return {
    username,
    setUsername,
    loading,
    addRecord,
    records: presentedRecords,
    mutationCalled,
  };
}
