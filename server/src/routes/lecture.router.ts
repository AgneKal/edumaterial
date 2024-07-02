import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { lecturerMiddleware } from "../middlewares/lecturer.middleware";
import { LectureController } from "../controllers/lecture.controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})
const upload = multer({ storage });

const lectureRouter = express.Router();

lectureRouter.get('/', authMiddleware, LectureController.getAll);
lectureRouter.get('/:id', authMiddleware, lecturerMiddleware, LectureController.getLecture);
lectureRouter.post('/', authMiddleware, lecturerMiddleware, upload.array('files'), LectureController.insert);
lectureRouter.put('/:id', authMiddleware, lecturerMiddleware, upload.array('files'), LectureController.update);
lectureRouter.delete('/:id', authMiddleware, lecturerMiddleware, LectureController.delete);

lectureRouter.patch('/files/:id', authMiddleware, lecturerMiddleware, LectureController.patchFile);
lectureRouter.delete('/files/:id', authMiddleware, lecturerMiddleware, LectureController.deleteFile);
 
export { lectureRouter }