import path from "path";
import { pool } from "../db/connect";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import fs from 'fs';

export class UserController {
    static async getAll(req: any, res: any){
        if (req.user.type === 2) {
            res.status(400).json({
                text:"Jūs neturite teisės redaguoti įrašą"
            })
        }
        let sql = "SELECT * FROM users";
        if (req.query.type) {
            sql += ` WHERE type = ${req.query.type}`;
        }
        
        const [result] = await pool.query<User[]>(sql);
        return res.json(result);
    };
    
    static async getUser(req: any, res: any){
        const userId=req.params.id;
        if (!(req.user.type == 0 || userId == req.user.id)){
            res.status(400).json({
                text:"Jūs neturite teisės redaguoti įrašą"
            })
        }
        
        const [result]=await pool.query<User[]>("SELECT * FROM users WHERE id=?", [userId]);
        if (result.length == 0){
            res.status(404).json({
                text:"Vartotojas nerastas"
            });
        } else {
            res.json(result[0]);
        }
    }

    static async updateUserRecord(id: any, email: any, name: any, surname: any, phone: any, password: any, type: any, fileURL: any){
        if (password != ''){
            const passwordHash = await bcrypt.hash(password, 12);

            await pool.query("UPDATE users SET email=?, name=?, surname=?, phone=?, password=? WHERE id=? ", [
                email,
                name,
                surname,
                phone,
                passwordHash,
                id
            ]);
        } else {
            await pool.query("UPDATE users SET email=?, name=?, surname=?, phone=? WHERE id=? ",[
                email,
                name,
                surname,
                phone,
                id
            ]);
        }

        if (type != null){
            await pool.query("UPDATE users SET type=? WHERE id=? ",[
                type,
                id
            ]);
        }

        if (fileURL != null){
            const [oldUser] = await pool.query<User[]>("SELECT * FROM users WHERE id=?", [id]);
            if(oldUser[0].img)fs.unlinkSync(path.join('./img/'+oldUser[0].img.split('/').pop()));
            await pool.query("UPDATE users SET img=? WHERE id=? ",[
                fileURL,
                id
            ]);
        }
    }

    static async update(req: any, res: any){
        const userId = req.params.id;

        if ( !(req.user.type == 0 || userId == req.user.id)){
            res.status(400).json({
                text:"Jūs neturite teisės redaguoti įrašą"
            })
        }

        await UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.surname, req.body.phone, req.body.password, req.body.type, null );
        res.json({  
            success: true
        });

    }

    static async delete(req: any, res: any){
        await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
        res.json({
            success:true
        });

    }


    static async updateProfile(req: any, res: any){
        const userId = req.params.id;

        const url = req.protocol+"://"+req.get("host")+"/img/"+req.file.filename ;

        UserController.updateUserRecord(userId, req.body.email, req.body.name, req.body.surname, req.body.phone, req.body.password, null, url );
        res.json({
            success:true
        });
    }
}