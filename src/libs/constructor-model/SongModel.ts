import { Model } from "./Model";

type Note = {
  key: number;
  time: number;
};

export type Song = {
  id: string;
  title: string;
  author: string;
  notes: Note[];
};

class SongModel extends Model<Song> {
  constructor() {
    super("songs");
  }
}

export const songModel = new SongModel();
