import { songModel } from "@libs/constructor-model";

export class SongService {
  public async getSongs() {
    return songModel.find();
  }
}
