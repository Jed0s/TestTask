import express from 'express';
import {
    createLecture, showLectures, changeLecture, deleteLecture,
} from '../controllers/lectureController';

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

lectureRouter.put('/:id', (req, res) => {
    changeLecture(req, res); // PUT METHOD
});

lectureRouter.delete('/:id', (req, res) => {
    deleteLecture(req, res); // DELETE METHOD
});

export default lectureRouter;
