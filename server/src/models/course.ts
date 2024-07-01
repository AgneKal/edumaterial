import { RowDataPacket } from "mysql2";

export interface Course extends RowDataPacket{
    id?: number;
    title: string;
}