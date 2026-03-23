type props = {
    name : string;
    amount: number;
    date: any;
}

export class User {
    name : string;
    amount: number;
    date: any;

    constructor({name,amount,date}:props){
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
}