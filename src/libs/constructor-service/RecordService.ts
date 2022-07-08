import { recordModel, Record } from "@libs/constructor-model";

export class RecordService {
  public async addRecord(newRecord: Omit<Record, "id">) {
    return recordModel.create(newRecord);
  }

  public async getRecords() {
    return recordModel.find();
  }
}
