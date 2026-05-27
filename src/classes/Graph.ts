import Song from "./Song";
import { Node } from "./GraphNode";

type Props = {
    nodes?: Node[];
    adjlist?: Record<string, Node[]>;
};

export class Graph {
    nodes: Node[];
    adjlist: Record<string, Node[]>;

    // Arranca el grafo con nodos y lista de adyacencia opcionales.
    constructor({ nodes = [], adjlist = {} }: Props = {}) {
        this.nodes = nodes;
        this.adjlist = adjlist;
    }

    // Carga todas las canciones en el grafo y arma las conexiones.
    buildFromSongs(songs: Song[]) {
        this.nodes = songs.map((song) => new Node({ song }));
        this.rebuildAdjacency();
    }

    // Busca una canción por su id interno.
    getNodeById(id: string) {
        return this.nodes.find((node) => node.id === id);
    }

    // Busca el nodo que contiene exactamente esa canción.
    getNodeBySong(song: Song) {
        return this.nodes.find((node) => node.song === song);
    }

    // Devuelve las canciones conectadas con otra canción.
    getNeighbors(songId: string) {
        return this.adjlist[songId] ?? [];
    }

    // Devuelve las canciones relacionadas con una canción dada.
    getRecommendationsBySong(song: Song, limit = 5): { song: Song; reasons: string[] }[] {
        const node = this.getNodeBySong(song);

        if (!node) {
            return [];
        }

        return this.getRecommendationsById(node.id, limit);
    }

    // Devuelve las recomendaciones a partir del id interno de una canción.
    getRecommendationsById(songId: string, limit = 5): { song: Song; reasons: string[] }[] {
        const sourceNode = this.getNodeById(songId);

        if (!sourceNode) {
            return [];
        }

        return this.getNeighbors(songId)
            .filter((node) => node.id !== songId)
            .map((node) => ({
                song: node.song,
                reasons: this.getReasons(sourceNode, node),
            }))
            .filter((item) => item.reasons.length > 0)
            .sort((left, right) => right.reasons.length - left.reasons.length || left.song.name.localeCompare(right.song.name))
            .slice(0, limit);
    }

    // Muestra la lista de adyacencia en consola para depurar.
    printGraph() {
        console.log(this.adjlist);
    }

    // Reconstruye las conexiones entre canciones por artista o género.
    private rebuildAdjacency() {
        this.adjlist = {};

        for (const node of this.nodes) {
            this.adjlist[node.id] = [];
        }

        for (let index = 0; index < this.nodes.length; index += 1) {
            for (let nextIndex = index + 1; nextIndex < this.nodes.length; nextIndex += 1) {
                const firstNode = this.nodes[index];
                const secondNode = this.nodes[nextIndex];

                if (!this.areRelated(firstNode, secondNode)) {
                    continue;
                }

                this.addBidirectionalEdge(firstNode, secondNode);
            }
        }
    }

    // Agrega la conexión en ambos sentidos.
    private addBidirectionalEdge(firstNode: Node, secondNode: Node) {
        this.upsertEdge(firstNode.id, secondNode);
        this.upsertEdge(secondNode.id, firstNode);
    }

    // Inserta una canción vecina si aún no existe.
    private upsertEdge(sourceId: string, targetNode: Node) {
        const edges = this.adjlist[sourceId] ?? [];

        if (edges.some((node) => node.id === targetNode.id)) {
            return;
        }

        edges.push(targetNode);
        this.adjlist[sourceId] = edges;
    }

    // Dice si dos canciones se relacionan por artista o género.
    private areRelated(firstNode: Node, secondNode: Node) {
        return firstNode.song.artist === secondNode.song.artist || firstNode.song.genre === secondNode.song.genre;
    }

    // Explica por qué una canción salió como recomendación.
    private getReasons(firstNode: Node, secondNode: Node) {
        const reasons: string[] = [];

        if (firstNode.song.artist === secondNode.song.artist) {
            reasons.push("mismo artista");
        }

        if (firstNode.song.genre === secondNode.song.genre) {
            reasons.push("mismo genero");
        }

        return reasons;
    }
}
