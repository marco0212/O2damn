import { useBackendContext } from "@libs/provider-backend";
import type { Record } from "@libs/constructor-model";
import { useCallback, useRef, useState } from "react";

export function useAddRecordMutation(): [
  (songId: string, newRecord: Omit<Record, "id">) => Promise<void>,
  { loading: boolean; called: boolean }
] {
  const calledRef = useRef(false);
  const { recordService } = useBackendContext();
  const [loading, setLoading] = useState(false);

  const mutation = useCallback(
    async (songId: string, newRecord: Omit<Record, "id">) => {
      setLoading(true);
      await recordService.addRecord(songId, newRecord);
      setLoading(false);
      calledRef.current = true;
    },
    [recordService]
  );

  return [mutation, { loading, called: calledRef.current }];
}
