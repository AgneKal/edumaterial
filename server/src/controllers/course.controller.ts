import { pool } from "../db/connect";
import { Course } from "../models/course";


export class CourseController {
    static async getAll(req: any, res: any) {
        const sql = "SELECT * FROM courses";
        const [result] = await pool.query<Course[]>(sql);
        res.json(result)
    }

    static async getCourse(req: any, res: any) {
        const sql = "SELECT * FROM courses WHERE id=?";
        const [result] = await pool.query<Course[]>(sql, [req.params.id]);
        if(result.length === 0){
            res.status(404).json({
                'text': 'Pateiktas įrašas nerastas'
            })
        } else {
            res.json(result[0]);
        }
    }

    static async insert(req: any, res: any){
        const sql = "INSERT INTO courses(title) VALUES (?)";
        await pool.query(sql, [req.body.title]);
        res.status(201).json({
            "success":true
        })
    }

    static async update(req: any, res: any){
        const sql = "UPDATE courses SET title=? WHERE id=?";
        await pool.query(sql, [req.body.title, req.body.id]);

        res.status(201).json({
            "success":true
        })
    }

    static async delete(req: any, res: any){
        const sql = "DELETE FROM courses WHERE id=?"
        await pool.query(sql, [req.params.id]);
        res.json({
            "success":true
        })
    }

}