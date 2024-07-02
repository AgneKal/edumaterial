import { RowDataPacket } from "mysql2";

export interface File extends RowDataPacket{
    id?: number;
    lecture_id: number
    file_name: string;
    original_name: string;
    visibility: boolean
}