import { Record } from "@libs/constructor-model";
import { useAuthContext } from "@libs/provider-auth/AuthContext";
import { usePlayContext } from "@libs/provider-play";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecordListQuery } from "./operation";
import { useAddRecordMutation } from "./operation/useAddRecordMutation";

export function useRecords() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { score, song } = usePlayContext();
  const { records } = useRecordListQuery();
  const { isLoggedIn, user } = useAuthContext();
  const listRef = useRef<HTMLLIElement>(null);

  const [addRecordMutation, { called: mutationCalled, loading }] =
    useAddRecordMutation();

  const presentedRecords = useMemo(() => {
    const nowPlayingRecord: Record = {
      username: user?.name ?? "Anonymous",
      score,
      id: "",
    };

    const result = mutationCalled ? records : [nowPlayingRecord, ...records];

    return result.sort((prev, next) => next.score - prev.score);
  }, [mutationCalled, records, score, user?.name]);

  const addRecord = () => {
    if (!song || mutationCalled || !user) {
      return;
    }

    addRecordMutation(song.id, { score, username: user.name });
  };

  const save = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    addRecord();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const element = listRef.current;

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  return {
    save,
    listRef,
    loading,
    addRecord,
    records: presentedRecords,
    mutationCalled,
    isModalOpen,
    closeModal,
  };
}
