import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { lecturerMiddleware } from "../middlewares/lecturer.middleware";
import { GroupController } from "../controllers/group.controller";

const groupRouter = express.Router();

groupRouter.get('/', authMiddleware, lecturerMiddleware, GroupController.getAll);
groupRouter.get('/:id', authMiddleware, lecturerMiddleware, GroupController.getAll);
groupRouter.post('/', authMiddleware, lecturerMiddleware, GroupController.insertGroup);
groupRouter.put('/', authMiddleware, lecturerMiddleware, GroupController.update);
groupRouter.delete('/:id', authMiddleware, lecturerMiddleware, GroupController.delete);
 
export { groupRouter } 