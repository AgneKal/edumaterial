import express, { Application } from "express";
import { corsHeaders } from "./middlewares/cors.middleware";
import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";

import path from "path";
import { courseRouter } from "./routes/course.router";
import { groupRouter } from "./routes/group.router";
import { lectureRouter } from "./routes/lecture.router";

import multer from "multer";

const app: Application = express();

app.use(express.json());

app.use(corsHeaders);
app.use((err: any, req: any, res: any, next: any) => {
    if (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
    next();
})

app.use("/upload", express.static(path.join("./upload") ));
app.use("/img", express.static(path.join("./img") ));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/groups', groupRouter);
app.use('/lectures', lectureRouter);

export { app }