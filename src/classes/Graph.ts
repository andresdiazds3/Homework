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
        this.adjlist[newNode.nombre] = []
    }

    addEdge(node1: Node, node2: Node){
        this.adjlist[node1.nombre].push(node2)
        this.adjlist[node2.nombre].push(node1)
    }

    searchNode(node:Node){
        if(!this.nodes.length) return;
        return this.nodes.find(n => n === node)
    }

    printAdjacency(node:Node){
        if(this.searchNode(node)){
            console.log(this.adjlist[node.nombre])
        }
    }

    printGraph(){
        console.log(this.adjlist)
    }
}

