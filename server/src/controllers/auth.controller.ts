import { pool } from "../db/connect";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class AuthController {
    static async signin(req: any, res: any){
        const email = req.body.email;
        const name = req.body.name;
        const surname = req.body.surname;
        const phone = req.body.phone;
        let password = req.body.password;

        password = await bcrypt.hash(password, 12);

        let sql = "SELECT * FROM users WHERE email LIKE ?";
        const [result] = await pool.query<User[]>(sql, [email]);

        if (result.length != 0){
            return res.status(400).json({
                'text': 'Vartotojas su tokiu el. paštu jau registruotas'
            })
        }

        sql = "INSERT INTO users (email, name, surname, phone, password) VALUES (?, ?, ?, ?, ?)";
        await pool.query(sql, [email, name, surname, phone, password])

        res.json({"status" : "OK"})
    }

    static async login(req: any, res: any ){
        const email = req.body.email;
        const password = req.body.password;

        const sql = "SELECT * FROM users WHERE email LIKE ?";
        const [result] = await pool.query<User[]>(sql, [email]);

        if (result.length != 1) {
            return res.status(400).json({
                'text': 'Vartotojas su tokiu el. paštu neegzistuoja'
            });
        }

        const user = result[0];
        let passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
            return res.status(400).json({
                'text': 'Įvestas netinkamas slaptažodis arba el. pašto adresas'
            });            
        }
        
        if (process.env.TOKEN_SECRET != null){
            dotenv.config();
            let token = jwt.sign(
                {
                    'id': user.id,
                    'type': user.type
                }, 
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '2 days'
                }
            );

            res.json({
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'surname': user.surname,
                'phone': user.phone,
                'token': token,
                'type': user.type,
                'img': user.img
            });
        }

    }
}