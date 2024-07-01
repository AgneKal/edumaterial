import { RowDataPacket } from "mysql2";

export interface Lecture extends RowDataPacket{
    id?: number;
    title: string;
    lecture_date: Date;
    description: string;
    group_id: number;
    group_title: string;
}