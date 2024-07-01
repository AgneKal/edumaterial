import { pool } from "../db/connect";
import { Lecture } from "../models/lecture";

export class LectureController {
    static async getAll(req: any, res: any) {
        const sql = "SELECT * FROM lectures";
        const [result] = await pool.query<Lecture[]>(sql);
        res.json(result)
    }

    static async getLecture(req: any, res: any) {
        const sql = "SELECT * FROM lectures WHERE id=?";
        const [result] = await pool.query<Lecture[]>(sql, [req.params.id]);

        if (result.length === 0){
            res.status(404).json({
                'text': 'Pateiktas įrašas nerastas'
            });
        }

        const lecture = result[0];

        const filesSql = "SELECT * FROM lectures_files WHERE lecture_id=?";
        const [filesResult] = await pool.query<Lecture[]>(filesSql, [req.params.id]);
        lecture.files = filesResult.map(f => ({
            ...f,
            url: req.protocol+"://"+req.get("host")+"/upload/"+f.file_name
        }));

        res.status(200).json(lecture);
    }

    static async insert(req: any, res: any){
        const sql = "INSERT INTO lectures(title, lecture_date, description, group_id) VALUES (?, ?, ?, ?)";
        const [result, fields] = await pool.query(sql, [req.body.title, req.body.lecture_date, req.body.description, req.body.group_id]);
        const insertId = (result as any).insertId;

        if (req.files.length > 0) {
            let filesSql = "INSERT INTO lectures_files (lecture_id, file_name, original_name) VALUES ";
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                filesSql += `(${insertId}, '${file.filename}', '${file.originalname}'),`
            }
            filesSql = filesSql.slice(0, filesSql.length - 1);
            await pool.query(filesSql);
        }

        res.status(201).json({
            success: true
        });
    }

    static async update(req: any, res: any){
        const sql = "UPDATE lectures SET title=?, lecture_date=?, description=?, group_id=? WHERE id=?";
        await pool.query(sql, [req.body.title, req.body.lecture_date, req.body.description, req.body.group_id, req.params.id, req.params.id]);
        res.status(201).json({
            success :true
        })
    }

    static async delete(req: any, res: any){
        const sql = "DELETE FROM lectures WHERE id=?"
        await pool.query(sql, [req.params.id]);
        res.json({
            success: true
        })
    }

}