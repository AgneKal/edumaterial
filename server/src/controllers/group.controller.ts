import { pool } from "../db/connect";
import { Group, LectureInGroup, Student } from "../models/group";

export class GroupController {
    static async getAll(req: any, res: any) {
        let sql = "SELECT g.id AS id, g.title AS title, DATE_FORMAT(g.start, '%Y-%m-%d') AS start, DATE_FORMAT(g.end, '%Y-%m-%d') AS end, CONCAT (u.name, ' ', u.surname) AS lecturer, u.id AS lecturer_id, c.title AS courses_title, c.id AS course_id FROM `groups` g LEFT JOIN users u ON g.lecturer_id=u.id LEFT JOIN courses c ON g.course_id=c.id";
        
        if (req.params.id) {
            sql += ` WHERE g.id=${req.params.id}`; 
        }

        const [result] = await pool.query<Group[]>(sql);

        for (let i = 0; i < result.length; i++) {
            const sql2 = `SELECT l.title AS lecture_title FROM lectures l WHERE group_id = ?`;
            const [lectures] = await pool.query<LectureInGroup[]>(sql2, [result[i].id]);
            result[i].lectures = lectures;

            const sql3 = `SELECT u.id AS id, u.name AS name, u.surname AS surname FROM users u WHERE id IN (SELECT student_id FROM groups_students WHERE group_id = ?)`;
            const [students] = await pool.query<Student[]>(sql3, [result[i].id]);
            result[i].students = students;
       }
       console.log(result);

        res.json(result);
    }

    static async insertGroup(req: any, res: any){
        const group: Group = req.body;

        const sql = "INSERT INTO `groups` (title, start, end, lecturer_id, course_id) VALUES ( ?, ?, ?, ?, ? )";
        const [result, fields] = await pool.query(sql, [group.title, group.start, group.end, group.lecturer_id, group.course_id]);
        const insertId = (result as any).insertId;

        group.students.forEach(async (student: Student) => {
            const sql="INSERT INTO groups_students (group_id, student_id) VALUES (?, ?)";
            await pool.query(sql, [insertId, student.student_id] );
        });

        res.status(201).json({
            "success": true
        })
    }

    static async update(req: any, res: any){
        const group: Group = req.body;

        const sql = "UPDATE `groups` SET title=?, start=?, end=?, lecturer_id=?, course_id=? WHERE id=?";
        const [result, fields] = await pool.query(sql, [group.title, group.start, group.end, group.lecturer_id, group.course_id, req.body.id]);
    
        const sql2 = "DELETE FROM groups_students WHERE group_id=?";
        await pool.query(sql2, [req.body.id]);

        group.students.forEach(async (student: Student) => {
            const sql="INSERT INTO groups_students (group_id, student_id) VALUES (?, ?)";
            await pool.query(sql, [req.body.id, student.id] );
        });


        res.status(201).json({
            "success": true
        })
    }

    static async delete(req: any, res: any){
        const sql = "DELETE FROM `groups` WHERE id=?"
        await pool.query(sql, [req.params.id]);
        res.json({
            "success":true
        })
    }

}