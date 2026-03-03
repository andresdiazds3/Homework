import { useState } from "react";
import { LinkedList } from "../classes/LinkedList";
import { songs } from "../data/songs";
import SongInfo from "./SongInfo";
import Controls from "./Controls";
import "../styles/Player.css"

export default function Player() {
  const list = new LinkedList();
  songs.forEach(song => list.append(song));

  const [current, setCurrent] = useState(list.head);

  const nextSong = () => {
    if (current?.next) {
      setCurrent(current.next);
    } else {
        console.log("Terminaste la Playlist!")
    }
  };

  return (
    <div className = "player">
      <h1>Reproductor</h1>

      <SongInfo song={current?.value} />

      <Controls onNext={nextSong} />
    </div>
  );
}