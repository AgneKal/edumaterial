import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket{
    id?: number;
    email: string;
    name: string;
    surname: string;
    phone: string;
    password: string;
    type: number
}