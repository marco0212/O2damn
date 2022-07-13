import { recordModel, Record } from "@libs/constructor-model";

export class RecordService {
  public async addRecord(songId: string, newRecord: Omit<Record, "id">) {
    return recordModel.appendTo(newRecord, { path: songId });
  }

  public watchRecords(
    songId: string,
    callback: (value: Record[] | null) => void
  ) {
    const unsubscribe = recordModel.onChange(callback, { path: songId });
    return unsubscribe;
  }
}
