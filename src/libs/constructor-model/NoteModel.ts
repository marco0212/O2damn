import { Model } from "./Model";

export type Note = {
  key: number;
  time: number;
};

class NoteModel extends Model<Note> {
  constructor() {
    super("notes");
  }
}

export const noteModel = new NoteModel();
