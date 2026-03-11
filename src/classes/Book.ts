type props = {
    name : string;
    ISBN : string;
    autor: string;
    editorial: string;
}

export class Book {
    name : string;
    ISBN : string;
    autor: string;
    editorial: string;

    constructor({name,ISBN,autor,editorial}:props){
        this.name = name;
        this.ISBN = ISBN;
        this.autor = autor;
        this.editorial = editorial
    }
}