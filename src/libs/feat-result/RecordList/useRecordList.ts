import { usePlayContext } from "@libs/provider-play";

type UseRecordListProps = {
  username: string;
};

export function useRecordList({ username }: UseRecordListProps) {
  const { score } = usePlayContext();

  return { score, username };
}
