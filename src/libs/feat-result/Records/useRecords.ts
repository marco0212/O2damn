import { usePlayContext } from "@libs/provider-play";
import { useState } from "react";

export function useRecords() {
  const [username, setUsername] = useState("");
  const { score } = usePlayContext();
  const [loading, setLoading] = useState(false);

  const addRecord = async () => {
    setLoading(true);

    // request mutating data
    console.log({ score, username });

    setLoading(false);
  };

  return { username, setUsername, loading, addRecord };
}
