import { RowDataPacket } from "mysql2";

export interface LectureInGroup extends RowDataPacket {
    id: number;
    lectureTitle: string;
}

export interface Student extends RowDataPacket {
    id: number;
    name: string;
    surname: string
}

export interface Group extends RowDataPacket {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    lecturer: string;
    lecturer_id: number;
    course_id: number;
    courses_title: string;
    lectures: LectureInGroup[];
    students: Student[];
}