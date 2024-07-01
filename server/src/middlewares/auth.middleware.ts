import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authMiddleware = ((req:any, res:any, next:any)=>{
    try {
        const token = req.headers.auth;
        dotenv.config();
        if (process.env.TOKEN_SECRET != null){
            const user = jwt.verify(token, process.env.TOKEN_SECRET) as {id: number, type:number};
            req.user = user;
        }
        next();
    } catch (error) {
        return res.status(401).json({
            'text': 'Nepateiktas arba neteisingas JWT'
        });
    }
});

export { authMiddleware } 