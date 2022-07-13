import { Model } from "./Model";

export type Record = {
  id: string;
  username: string;
  score: number;
};

class RecordModel extends Model<Record> {
  constructor() {
    super("records");
  }
}

export const recordModel = new RecordModel();
