import { useBackendContext } from "@libs/provider-backend";
import type { Record } from "@libs/constructor-model";
import { useEffect, useState } from "react";
import { usePlayContext } from "@libs/provider-play";

export function useRecordListQuery() {
  const [loading, setLoading] = useState(false);
  const { recordService } = useBackendContext();
  const [records, setRecords] = useState<Record[]>([]);
  const { song } = usePlayContext();

  useEffect(() => {
    if (!song) {
      return;
    }

    const unsubscribe = recordService.watchRecords(
      song.id,
      (incomingRecords) => {
        if (!incomingRecords) {
          return;
        }

        setLoading(true);
        setRecords(incomingRecords);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [recordService, song]);

  return { records, loading };
}
