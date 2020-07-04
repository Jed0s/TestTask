import express from 'express';
import showLecturers from '../controllers/lecturersController';

const lecturerRouter = express.Router();

lecturerRouter.get('/', (req, res) => {
    showLecturers(req, res);
});

export default lecturerRouter;
