import express from 'express';
import { createLecture, showLectures } from '../controllers/lectureController';

const lectureRouter = express.Router();

lectureRouter.get('/', (req, res) => {
    showLectures(req, res); // GET METHOD
});

lectureRouter.get('/:id', (req, res) => {
    showLectures(req, res, true); // GET METHOD WITH ID
});

lectureRouter.post('/', (req, res) => {
    createLecture(req, res); // POST METHOD
});

export default lectureRouter;
