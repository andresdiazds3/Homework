import { v4 as uuidv4 } from "uuid";
import Song from "./Song";

type SongNodeProps = {
    song: Song;
    id?: string;
};

export class Node {
    id: string;
    song: Song;

    constructor({ song, id }: SongNodeProps) {
        this.song = song;
        this.id = id ?? uuidv4();
    }
}