
export class Group {
    constructor (
        public title: string,
        public start: Date | null,
        public end: Date | null,
        public lecturer: string,
        public lecturer_id: number,
        public course_id: number,
        public courses_title: string,
        public lectures: {
            id: number;
            title: string;
        }[],
        public students: {
            id: number;
            name: string;
            surname: string
        }[],
        public id?: number
    ) {}
}