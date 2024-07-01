export class User {
    constructor(
        public email:string,
        public id?:number,
        public name?:string,
        public surname?:string, 
        public phone?:string, 
        public password?:string,
        public type?:number,
        public token?:string,
        public img?:string
    ){
    }

    public getTypeName(): String{
        switch (this.type){
            case 0:
                return "Administratorius";
            case 1:
                return "Dėstytojas";
            case 2:
                return "Studentas";
        }
        return "Nežinomas";
    }

}