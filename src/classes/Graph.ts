import { Node } from "./Node"

type Props = {
    nodes: Node[]
    adjlist: {
        [key:string]: Node[]
    }
}

export class Graph {
    nodes: Node[];
    adjlist: {
        [key:string]: Node[]
    }

    constructor({nodes, adjlist}: Props){
        this.nodes = nodes;
        this.adjlist = adjlist;
    }

    addNode(newNode: Node){
        this.nodes.push(newNode);

        if (newNode.tipo === "city") {
            this.adjlist[newNode.id] = [];
            return;
        }

        if (!newNode.ciudadId) {
            throw new Error("El nodo persona debe tener una ciudadId");
        }

        if (!this.adjlist[newNode.ciudadId]) {
            throw new Error("La ciudad referenciada no existe en el grafo");
        }

        this.adjlist[newNode.ciudadId].push(newNode);
    }

    addEdge(cityNode: Node, personNode: Node){
        if (cityNode.tipo !== "city") {
            throw new Error("node1 debe ser una ciudad");
        }

        if (personNode.tipo !== "person") {
            throw new Error("node2 debe ser una persona");
        }

        if (personNode.ciudadId !== cityNode.id) {
            throw new Error("La persona debe referenciar a la ciudad de destino");
        }

        if (!this.adjlist[cityNode.id]) {
            this.adjlist[cityNode.id] = [];
        }

        this.adjlist[cityNode.id].push(personNode);
    }

    searchNode(node:Node){
        if(!this.nodes.length) return;
        return this.nodes.find(n => n === node)
    }

    printAdjacency(node:Node){
        if (!this.searchNode(node)) {
            return;
        }

        if (node.tipo !== "city") {
            console.log("Solo las ciudades tienen lista de adyacencia");
            return;
        }

        console.log(this.adjlist[node.id] ?? [])
    }

    getPeopleByCity(cityName: string){
        const cityNode = this.nodes.find(
            node => node.tipo === "city" && node.nombre === cityName
        );

        if (!cityNode) {
            return [];
        }

        return this.adjlist[cityNode.id] ?? [];
    }

    printGraph(){
        console.log(this.adjlist)
    }
}

