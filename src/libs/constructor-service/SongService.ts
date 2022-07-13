import { songModel } from "@libs/constructor-model";
import { noteModel } from "@libs/constructor-model/NoteModel";

export class SongService {
  public async getSongs() {
    return songModel.find();
  }

  public async getSongWithNote(id: string) {
    const notes = await noteModel.find({ path: id });
    const song = await songModel.findOne({ path: id });

    return {
      ...song,
      notes,
    };
  }
}
