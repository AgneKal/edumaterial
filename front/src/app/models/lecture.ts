export class Files {
    constructor(
        public lecture_id: number,
        public file_name: string,
        public original_name: string,
        public id?: number,
        public url?: string,
    ){}
}

export class Lecture{
    constructor(
        public title: string,
        public lecture_date: Date,
        public description: string,
        public group_id: number,
        public files: Files[],
        public group_title?: string,
        public id?: number,
    ){}
}