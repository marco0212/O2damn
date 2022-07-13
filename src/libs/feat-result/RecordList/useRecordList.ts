import type { Record } from "@libs/constructor-model";
import { useEffect, useRef } from "react";

type UseRecordListProps = {
  records: Record[];
};

export function useRecordList({ records }: UseRecordListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = listRef.current;

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  return { listRef, records };
}
