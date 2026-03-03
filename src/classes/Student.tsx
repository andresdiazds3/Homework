type Props = {
    pfp: string;
    id: number;
    name: string;
    age: number;
    code: number;
}

class Student {
    pfp: string;
    id: number;
    name: string;
    age: number;
    code: number;

    constructor({pfp,id,name,age,code}: Props){
        this.pfp = pfp;
        this.id = id;
        this.name = name;
        this.age = age;
        this.code = code;
    }
}

export default Student;