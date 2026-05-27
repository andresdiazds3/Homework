export default class Song {
    name: string;
    artist: string;
    genre: string;
    imgUrl: string;
    popularity: number;

    // Crea una canción con los datos que vienen del JSON.
    constructor(name: string, artist: string, genre: string, imgUrl: string, popularity: number) {
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.imgUrl = imgUrl;
        this.popularity = popularity;
    }
}