import { Model } from "./Model";

type Artist = {
  name: string;
  profile: string;
};

export type Song = {
  id: string;
  title: string;
  file: string;
  artist: Artist;
  thumbnail: string;
};

class SongModel extends Model<Song> {
  constructor() {
    super("songs");
  }
}

export const songModel = new SongModel();
