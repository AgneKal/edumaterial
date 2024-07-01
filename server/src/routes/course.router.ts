import express from "express";
import { CourseController } from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { lecturerMiddleware } from "../middlewares/lecturer.middleware";


const courseRouter = express.Router();

courseRouter.get('/', authMiddleware, lecturerMiddleware, CourseController.getAll);
courseRouter.get('/:id', authMiddleware, lecturerMiddleware, CourseController.getCourse);
courseRouter.post('/', authMiddleware, lecturerMiddleware, CourseController.insert);
courseRouter.put('/', authMiddleware, lecturerMiddleware, CourseController.update);
courseRouter.delete('/:id', authMiddleware, lecturerMiddleware, CourseController.delete);
 
export { courseRouter }